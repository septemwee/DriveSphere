import LogsTable from "@/components/logsTable";

export default async function ViewLogsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return <LogsTable page={page} />;
}

