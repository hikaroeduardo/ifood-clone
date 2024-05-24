"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!search) return;

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleSearch}
        value={search}
      />

      <Button size="icon" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
