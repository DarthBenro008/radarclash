use anchor_lang::prelude::*;

declare_id!("5TyHZDJpJPq6a3pVuQAuTgUf794DkLVoCMvFNjgQp9Hm");

#[program]
pub mod radarclash {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
