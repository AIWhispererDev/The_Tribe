import { useState, useEffect } from 'react';
import { AptosClient } from 'aptos';
import { Gorilla } from '../types/types';
import { useNightlyWallet } from '../contexts/NightlyWalletContext';
import { updateTribe } from '../game/tribeLogic';

const CRYPTO_GORILLA_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const NODE_URL = import.meta.env.VITE_NODE_URL || "http://127.0.0.1:8080/v1";
const MAX_TRIBE_SIZE = 5;

const client = new AptosClient(NODE_URL);

export const useGameState = () => {
  const { adapter, isConnected, account } = useNightlyWallet();
  const [tribe, setTribe] = useState<Array<Gorilla | null>>([null, null, null, null, null]);
  const [tribeScore, setTribeScore] = useState(0);
  const [bananaTokens, setBananaTokens] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState<'pending' | 'success' | 'error' | null>(null);

  const fetchTribeData = async () => {
    if (!adapter || !adapter.publicAccount || !adapter.publicAccount.address) {
      console.log("No wallet connected or invalid adapter configuration");
      return;
    }

    try {
      console.log("Fetching tribe data for address:", adapter.publicAccount.address);
      
      const tribeResponse = await client.view<string[]>({
        function: `${CRYPTO_GORILLA_ADDRESS}::gorilla_game_module::get_tribe`,
        type_arguments: [],
        arguments: [adapter.publicAccount.address],
      });

      const gorillaIds = tribeResponse[0] as string[];
      const detailedTribe = await Promise.all(gorillaIds.map(async (gorillaId: string) => {
        const info = await client.view<[number, number, number, number, number, number, number, string]>({
          function: `${CRYPTO_GORILLA_ADDRESS}::gorilla_game_module::get_gorilla_info`,
          type_arguments: [],
          arguments: [gorillaId],
        });

        if (!info || info.length < 8) {
          console.error('Invalid gorilla info response:', info);
          return null;
        }

        return {
          id: gorillaId,
          name: `${['Baby', 'Juvenile', 'Adult', 'Silverback'][Number(info[3])]} Gorilla`,
          strength: Number(info[0]),
          intelligence: Number(info[1]),
          socialSkills: Number(info[2]),
          stage: Number(info[3]),
          agility: Number(info[4] || 1),
          endurance: Number(info[5] || 1),
          leadership: Number(info[6] || 1),
          rarity: info[7] as 'common' | 'rare' | 'epic' | 'legendary'
        };
      }));

      // Pad the tribe array with nulls if needed
      const paddedTribe = [...detailedTribe];
      while (paddedTribe.length < MAX_TRIBE_SIZE) {
        paddedTribe.push(null);
      }

      setTribe(paddedTribe);
      updateTribe(paddedTribe); // Keep tribeLogic in sync

      // Update tribe score from chain
      const scoreResponse = await client.view({
        function: `${CRYPTO_GORILLA_ADDRESS}::gorilla_game_module::calculate_tribe_score`,
        type_arguments: [],
        arguments: [adapter.publicAccount.address],
      });
      
      setTribeScore(Number(scoreResponse[0]));
    } catch (error: any) {
      console.error("Error fetching tribe data:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    if (adapter?.publicAccount) {
      fetchTribeData();
    }
  }, [adapter]);

  useEffect(() => {
    updateTribe(tribe); // Keep tribeLogic in sync whenever tribe changes
  }, [tribe]);

  const executeTransaction = async (
    functionName: string,
    args: any[],
    pendingMessage: string,
    successMessage: string
  ) => {
    if (!isConnected || !account || !adapter) {
      return false;
    }

    try {
      setTransactionStatus('pending');

      const fullFunctionName = `${CRYPTO_GORILLA_ADDRESS}::gorilla_game_module::${functionName}`;
      const payload = {
        type: "entry_function_payload",
        function: fullFunctionName,
        type_arguments: [],
        arguments: args.map(arg => {
          if (typeof arg === 'string' && !isNaN(Number(arg))) {
            return Number(arg);
          }
          return arg;
        }),
        gas_unit_price: "100",
        max_gas_amount: "1000"
      };

      const serializedPayload = JSON.parse(JSON.stringify(payload));
      const response = await adapter.signAndSubmitTransaction(serializedPayload);
      
      if (response?.hash) {
        await client.waitForTransaction(response.hash);
        await fetchTribeData();
        setTransactionStatus('success');
        return true;
      } else {
        throw new Error('Transaction failed: No transaction hash returned');
      }
    } catch (error: any) {
      console.error(`Error executing ${functionName}:`, error);
      setTransactionStatus('error');
      return false;
    }
  };

  const mintGorilla = async (index: number) => {
    if (!account?.address) return;
    return executeTransaction(
      'mint_gorilla',
      [account.address],
      'Minting your gorilla...',
      'Your gorilla has been minted successfully!'
    );
  };

  const burnGorilla = async (gorillaId: string) => {
    const id = BigInt(gorillaId).toString();
    return executeTransaction(
      'burn_gorilla',
      [id],
      'Burning your gorilla...',
      'Your gorilla has been burned successfully!'
    );
  };

  const evolveGorilla = async (gorillaId: string) => {
    return executeTransaction(
      'evolve_gorilla',
      [gorillaId],
      'Evolving your gorilla...',
      'Your gorilla has evolved successfully!'
    );
  };

  return {
    tribe,
    tribeScore,
    bananaTokens,
    transactionStatus,
    setTransactionStatus,
    fetchTribeData,
    mintGorilla,
    burnGorilla,
    evolveGorilla
  };
};
