import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between pt-6 px-5">
      <h1 className="font-bold text-2xl">
        Seu<span className="text-primary">Lanche</span>.com
      </h1>

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
