'use client'
import React, { useState, useEffect } from 'react';
import { createWalletClient, custom } from 'viem';
import { celo } from 'viem/chains';
import { Engine } from "@thirdweb-dev/engine";

declare global {
    interface Window {
        ethereum: any;
    }
}

class Celon extends React.Component<{}, { address: string | null; isLoading: boolean; transactionHash: string | null; error: string | null }> {
    private engine: Engine;

    constructor(props: {}) {
        super(props);
        this.state = { 
            address: null, 
            isLoading: false, 
            transactionHash: null, 
            error: null 
        };

        this.engine = new Engine({
            url: "https://engine-production-0cf4.up.railway.app",
            accessToken: "ebb92649a298e9796e23624e362da844",
        });
    }

    componentDidMount() {
        this.fetchAddress();
    }

    async fetchAddress() {
        if (typeof window.ethereum !== 'undefined') {
            const client = createWalletClient({
                chain: celo,
                transport: custom(window.ethereum),
            });

            const addresses = await client.getAddresses();
            if (addresses && addresses.length > 0) {
                this.setState({ address: addresses[0] });
            }
        } else {
            console.error('Ethereum provider not found');
        }
    }

    async getAddress(): Promise<string | null> {
        if (!this.state.address) {
            await this.fetchAddress();
        }
        return this.state.address;
    }

    handleTransfer = async () => {
        this.setState({ isLoading: true, error: null, transactionHash: null });

        try {
            const address = await this.getAddress();

            if (!address) {
                throw new Error("Celo address not found");
            }

            const result = await this.engine.erc20.transfer(
                "42220", // Celo Alfajores Testnet chain ID
                "0x18719D2e1e57A1A64708e4550fF3DEF9d1074621", // Example ERC20 contract address on Celo Alfajores
                "0x4cd4e1F317e66a68B8123CeF1aBA715c54879136", // Backend wallet address
                {
                    toAddress: address,
                    amount: "1.0", // Transfer 1 token
                }
            );

        } catch (err) {
            this.setState({ error: err instanceof Error ? err.message : String(err) });
        } finally {
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { address, isLoading, transactionHash, error } = this.state;

        return (
            <div className='flex flex-col items-center space-y-4'>
                <div className='text-sm'>
                    {address ? `Celo Address: ${address}` : 'Loading...'}
                </div>
                <button
                    onClick={this.handleTransfer}
                    disabled={isLoading || !address}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isLoading ? 'Transferring...' : 'Transfer ERC20 Token'}
                </button>
                {transactionHash && (
                    <p className="text-green-500">
                        Transfer successful! Transaction hash: {transactionHash}
                    </p>
                )}
                {error && (
                    <p className="text-red-500">Error: {error}</p>
                )}
            </div>
        );
    }
}

export default Celon;
