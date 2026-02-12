"use client";
import { useEffect, useState } from "react";
import { refreshSession } from "../lib/session";

export default function SessionManager({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
    };
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const idleTime = Date.now() - lastActivity;
      if (idleTime < 15 * 60 * 1000) {
        refreshSession();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [lastActivity]);

  return children;
}
