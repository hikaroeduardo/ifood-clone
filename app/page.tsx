import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

export default function Home() {
  return (
    <div className="space-y-6">
      <Header />

      <div className="px-5">
        <Search />
      </div>

      <div className="px-5">
        <CategoryList />
      </div>

      <div className="px-5 flex md:flex-row justify-between gap-5">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto"
          width={500}
          height={215}
          className="w-full"
          quality={100}
        />

        <Image
          src="/promo-banner-02.png"
          alt="A partir de R$ 17,90 em lanches"
          width={500}
          height={215}
          className="w-full hidden md:block"
          quality={100}
        />
      </div>
    </div>
  );
}
