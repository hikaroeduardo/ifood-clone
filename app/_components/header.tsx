import Link from "next/link";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between pt-6 px-5">
      <Link href="/">
        <h1 className="font-bold text-2xl">
          Seu<span className="text-primary">Lanche</span>.com
        </h1>
      </Link>

      <Button
        size="icon"
        variant="outline"
        className="bg-transparent border-none"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
