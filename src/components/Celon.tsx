'use client'
import React, { useState, useEffect } from 'react';
import { createWalletClient, custom } from 'viem';
import { mainnet, celo, celoAlfajores } from 'viem/chains';

declare global {
    interface Window {
        ethereum: any;
    }
}

const Celon = () => {
    const [address, setAddress] = useState<string | null>(null);

    useEffect(() => {
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

        fetchAddress();
    }, []);

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    return (
        <div className='text-sm'>
            {address ? `celo Address: ${address}` : 'Loading...'}
        </div>
    );
};

export default Celon;
