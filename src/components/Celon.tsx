'use client'
import React from 'react';
import { createWalletClient, custom } from 'viem';
import { celo } from 'viem/chains';

declare global {
    interface Window {
        ethereum: any;
    }
}

class Celon extends React.Component<{}, { address: string | null }> {
    constructor(props: {}) {
        super(props);
        this.state = { address: null };
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

    handleButtonClick = async () => {
        if (!this.state.address) {
            console.log('Please connect your wallet first.');
            return;
        }

        try {
            const response = await fetch('/api/mint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userWalletAddress: this.state.address }),
            });

            if (!response.ok) {
                throw new Error('Minting failed');
            }

            const data = await response.json();
            console.log('Minting successful:', data);
        } catch (error) {
            console.error('Error during minting:', error);
        }
    }

    render() {
        return (
            <div className='flex flex-col items-center'>
                <div className='text-sm mb-4'>
                    {this.state.address ? `Celo Address: ${this.state.address}` : 'Loading...'}
                </div>
                <button 
                    onClick={this.handleButtonClick}
                    className='w-32 h-32 bg-orange-500 rounded-full text-white font-bold text-xl shadow-lg hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300'
                >
                    Mint NFT
                </button>
            </div>
        );
    }
}

export default Celon;
