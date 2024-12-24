script {
    use crypto_gorilla::gorilla_game_module;

    fun init_game(account: &signer) {
        gorilla_game_module::initialize_game(account);
    }
} 