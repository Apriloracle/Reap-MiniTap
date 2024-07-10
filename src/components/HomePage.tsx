import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [aprilPrice, setAprilPrice] = useState(0);
  const [usdBalance, setUsdBalance] = useState(0);

  const fetchAprilPrice = async () => {
    console.log("Fetching APRIL price...");
    try {
      const response = await fetch('https://us-central1-postback-server.cloudfunctions.net/getCoinMarketCapQuotes');
      const data = await response.json();
      console.log("API Response:", data);
      
      setAprilPrice(data.aprilPrice);
      console.log("APRIL Price set to:", data.aprilPrice);
    } catch (error) {
      console.error('Error fetching APRIL price:', error);
    }
  };

  useEffect(() => {
    fetchAprilPrice();
  }, []);

  useEffect(() => {
    const calculatedUsdBalance = 4000 * aprilPrice;
    setUsdBalance(calculatedUsdBalance);
    console.log("Calculated USD Balance:", calculatedUsdBalance);
  }, [aprilPrice]);

  return (
    <div className="bg-white p-4 max-w-md mx-auto font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Home</h1>
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </header>

      {/* Balance Card */}
      <div className="bg-orange-500 rounded-3xl p-4 mb-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm opacity-80">Total Balance</p>
            <h2 className="text-4xl font-bold">${usdBalance.toFixed(2)}</h2>
          </div>
          <button className="bg-white text-orange-500 px-4 py-2 rounded-full flex items-center">
            Cashout 
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between">
          <div className="bg-orange-400 rounded-xl p-2 flex items-center">
            <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <div>
              <p className="text-xs opacity-80">Available APRIL</p>
              <p className="font-bold">4000 (${usdBalance.toFixed(2)})</p>
            </div>
          </div>
          <div className="bg-orange-400 rounded-xl p-2 flex items-center">
            <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <div>
              <p className="text-xs opacity-80">Pending APRIL</p>
              <p className="font-bold">15.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Banner */}
      <div className="bg-white rounded-xl p-4 mb-6 flex items-center justify-between border border-gray-200">
        <div>
          <p className="font-bold">Earn <span className="text-orange-500">80 APRIL</span> per friend invited</p>
        </div>
        <Image src="/api/placeholder/80/80" alt="Referral" width={80} height={80} className="rounded-xl" />
      </div>

      {/* Recommended Section */}
      <section className="mb-6">
        <h3 className="text-xl font-bold mb-4">Recommended</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: "⚽", label: "Sports" },
            { icon: "🛒", label: "Shopping" },
            { icon: "📝", label: "Survey" },
            { icon: "💱", label: "Crypto to Fiat" },
            { icon: "🎟️", label: "Vouchers" },
            { icon: "📱", label: "Airtime/data", link: "/airtime" },
          ].map((item, index) => (
            <Link key={index} href={item.link || "#"} className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-gray-200">
              <span className="text-2xl mb-2">{item.icon}</span>
              <p className="text-sm">{item.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Earn History */}
      <section className="mb-20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Earn History</h3>
          <button className="text-orange-500">View All &gt;</button>
        </div>
        <div className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-200">
          <div className="flex items-center">
            <svg className="h-10 w-10 mr-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div>
              <p className="font-bold">Referral Bonus</p>
            </div>
          </div>
          <p className="text-green-500 font-bold">+80</p>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
        {[
          { icon: "🏠", label: "Home", active: true },
          { icon: "💰", label: "Earn" },
          { icon: "🎮", label: "Games" },
          { icon: "⚽", label: "Sports" },
        ].map((item, index) => (
          <button key={index} className={`flex flex-col items-center ${item.active ? 'text-orange-500' : 'text-gray-400'}`}>
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
