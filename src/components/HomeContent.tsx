'use client'
import { useState, useEffect } from "react";
import Celon from "./Celon";

export default function HomeContent() {
  const [celoAddress, setCeloAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setIsLoading(true);
        const celon = new Celon({});
        const address = await celon.getAddress();
        setCeloAddress(address || '');
      } catch (err) {
        console.error("Error fetching Celo address:", err);
        setError("Failed to fetch Celo address");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAddress();
  }, []);

  const iframeUrl = `https://web-offerwall.appsprize.com/?token=as9GqumRByGZhNvN3f2pORG-VnRw22ZG16Mn&userid=${celoAddress}`;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Celo App</h1>
      <Celon />
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <p>Loading Celo address...</p>
      ) : (
        <p>Celo Address: {celoAddress || 'Not available'}</p>
      )}
      <div className="w-full max-w-3xl mt-8">
        <iframe
          src={iframeUrl}
          width="100%"
          height="600px"
          frameBorder="0"
          title="AppsPrize Offerwall"
        />
      </div>
    </>
  );
}
