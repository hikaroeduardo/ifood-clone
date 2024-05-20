import { db } from "@/app/_lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import BtnBackRouter from "./_components/btn-back-router";
import ProductInfo from "./_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurantId,
      },
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <div className="relative w-full h-[360px]">
        <Image
          src={product?.imageUrl}
          alt={product?.name}
          fill
          className="object-cover"
        />

        <BtnBackRouter />
      </div>

      <ProductInfo product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductPage;
