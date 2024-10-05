import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Radarclash } from "../target/types/radarclash";
import { assert } from "chai";

describe("radarclash", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Radarclash as Program<Radarclash>;

  const clashListAccount = anchor.web3.Keypair.generate();
  const admin = provider.wallet.payer;
  const player1 = anchor.web3.Keypair.generate();
  const player2 = anchor.web3.Keypair.generate();
  let clashAccount: anchor.web3.Keypair;

  before(async () => {
    // Fund accounts
    const airdropAmount = 20 * anchor.web3.LAMPORTS_PER_SOL;
    
    // Airdrop to player1
    const player1Airdrop = await provider.connection.requestAirdrop(player1.publicKey, airdropAmount);
    await provider.connection.confirmTransaction(player1Airdrop, "confirmed");
    
    // Airdrop to player2
    const player2Airdrop = await provider.connection.requestAirdrop(player2.publicKey, airdropAmount);
    await provider.connection.confirmTransaction(player2Airdrop, "confirmed");
    
    // Verify balances
    const player1Balance = await provider.connection.getBalance(player1.publicKey);
    const player2Balance = await provider.connection.getBalance(player2.publicKey);
    
    console.log(`Player 1 balance: ${player1Balance}`);
    console.log(`Player 2 balance: ${player2Balance}`);
    
    assert.isAtLeast(player1Balance, airdropAmount, "Player 1 didn't receive the airdrop");
    assert.isAtLeast(player2Balance, airdropAmount, "Player 2 didn't receive the airdrop");
  });

  it("Should initialize the clash list", async () => {
    await program.methods
      .initialize()
      .accounts({
        clashList: clashListAccount.publicKey,
        admin: admin.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([clashListAccount, admin])
      .rpc();

    const clashList = await program.account.clashList.fetch(clashListAccount.publicKey);
    assert.equal(clashList.admin.toBase58(), admin.publicKey.toBase58());
  });

  it("Should create a clash", async () => {
    clashAccount = anchor.web3.Keypair.generate();
    const potAmount = new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL); // 1 SOL

    await program.methods
      .createClash(potAmount)
      .accounts({
        clash: clashAccount.publicKey,
        creator: player1.publicKey,
        clashList: clashListAccount.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([player1, clashAccount])
      .rpc();

    const clash = await program.account.clash.fetch(clashAccount.publicKey);
    assert.equal(clash.pot.toNumber(), potAmount.toNumber());
    assert.equal(clash.creator.toBase58(), player1.publicKey.toBase58());
    assert.isTrue(clash.isActive);

    const clashList = await program.account.clashList.fetch(clashListAccount.publicKey);
    assert.include(clashList.activeClashes.map(p => p.toBase58()), clashAccount.publicKey.toBase58());

    // // Verify the clash account balance
    // const clashBalance = await provider.connection.getBalance(clashAccount.publicKey);
    // assert.equal(clashBalance, potAmount.toNumber());
  });

  it("Player 2 should join the clash", async () => {
    const joinAmount = new anchor.BN(0.5 * anchor.web3.LAMPORTS_PER_SOL); // 0.5 SOL

    await program.methods
      .joinClash(joinAmount)
      .accounts({
        clash: clashAccount.publicKey,
        player: player2.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([player2])
      .rpc();

    const clash = await program.account.clash.fetch(clashAccount.publicKey);
    assert.equal(clash.pot.toNumber(), 1.5 * anchor.web3.LAMPORTS_PER_SOL);
    assert.include(clash.participants.map(p => p.toBase58()), player2.publicKey.toBase58());

    // Verify the clash account balance
    // const clashBalance = await provider.connection.getBalance(clashAccount.publicKey);
    // assert.equal(clashBalance, 1.5 * anchor.web3.LAMPORTS_PER_SOL);
  });

  it("Should list active clashes", async () => {
    const activeClashes = await program.methods
      .listActiveClashes()
      .accounts({
        clashList: clashListAccount.publicKey,
      })
      .view();

    assert.include(activeClashes.map(p => p.toBase58()), clashAccount.publicKey.toBase58());
  });

  it("Admin should resolve the clash", async () => {
    const winnerBalanceBefore = await provider.connection.getBalance(player2.publicKey);

    await program.methods
      .resolveClash(player2.publicKey)
      .accounts({
        clash: clashAccount.publicKey,
        winner: player2.publicKey,
        clashList: clashListAccount.publicKey,
        admin: admin.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([admin])
      .rpc();

    const clash = await program.account.clash.fetch(clashAccount.publicKey);
    assert.isFalse(clash.isActive);
    assert.equal(clash.winner.toBase58(), player2.publicKey.toBase58());

    const winnerBalanceAfter = await provider.connection.getBalance(player2.publicKey);
    assert.approximately(winnerBalanceAfter - winnerBalanceBefore, 1.5 * anchor.web3.LAMPORTS_PER_SOL, 0.01 * anchor.web3.LAMPORTS_PER_SOL);

    const clashList = await program.account.clashList.fetch(clashListAccount.publicKey);
    assert.notInclude(clashList.activeClashes.map(p => p.toBase58()), clashAccount.publicKey.toBase58());

    // Verify the clash account balance is now zero
    // const clashBalance = await provider.connection.getBalance(clashAccount.publicKey);
    // assert.equal(clashBalance, 0);
  });

  it("Non-admin should not be able to resolve the clash", async () => {
    const newClashAccount = anchor.web3.Keypair.generate();
    await program.methods
      .createClash(new anchor.BN(1000000))
      .accounts({
        clash: newClashAccount.publicKey,
        creator: player1.publicKey,
        clashList: clashListAccount.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([player1, newClashAccount])
      .rpc();

    try {
      await program.methods
        .resolveClash(player1.publicKey)
        .accounts({
          clash: newClashAccount.publicKey,
          winner: player1.publicKey,
          clashList: clashListAccount.publicKey,
          admin: player1.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([player1])
        .rpc();
      assert.fail("Non-admin should not be able to resolve the clash");
    } catch (err) {
      assert.include(err.toString(), "Unauthorized");
    }
  });
});