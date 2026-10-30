import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/fitness/shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Shell />;
}
