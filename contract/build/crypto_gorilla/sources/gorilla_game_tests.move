#[test_only]
module crypto_gorilla::gorilla_game_tests {
    use std::signer;
    use std::vector;
    use aptos_framework::account;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::{Self, AptosCoin};
    use aptos_framework::timestamp;
    use crypto_gorilla::gorilla_game_module;

    #[test(aptos_framework = @0x1, crypto_gorilla = @crypto_gorilla)]
    public fun test_mint_gorilla(aptos_framework: &signer, crypto_gorilla: &signer) {
        // Set up blockchain
        timestamp::set_time_has_started_for_testing(aptos_framework);

        // Initialize the module
        account::create_account_for_test(signer::address_of(crypto_gorilla));
        let (burn_cap, mint_cap) = aptos_coin::initialize_for_test(aptos_framework);

        // Register AptosCoin for the crypto_gorilla account
        coin::register<AptosCoin>(crypto_gorilla);

        // Call init_module to set up the GorillaGame resource
        gorilla_game_module::init_module_for_test(crypto_gorilla);

        // Create a test user account
        let user = account::create_account_for_test(@0x123);
        coin::register<AptosCoin>(&user);
        
        // Mint APT to the user
        let user_addr = signer::address_of(&user);
        aptos_coin::mint(aptos_framework, user_addr, 1000000000); // 10 APT

        // Mint a gorilla
        gorilla_game_module::mint_gorilla(&user);

        // Check that the user now has a gorilla
        let tribe = gorilla_game_module::get_tribe(user_addr);
        assert!(vector::length(&tribe) == 1, 0);

        // Clean up
        coin::destroy_burn_cap(burn_cap);
        coin::destroy_mint_cap(mint_cap);
    }

    // TODO: Add more tests for evolve_gorilla, calculate_tribe_score, etc.
}