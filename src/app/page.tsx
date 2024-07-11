'use client'

import Celon from "@/components/Celon";
import { SquidWidget } from '@0xsquid/widget';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Celon />
      <div className="w-full max-w-[480px]">
        <SquidWidget config={{
          integratorId: "april-token-ae727f3a-94f1-4983-aba4-4f842803a827", // Replace with your actual partner ID
          companyName: "Celo App",
          slippage: 1,
          infiniteApproval: false,
          instantExec: false,
          apiUrl: "https://v2.api.squidrouter.com",
          priceImpactWarnings: {
            warning: 3,
            critical: 5,
          },
          initialFromChainId: 42220, // Celo mainnet
          initialToChainId: 1, // Ethereum mainnet
          // You can customize the chains you want to support
          comingSoonChainIds: [
            // Add any chain IDs you want to mark as "coming soon"
          ],
          // Add any other configuration options you need
        }} />
      </div>
    </main>
  );
}
