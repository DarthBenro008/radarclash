use anchor_lang::prelude::*;

declare_id!("5TyHZDJpJPq6a3pVuQAuTgUf794DkLVoCMvFNjgQp9Hm");

#[program]
pub mod radarclash {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let clash_list = &mut ctx.accounts.clash_list;
        clash_list.admin = ctx.accounts.admin.key();
        Ok(())
    }

    pub fn create_clash(ctx: Context<CreateClash>, pot: u64) -> Result<()> {
        let clash = &mut ctx.accounts.clash;
        let clash_list = &mut ctx.accounts.clash_list;
        let creator = &ctx.accounts.creator;

        clash.pot = pot;
        clash.creator = creator.key();
        clash.is_active = true;

        clash_list.active_clashes.push(clash.key());

        // Transfer SOL from creator to clash account
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: creator.to_account_info(),
                to: clash.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(cpi_context, pot)?;

        Ok(())
    }

    pub fn join_clash(ctx: Context<JoinClash>, amount: u64) -> Result<()> {
        let clash = &mut ctx.accounts.clash;
        let player = &ctx.accounts.player;

        require!(clash.is_active, ErrorCode::ClashNotActive);
        require!(clash.creator != player.key(), ErrorCode::CannotJoinOwnClash);
        require!(clash.participants.len() < 5, ErrorCode::ClashFull);

        clash.participants.push(player.key());
        clash.pot += amount;

        // Transfer SOL from player to clash account
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: player.to_account_info(),
                to: clash.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(cpi_context, amount)?;

        Ok(())
    }

    pub fn resolve_clash(ctx: Context<ResolveClash>, winner: Pubkey) -> Result<()> {
        let clash = &mut ctx.accounts.clash;
        let clash_list = &mut ctx.accounts.clash_list;
        let winner_account = &ctx.accounts.winner;

        require!(clash.is_active, ErrorCode::ClashNotActive);
        require!(clash.participants.contains(&winner), ErrorCode::InvalidWinner);

        clash.is_active = false;
        clash.winner = Some(winner);

        // Remove clash from active list
        clash_list.active_clashes.retain(|&x| x != clash.key());

        // Transfer pot to winner
        let pot_amount = clash.pot;
        let clash_balance = clash.to_account_info().lamports();

        // Ensure the clash account has enough balance
        require!(clash_balance >= pot_amount, ErrorCode::InsufficientFunds);

        **clash.to_account_info().try_borrow_mut_lamports()? -= pot_amount;
        **winner_account.to_account_info().try_borrow_mut_lamports()? += pot_amount;

        Ok(())
    }

    pub fn list_active_clashes(ctx: Context<ListActiveClashes>) -> Result<Vec<Pubkey>> {
        Ok(ctx.accounts.clash_list.active_clashes.clone())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = admin, space = 8 + 32 + 4 + 200)]
    pub clash_list: Account<'info, ClashList>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateClash<'info> {
    #[account(init, payer = creator, space = 8 + 8 + 32 + 1 + 4 + 5 * 32 + 32)]
    pub clash: Account<'info, Clash>,
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(mut)]
    pub clash_list: Account<'info, ClashList>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct JoinClash<'info> {
    #[account(mut)]
    pub clash: Account<'info, Clash>,
    #[account(mut)]
    pub player: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ResolveClash<'info> {
    #[account(mut)]
    pub clash: Account<'info, Clash>,
    /// CHECK: This account is not read or written, just receives funds
    #[account(mut)]
    pub winner: AccountInfo<'info>,
    #[account(mut, has_one = admin @ ErrorCode::Unauthorized)]
    pub clash_list: Account<'info, ClashList>,
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ListActiveClashes<'info> {
    pub clash_list: Account<'info, ClashList>,
}

#[account]
pub struct ClashList {
    pub admin: Pubkey,
    pub active_clashes: Vec<Pubkey>,
}

#[account]
pub struct Clash {
    pub pot: u64,
    pub creator: Pubkey,
    pub participants: Vec<Pubkey>,
    pub is_active: bool,
    pub winner: Option<Pubkey>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Clash is not active")]
    ClashNotActive,
    #[msg("Cannot join your own clash")]
    CannotJoinOwnClash,
    #[msg("Invalid winner")]
    InvalidWinner,
    #[msg("The clash is full")]
    ClashFull,
    #[msg("Unauthorized access")]
    Unauthorized,
    #[msg("Insufficient funds in clash account")]
    InsufficientFunds,
}