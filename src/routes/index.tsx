import { createFileRoute } from "@tanstack/react-router";
import { TimelineApp } from "@/timeline/TimelineApp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <TimelineApp />;
}
