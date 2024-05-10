import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="px-5">
        <Header />
      </div>

      <div className="px-5">
        <Search />
      </div>

      <div className="px-5">
        <CategoryList />
      </div>

      <div className=" flex md:flex-row justify-between gap-5 px-5">
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

      <div className="flex justify-between items-center px-5">
        <h2 className="font-semibold">Pedidos Recomendados</h2>

        <Button
          className="text-primary p-0 hover:bg-transparent"
          variant="ghost"
        >
          Ver todos <ChevronRightIcon />
        </Button>
      </div>

      <div className="pl-5">
        <ProductList products={products} />
      </div>
    </div>
  );
}
