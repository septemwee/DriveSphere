"use client"; 

import { useState, useEffect } from "react"; 
import Image from "next/image";
import DroneInfo from "@/components/droneInfo";
import Link from 'next/link';

interface DroneConfig {
  drone_id: string;
  drone_name: string;
  light?: string;
  country: string;
}

async function getDroneConfig() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const droneId = process.env.NEXT_PUBLIC_DRONE_ID;

  if (!apiUrl || !droneId) {
    throw new Error("API URL or Drone ID is not configured in .env.local");
  }
  const response = await fetch(`${apiUrl}/configs/${droneId}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch: Server responded with ${response.status}`);
  }
  return response.json();
}

export default function ViewConfigPage() {
  const [config, setConfig] = useState<DroneConfig | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await getDroneConfig();
        setConfig(data);
      } catch (err: any) {
        setError(new Error("Failed to connect to the drone-server. Is it running?"));
        console.error("CRITICAL: Could not connect to the API server.", err);
      }
    };
    loadConfig();
  }, []); 


  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-center px-8 bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="max-w-lg w-full bg-white p-12 rounded-2xl shadow-xl border border-red-200/50">
          <h1 className="text-4xl font-bold text-red-600">Connection Error</h1>
          <p className="text-slate-700 mt-6 mb-6 text-lg">{error.message}</p>
          <div className="bg-slate-100 p-4 rounded-lg text-sm text-slate-600">
            Please ensure the <strong>drone-server</strong> is running and accessible.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-screen flex items-start md:items-center justify-center py-12 md:py-0">
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-6 md:px-12">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            <Image
              src="/images/Dronepic.png"
              alt="Drone Preview"
              width={800} 
              height={600} 
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 gap-6 flex flex-col items-center md:items-start text-center md:text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight break-words">
              {config ? (config.drone_name || "Deliberate Drive") : (
                <span className="animate-pulse text-slate-400">Loading...</span>
              )}
            </h1>
            
            <p className="mt-4 text-base text-slate-600 max-w-prose leading-relaxed">
              Powering precision agriculture through meticulously planned missions and autonomous fieldwork.
            </p>
          </div>
          <DroneInfo config={config} />


          <Link href="/log" className="text-sm sm:text-base text-slate-600 max-w-prose leading-relaxed hover:text-blue-600 transition-colors duration-150">
            View activity logs for precision agriculture missions &rarr;
          </Link>

        </div>
      </div>
    </div>
  );
}