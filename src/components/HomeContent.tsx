'use client'
import { useState, useEffect } from "react";
import Celon from "./Celon";

export default function HomeContent() {
  const [celoAddress, setCeloAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setIsLoading(true);
        const celon = new Celon({});
        const address = await celon.getAddress();
        if (address) {
          setCeloAddress(address);
        } else {
          setError("Celo address not available");
        }
      } catch (err) {
        console.error("Error fetching Celo address:", err);
        setError("Failed to fetch Celo address");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAddress();
  }, []);

  const iframeUrl = `https://web-offerwall.appsprize.com/?token=as9GqumRByGZhNvN3f2pORG-VnRw22ZG16Mn&userid=${celoAddress || ''}`;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Celo App</h1>
      <div className="w-full bg-gray-100 p-4 rounded-lg mb-4">
        {isLoading ? (
          <p className="text-lg">Loading Celo address...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : celoAddress ? (
          <p className="text-lg">Celo Address: {celoAddress}</p>
        ) : (
          <p className="text-lg">Celo Address: Not available</p>
        )}
      </div>
      <div className="w-full">
        <iframe
          src={iframeUrl}
          width="100%"
          height="600px"
          frameBorder="0"
          title="AppsPrize Offerwall"
        />
      </div>
    </div>
  );
}
