import { payloadsApi } from "@/api/payload";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const payloadsQuery = useQuery({
    queryKey: ["payloads"],
    queryFn: payloadsApi.search,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-800">
      
    </main>
  );
}
