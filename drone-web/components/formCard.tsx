'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

interface FormCardProps {
  apiUrl: string;
  droneId: string;
}

export default function FormCard({ apiUrl, droneId }: FormCardProps) {
  const [celsius, setCelsius] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const configRes = await fetch(`${apiUrl}/configs/${droneId}`);
      if (!configRes.ok) throw new Error('Failed to fetch drone configuration');
      const config = await configRes.json();

      const logData = {
        drone_id: config.drone_id,
        drone_name: config.drone_name,
        country: config.country,
        celsius: Number(celsius),
      };

      const logRes = await fetch(`${apiUrl}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData),
      });

      if (!logRes.ok) throw new Error('Failed to save log entry');

      setMessage('Data has been successfully saved.');
      setCelsius('');
    } catch (error: any) {
      setMessage(`${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isSuccess = message.startsWith('Data');

  const handleLogAnother = () => {
    setMessage('');
  };

  return (
    <div className="w-full max-w-lg bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-lg p-10">

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center text-center py-4 transition-all duration-300 ease-in-out">
          <svg
            className="h-16 w-16 text-green-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h2 className="text-2xl font-semibold text-slate-800">
            Success!
          </h2>
          <p className="text-gray-600 mt-1">{message}</p>


          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full">
            <button
              onClick={handleLogAnother}
              className="w-full text-center border border-black text-black px-5 py-2.5 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-300 font-medium"
            >
              Log Another
            </button>
            <Link
              href="/log"
              className="w-full text-center bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-600 transition-colors duration-300 font-medium"
            >
              View Logs
            </Link>
          </div>

        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-slate-900 text-center mb-6">
            Log Temperature
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="celsius"
                className="block text-gray-700 font-medium mb-2"
              >
                Temperature (°C)
              </label>
              <input
                type="number"
                step="any"
                id="celsius"
                value={celsius}
                onChange={(e) => setCelsius(e.target.value)}
                placeholder="e.g. 36.5"
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black/70 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center ${isLoading
                  ? 'bg-black opacity-70 cursor-not-allowed'
                  : 'bg-black hover:bg-neutral-800 active:bg-neutral-900 shadow-sm hover:shadow-md'
                }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Save Log'
              )}
            </button>

            {message && !isSuccess && (
              <div className="text-center mt-4">
                <p className="font-medium text-red-600">{message}</p>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}