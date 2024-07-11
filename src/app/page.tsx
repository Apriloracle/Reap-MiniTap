import Celon from "@/components/Celon";
import { useState, useEffect } from "react";

export default function Home() {
  const [celoAddress, setCeloAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      const celon = new Celon();
      const address = await celon.getAddress();
      setCeloAddress(address);
    };

    fetchAddress();
  }, []);

  const iframeUrl = `https://web-offerwall.appsprize.com/?token=as9GqumRByGZhNvN3f2pORG-VnRw22ZG16Mn&userid=${celoAddress || ''}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Celo App</h1>
      <Celon />
      {celoAddress && (
        <div className="w-full max-w-3xl mt-8">
          <iframe
            src={iframeUrl}
            width="100%"
            height="600px"
            frameBorder="0"
            title="AppsPrize Offerwall"
          ></iframe>
        </div>
      )}
    </main>
  );
}
