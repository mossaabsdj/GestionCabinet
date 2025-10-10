"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/app/component/sidebar/page";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/Accueill"); // redirects to /Accueill without back button history
  }, [router]);

  return null; // nothing to show while redirecting
}
