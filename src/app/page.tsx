import Celon from "@/components/Celon";
import Image from "next/image";
import { useEffect, useState } from 'react';

export default function Home() {
  const [uniqueUserId, setUniqueUserId] = useState<string>('');

  useEffect(() => {
    // Generate or fetch a unique user ID here
    // This is just a placeholder implementation
    setUniqueUserId(`user_${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  // You'll need to implement the secure hash generation
  // This is just a placeholder
  const secureHash = "generatedSecureHash"; 

  const iframeSrc = `https://offers.cpx-research.com/index.php?app_id=16548&ext_user_id=${uniqueUserId}&secure_hash=${secureHash}&username=&email=&subid_1=&subid_2=`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Celon />
      {uniqueUserId && (
        <div className="w-full mt-8">
          <iframe 
            width="100%" 
            height="2000px" 
            src={iframeSrc}
            frameBorder="0"
            title="CPX Research Survey"
          />
        </div>
      )}
    </main>
  );
}
</document_content>
