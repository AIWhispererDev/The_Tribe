// Previous code remains the same until the last few lines...

          <AnimatePresence mode="wait">
            {showEvolution && <EvolutionCelebration />}
            <TransactionFeedback status={transactionStatus} />
          </AnimatePresence>
        </ParallaxBackground>
      );
    };

    export default CryptoGorillaGame;
