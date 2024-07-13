'use client'
import React, { useEffect, useState } from 'react';
import { createWalletClient, custom } from 'viem';
import { celo } from 'viem/chains';
import { Engine } from "@thirdweb-dev/engine";
import { createStore } from 'tinybase';
import { createLocalPersister } from 'tinybase/persisters';
import ScoreCard from './ScoreCard';

declare global {
    interface Window {
        ethereum: any;
    }
}

const Celon: React.FC = () => {
    const [address, setAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [score, setScore] = useState<number>(0);
    const [store, setStore] = useState<ReturnType<typeof createStore> | null>(null);
    const [persister, setPersister] = useState<ReturnType<typeof createLocalPersister> | null>(null);

    const engine = new Engine({
        url: "https://engine-production-0cf4.up.railway.app",
        accessToken: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweGM2Yzk4NEQ0NzRhRDQ5Qjc0NjExQzBkNTQ1MTc2NEQzQkI1QjNmODEiLCJzdWIiOiIweDMxQUI2MzdiRDMyNWI0QkY1MDE4YjM5REQxNTU2ODFEMDMzNDgxODkiLCJhdWQiOiJ0aGlyZHdlYi5jb20iLCJleHAiOjQ4NzQ0MTM4NzUsIm5iZiI6MTcyMDgxMzg3NSwiaWF0IjoxNzIwODEzODc1LCJqdGkiOiIwN2QxYmUyYS0yMWUyLTRhZGItODMzMy1iOWQwZmVmNTg3ZDUiLCJjdHgiOnsicGVybWlzc2lvbnMiOiJBRE1JTiJ9fQ.MHgyOGZjMjk2MTgyMzgxMzAwODk0MjEyNzZiYmRmYTgwN2I4ZmVlNjhkYWMxNjFmZGU1NjhiMDdmODkzMjU2ODY3MWRiMDQ3Nzg0MjY1Y2ViYmEyYjExY2Y0OGQ1NDk4OTY4YTE5NGI4ZmQzZTM0ODRlNjJhM2Y3NmY1MWJlNjUyZDFi",
    });

    useEffect(() => {
        const initStore = async () => {
            const newStore = createStore();
            const newPersister = createLocalPersister(newStore, 'celonStore');
            await newPersister.load();
            setStore(newStore);
            setPersister(newPersister);
            setScore(newStore.getValue('score') || 0);
            newStore.addValueListener('score', () => {
                setScore(newStore.getValue('score') || 0);
            });
            await newPersister.startAutoSave();
        };

        initStore();
        fetchAddress();
    }, []);

    const fetchAddress = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const client = createWalletClient({
                chain: celo,
                transport: custom(window.ethereum),
            });

            const addresses = await client.getAddresses();
            if (addresses && addresses.length > 0) {
                setAddress(addresses[0]);
            }
        } else {
            console.error('Ethereum provider not found');
        }
    };

    const handleTransfer = async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (!address) {
                throw new Error("Celo address not found");
            }

            await engine.erc20.transfer(
                "42220",
                "0x765DE816845861e75A25fCA122bb6898B8B1282a",
                "0x4cd4e1F317e66a68B8123CeF1aBA715c54879136",
                {
                    toAddress: address,
                    amount: "0.001",
                }
            );

            if (store) {
                const currentScore = store.getValue('score') || 0;
                store.setValue('score', currentScore + 1);
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center space-y-4'>
            <ScoreCard score={score} />
            <button
                onClick={handleTransfer}
                disabled={isLoading || !address}
                className="w-52 h-52 bg-gradient-to-br from-[#f05e23] to-[#d54d1b] 
                    text-white rounded-full flex items-center justify-center 
                    text-lg font-bold transition-all duration-300 ease-in-out
                    shadow-[0_10px_20px_rgba(240,94,35,0.3)] 
                    hover:shadow-[0_15px_30px_rgba(240,94,35,0.5)]
                    active:shadow-[0_5px_10px_rgba(240,94,35,0.3)]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transform hover:-translate-y-1 active:translate-y-1
                    before:content-[''] before:absolute before:top-0 before:left-0 
                    before:w-full before:h-full before:rounded-full
                    before:bg-gradient-to-br before:from-white/20 before:to-transparent 
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity
                    relative overflow-hidden"
            >
                {isLoading ? 'Transferring...' : 'Tap to earn'}
            </button>
            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    );
}

export default Celon;
