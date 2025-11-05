"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "./pagination";
import Link from "next/link";

interface LogEntry {
  id: string;
  drone_id: number;
  drone_name: string;
  created: string;
  country: string;
  celsius: number;
}

export default function LogsTable({ page }: { page: number }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || page;

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
        const res = await fetch(
          `${apiUrl}/logs-paginated/${droneId}?page=${currentPage}`
        );
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setLogs(data.items || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
        setLogs([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [currentPage]);

  const renderCreated = (created: string) => {
    if (!created) return "-";
    const formatted = new Date(created).toLocaleString();
    return formatted.replace(",", ",\n");
  };

  const TableSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg w-full max-w-7xl mx-auto flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <table className="min-w-full table-fixed divide-y divide-gray-200 text-center">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider w-[30%]">
                Created
              </th>
              <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider w-[20%]">
                Country
              </th>
              <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider w-[10%]">
                ID
              </th>
              <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider w-[25%]">
                Name
              </th>
              <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider w-[15%]">
                Celsius
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-20 text-base">
                <span className="animate-pulse">Loading...</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-4rem)] w-full flex flex-col p-4 sm:p-6 md:py-8">
      <div className="flex justify-between items-center mb-4 flex-shrink-0 max-w-7xl mx-auto w-full">
        <h1 className="text-lg sm:text-2xl font-semibold text-gray-800">
          Drone Logs
        </h1>
        <Link
          href="/form"
          className="bg-black text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors shadow-sm hover:shadow-md text-sm font-medium"
        >
          + Add
        </Link>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
  
        <div className="bg-white rounded-xl shadow-lg w-full max-w-7xl mx-auto flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-x-auto overflow-y-auto">
            <table className="min-w-full table-fixed divide-y divide-gray-200 text-center">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider w-[30%]">
                    Created
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider w-[20%]">
                    Country
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider w-[10%]">
                    ID
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider w-[25%]">
                    Name
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider w-[15%]">
                    Celsius
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {logs.length > 0 ? (
                  logs.map((log, idx) => (
                    <tr
                      key={log.id}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-2 sm:px-4 py-3 text-[10px] sm:text-sm text-gray-700 whitespace-pre-line">
                        {renderCreated(log.created)}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-[10px] sm:text-sm text-gray-700">
                        {log.country}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-[10px] sm:text-sm text-gray-700">
                        {log.drone_id}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-[10px] sm:text-sm text-gray-700 break-words">
                        {log.drone_name}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-[10px] sm:text-sm text-gray-700">
                        {log.celsius}°C
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-10 text-sm">
                      No logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex-shrink-0 pt-6 w-full max-w-7xl mx-auto">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
