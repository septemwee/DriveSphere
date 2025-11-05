'use client';

interface Config {
  drone_id: string;
  drone_name: string;
  light?: string;
  country: string;
}

interface DroneInfoProps {
  config: Config | null;
}

export default function DroneInfo({ config }: DroneInfoProps) {
  

  if (!config) {
    const infoItems = [
      { label: "Drone ID", value: "Loading..." },
      { label: "Drone Name", value: "Loading..." },
      { label: "Light Status", value: "Loading..." },
      { label: "Country", value: "Loading..." },
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full animate-pulse">
        {infoItems.map((item, i) => (
          <div
            key={i}
            className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-md text-center sm:text-left"
          >
            <p className="text-sm sm:text-base font-medium text-slate-500">
              {item.label}
            </p>
            <p className="text-lg sm:text-xl font-semibold text-slate-400 mt-2 break-all">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    );
  }

  const infoItems = [
    { label: "Drone ID", value: config.drone_id },
    { label: "Drone Name", value: config.drone_name },
    { label: "Light Status", value: config.light },
    { label: "Country", value: config.country },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      {infoItems.map((item, i) => (
        <div
          key={i}
          className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-md text-center sm:text-left hover:scale-[1.02] transition-transform"
        >
          <p className="text-sm sm:text-base font-medium text-slate-500">
            {item.label}
          </p>

          {item.label === "Light Status" ? (
            <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
              <div
                className={`h-3.5 w-3.5 rounded-full ${
                  config.light?.toLowerCase() === "on"
                    ? "bg-green-500"
                    : "bg-slate-400"
                }`}
              />
              <p className="text-xl sm:text-2xl font-bold text-slate-800 uppercase">
                {config.light || 'OFF'}
              </p>
            </div>
          ) : (
            <p className="text-lg sm:text-xl font-semibold text-slate-800 mt-2 break-all">
              {item.value || '-'}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}