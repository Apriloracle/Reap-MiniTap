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

    handleButtonClick = async () => {
        if (!this.state.address) {
            console.log('Please connect your wallet first.');
            return;
        }

        try {
            const response = await fetch(
                "https://engine-production-8f21.up.railway.app/contract/42220/0xE84ca0aC757F9a934a26CfbebDeA40DD3491041f/erc721/mint-to",
                {
                    method: "POST",
                    headers: {
                        "accept": "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer 30lqWCBf5051sobcz6cCx4i7lEmgA_J-jiVa8E3_riB9418ij34SuETgmbwni9Pkh-8QxtX-5VeZzJvkkmgATA",
                        "x-backend-wallet-address": "0xf7f6772024E2c2B8A2FBa74Bd456647f5c3D5852",
                    },
                    body: JSON.stringify({
                        receiver: this.state.address,
                        metadata: {
                            name: "Reap Membership",
                            description: "Reap loyalty program for users",
                            image: "ipfs://QmciR3WLJsf2BgzTSjbG5zCxsrEQ8PqsHK7JWGWsDSNo46/nft.png"
                        }
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Minting failed: ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            console.log('Minting successful:', data);
            // Update UI to show success message
        } catch (error) {
            console.error('Error during minting:', error instanceof Error ? error.message : 'Unknown error');
            // Update UI to show error message
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