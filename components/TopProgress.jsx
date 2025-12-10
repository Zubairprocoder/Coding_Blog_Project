"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";

export default function TopProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(20);
    const timer1 = setTimeout(() => setProgress(50), 200);
    const timer2 = setTimeout(() => setProgress(80), 400);
    const timer3 = setTimeout(() => setProgress(100), 600);
    const reset = setTimeout(() => setProgress(0), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(reset);
    };
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Progress
        value={progress}
        className="h-0.5 bg-blue-100 transition-all duration-300"
      />
    </div>
  );
}
