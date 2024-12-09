module crypto_gorilla::gorilla_game_module {
    use std::string::{Self, String};
    use std::vector;
    use std::option;
    use std::signer;
    use aptos_framework::object::{Self, Object};
    use aptos_framework::timestamp;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_std::table::{Self, Table};
    use aptos_token_objects::token;
    use aptos_token_objects::collection;

    const ENOT_OWNER: u64 = 1;
    const ENOT_ENOUGH_COINS: u64 = 2;
    const ETRIBE_FULL: u64 = 3;
    const ENOT_ENOUGH_TIME_PASSED: u64 = 4;

    const MINT_COST: u64 = 100000000; // 1 APT
    const EVOLVE_COST: u64 = 50000000; // 0.5 APT
    const MAX_TRIBE_SIZE: u64 = 5;
    const COOLDOWN_PERIOD: u64 = 86400; // 24 hours in seconds

    struct GorillaGame has key {
        collection_name: String,
        gorillas: Table<address, vector<Object<token::Token>>>,
        last_action: Table<address, u64>,
    }

    struct GorillaNFT has key {
        strength: u8,
        intelligence: u8,
        social_skills: u8,
        stage: u8,
    }

    fun init_module(creator: &signer) {
        let collection_name = string::utf8(b"CryptoGorilla Collection");
        collection::create_unlimited_collection(
            creator,
            collection_name,
            string::utf8(b"CGOR"),
            option::none(),
            string::utf8(b"https://example.com/gorilla/"),
        );

        let game = GorillaGame {
            collection_name,
            gorillas: table::new(),
            last_action: table::new(),
        };

        move_to(creator, game);
    }

    public entry fun mint_gorilla(account: &signer) acquires GorillaGame {
        let account_addr = signer::address_of(account);
        let game = borrow_global_mut<GorillaGame>(@crypto_gorilla);

        assert!(
            !table::contains(&game.last_action, account_addr) ||
            timestamp::now_seconds() - *table::borrow(&game.last_action, account_addr) >= COOLDOWN_PERIOD,
            ENOT_ENOUGH_TIME_PASSED
        );

        if (table::contains(&game.gorillas, account_addr)) {
            let tribe = table::borrow(&game.gorillas, account_addr);
            assert!(vector::length(tribe) < MAX_TRIBE_SIZE, ETRIBE_FULL);
        };

        coin::transfer<AptosCoin>(account, @crypto_gorilla, MINT_COST);

        let token_constructor_ref = token::create_named_token(
            account,
            game.collection_name,
            string::utf8(b""),
            string::utf8(b"Gorilla #"),
            option::none(),
            string::utf8(b""),
        );

        // Generate "random" attributes based on account address and current timestamp
        let seed = timestamp::now_microseconds();
        let strength = ((seed % 100) as u8) + 1;
        let intelligence = (((seed / 100) % 100) as u8) + 1;
        let social_skills = (((seed / 10000) % 100) as u8) + 1;

        let gorilla = GorillaNFT {
            strength,
            intelligence,
            social_skills,
            stage: 0,
        };

        move_to(&object::generate_signer(&token_constructor_ref), gorilla);

        let gorilla_obj = object::object_from_constructor_ref<token::Token>(&token_constructor_ref);

        if (!table::contains(&game.gorillas, account_addr)) {
            table::add(&mut game.gorillas, account_addr, vector::empty());
        };
        let tribe = table::borrow_mut(&mut game.gorillas, account_addr);
        vector::push_back(tribe, gorilla_obj);

        table::upsert(&mut game.last_action, account_addr, timestamp::now_seconds());
    }

    public entry fun evolve_gorilla(account: &signer, gorilla_id: u64) acquires GorillaGame, GorillaNFT {
        let account_addr = signer::address_of(account);
        let game = borrow_global_mut<GorillaGame>(@crypto_gorilla);

        assert!(
            !table::contains(&game.last_action, account_addr) ||
            timestamp::now_seconds() - *table::borrow(&game.last_action, account_addr) >= COOLDOWN_PERIOD,
            ENOT_ENOUGH_TIME_PASSED
        );

        assert!(table::contains(&game.gorillas, account_addr), ENOT_OWNER);
        let tribe = table::borrow(&game.gorillas, account_addr);
        assert!(gorilla_id < vector::length(tribe), ENOT_OWNER);

        let gorilla_obj = *vector::borrow(tribe, gorilla_id);
        let gorilla = borrow_global_mut<GorillaNFT>(object::object_address(&gorilla_obj));

        assert!(gorilla.stage < 3, ENOT_OWNER);

        coin::transfer<AptosCoin>(account, @crypto_gorilla, EVOLVE_COST);

        gorilla.stage = gorilla.stage + 1;

        table::upsert(&mut game.last_action, account_addr, timestamp::now_seconds());
    }

    #[view]
    public fun get_gorilla_info(gorilla: Object<token::Token>): (u8, u8, u8, u8) acquires GorillaNFT {
        let gorilla_data = borrow_global<GorillaNFT>(object::object_address(&gorilla));
        (gorilla_data.strength, gorilla_data.intelligence, gorilla_data.social_skills, gorilla_data.stage)
    }

    #[view]
    public fun get_tribe(account: address): vector<Object<token::Token>> acquires GorillaGame {
        let game = borrow_global<GorillaGame>(@crypto_gorilla);
        if (table::contains(&game.gorillas, account)) {
            *table::borrow(&game.gorillas, account)
        } else {
            vector::empty()
        }
    }

    #[view]
    public fun calculate_tribe_score(account: address): u64 acquires GorillaGame, GorillaNFT {
        let game = borrow_global<GorillaGame>(@crypto_gorilla);
        if (!table::contains(&game.gorillas, account)) {
            return 0
        };
        let tribe = table::borrow(&game.gorillas, account);
        let score = 0;
        let i = 0;
        while (i < vector::length(tribe)) {
            let gorilla = vector::borrow(tribe, i);
            let (strength, intelligence, social_skills, stage) = get_gorilla_info(*gorilla);
            score = score + (strength as u64) + (intelligence as u64) + (social_skills as u64) + (((stage + 1) as u64) * 50);
            i = i + 1;
        };
        score
    }

    #[view]
    public fun get_last_action_time(account: address): u64 acquires GorillaGame {
        let game = borrow_global<GorillaGame>(@crypto_gorilla);
        if (table::contains(&game.last_action, account)) {
            *table::borrow(&game.last_action, account)
        } else {
            0
        }
    }

    #[test_only]
    public fun init_module_for_test(creator: &signer) {
        init_module(creator);
    }
}