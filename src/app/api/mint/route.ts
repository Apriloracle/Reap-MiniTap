import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userWalletAddress } = await request.json();

  try {
    const response = await fetch(
      "https://engine-production-8f21.up.railway.app/contract/42220/0xE84ca0aC757F9a934a26CfbebDeA40DD3491041f/erc721/mint-to",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer c5f6b4a04b50e000baf3519fd5e7de99",
          "x-backend-wallet-address": "0xf7f6772024E2c2B8A2FBa74Bd456647f5c3D5852",
        },
        body: JSON.stringify({
          receiver: userWalletAddress,
          metadata: {
            name: "Reap Membership",
            description: "Reap loyalty program for users",
            image: "ipfs://QmciR3WLJsf2BgzTSjbG5zCxsrEQ8PqsHK7JWGWsDSNo46/nft.png"
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Minting failed');
    }

    const data = await response.json();
    return NextResponse.json({ message: "NFT minted successfully!", data });
  } catch (error) {
    console.error('Error during minting:', error);
    return NextResponse.json({ message: 'Error occurred during minting' }, { status: 500 });
  }
}