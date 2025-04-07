"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function ProgressLoader() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 100);
    const timer2 = setTimeout(() => setProgress(100), 200);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="w-[80%] max-w-md">
        <Progress value={progress} className="h-3 bg-muted" />
      </div>
    </div>
  );
}
