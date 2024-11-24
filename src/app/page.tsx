"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  }
  return (
    <main className="flex flex-col h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={"text-6xl font-semibold text-white drop-shadow-md"}>📝 Task Manager</h1>
        <div>
          <span onClick={onClick} className="cursor-pointer">
            <Button variant={"secondary"} size={"lg"}>Get Started</Button>
          </span>
        </div>
      </div>
    </main >
  );
}
