'use client'
import React, { useState, useEffect } from 'react';
import { createWalletClient, custom } from 'viem';
import { celo } from 'viem/chains';
import { Engine } from "@thirdweb-dev/engine";
import ScoreCard from './ScoreCard';

declare global {
    interface Window {
        ethereum: any;
    }
}

class Celon extends React.Component<{}, { address: string | null; error: string | null; score: number }> {
    private engine: Engine;

    constructor(props: {}) {
        super(props);
        this.state = { 
            address: null, 
            error: null,
            score: 0
        };

        this.engine = new Engine({
            url: "https://engine-production-9e7e.up.railway.app",
            accessToken: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweGU1MzdjZDVEREI5ZTQ4ZTdEYkMwMTk4RDU0Qjc3MjZEQjEzQjlBRTkiLCJzdWIiOiIweDMxQUI2MzdiRDMyNWI0QkY1MDE4YjM5REQxNTU2ODFEMDMzNDgxODkiLCJhdWQiOiJ0aGlyZHdlYi5jb20iLCJleHAiOjQ4NzQ1MDUxMDUsIm5iZiI6MTcyMDkwNTEwNSwiaWF0IjoxNzIwOTA1MTA1LCJqdGkiOiIyNjI1M2JiNS0yYjg0LTQwNjMtYmI4Mi1hZjAzZjM2NTQ1NTYiLCJjdHgiOnsicGVybWlzc2lvbnMiOiJBRE1JTiJ9fQ.MHhhYmIyMWI2NDNmODBmODA4MTk5NTE2MDNjYWY5YjExMzBiMTNiOTdjNmZiMDgwZDZjN2FlYjU1YjM1MGUyYzNlMmUyNWMwZTVlYzZmMTI5NGUxOGQxYzdmZGUyNzllODIzZTNiNDAwMWFlNjcyZGEzM2IyMDA2NDM1MWE1MDVmMTFi",
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
        try {
            const address = await this.getAddress();

            if (!address) {
                throw new Error("Celo address not found");
            }

            // First transfer
            await this.engine.erc20.transfer(
                "42220",
                "0x765DE816845861e75A25fCA122bb6898B8B1282a",
                "0x4cd4e1F317e66a68B8123CeF1aBA715c54879136",
                {
                    toAddress: address,
                    amount: "0.001",
                }
            );

            // Second transfer
            await this.engine.erc20.transfer(
                "42220",
                "0x18719D2e1e57A1A64708e4550fF3DEF9d1074621",
                "0xc2c381f8e2Fa022314dF63d9956F1709FC4d5827",
                {
                    toAddress: address,
                    amount: "0.1",
                }
            );

            // Increment the score
            this.setState(prevState => ({ score: prevState.score + 1, error: null }));

        } catch (err) {
            this.setState({ error: err instanceof Error ? err.message : String(err) });
        }
    };

    render() {
        const { address, error, score } = this.state;

        return (
          <div className='flex flex-col items-center space-y-4'>
                <div className='text-sm'>
                    {address ? `Celo Address: ${address}` : 'Loading...'}
                </div>
                <div className="text-[#FFA500] text-4xl font-bold mb-8">
                    {score.toLocaleString()}
                </div>
                <div className="relative w-48 h-48">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E1E1E] to-black rounded-xl transform rotate-45"></div>
                    <div className="absolute inset-2 bg-gradient-to-br from-[#FF6B00] to-[#FF3D00] rounded-xl transform rotate-45"></div>
                    <div className="absolute inset-3 bg-black rounded-lg transform rotate-45 flex items-center justify-center">
                        <svg className="w-16 h-16 text-[#FF6B00]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L1 21h22L12 2zm0 3.84L19.36 19H4.64L12 5.84zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
                        </svg>
                    </div>
                </div>
                <button
                    onClick={this.handleTransfer}
                    disabled={isLoading || !address}
                    className="mt-4 px-6 py-2 bg-[#FF6B00] text-white rounded-full font-bold"
                >
                    {isLoading ? 'Processing...' : 'Tap'}
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
