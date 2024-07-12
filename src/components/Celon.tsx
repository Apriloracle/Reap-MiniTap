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
            accessToken: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweGM2Yzk4NEQ0NzRhRDQ5Qjc0NjExQzBkNTQ1MTc2NEQzQkI1QjNmODEiLCJzdWIiOiIweDMxQUI2MzdiRDMyNWI0QkY1MDE4YjM5REQxNTU2ODFEMDMzNDgxODkiLCJhdWQiOiJ0aGlyZHdlYi5jb20iLCJleHAiOjQ4NzQ0MTM4NzUsIm5iZiI6MTcyMDgxMzg3NSwiaWF0IjoxNzIwODEzODc1LCJqdGkiOiIwN2QxYmUyYS0yMWUyLTRhZGItODMzMy1iOWQwZmVmNTg3ZDUiLCJjdHgiOnsicGVybWlzc2lvbnMiOiJBRE1JTiJ9fQ.MHgyOGZjMjk2MTgyMzgxMzAwODk0MjEyNzZiYmRmYTgwN2I4ZmVlNjhkYWMxNjFmZGU1NjhiMDdmODkzMjU2ODY3MWRiMDQ3Nzg0MjY1Y2ViYmEyYjExY2Y0OGQ1NDk4OTY4YTE5NGI4ZmQzZTM0ODRlNjJhM2Y3NmY1MWJlNjUyZDFi",
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
                "0x765DE816845861e75A25fCA122bb6898B8B1282a", // Example ERC20 contract address on Celo Alfajores
                "0x4cd4e1F317e66a68B8123CeF1aBA715c54879136", // Backend wallet address
                {
                    toAddress: address,
                    amount: "0.001", // Transfer 1 token
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
                    className="w-40 h-40 bg-gradient-to-br from-[#f05e23] to-[#d54d1b] 
                        text-white rounded-full flex items-center justify-center 
                        text-lg font-medium transition-all duration-300 ease-in-out
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
