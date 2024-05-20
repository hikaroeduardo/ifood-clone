"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const BtnBackRouter = () => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <Button
      className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
      size="icon"
      onClick={handleBackClick}
    >
      <ChevronLeftIcon />
    </Button>
  );
};

export default BtnBackRouter;
