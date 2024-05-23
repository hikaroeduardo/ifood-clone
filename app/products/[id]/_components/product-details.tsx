"use client";

import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductInfo = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () =>
    setQuantity((prevState) => prevState + 1);

  const handleDecreaseQuantityClick = () =>
    setQuantity((prevState) => {
      if (prevState === 1) {
        return 1;
      }

      return prevState - 1;
    });

  return (
    <div className="py-5">
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative w-6 h-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="text-xl font-bold mb-2 mt-1 px-5">{product.name}</h1>

      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>

            {product.discountPercentage && <DiscountBadge product={product} />}
          </div>

          {product.discountPercentage > 0 && (
            <p className="text-muted-foreground text-sm">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        <div className="flex gap-3 items-center text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>

          <span className="w-4">{quantity}</span>

          <Button size="icon" onClick={handleIncreaseQuantityClick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <DeliveryInfo restaurant={product.restaurant} />

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-muted-foreground text-sm">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3 pl-5">
        <h3 className="font-semibold">Sucos</h3>

        <ProductList products={complementaryProducts} />
      </div>

      <div className="px-5 mt-6">
        <Button className="w-full font-semibold">Adicionar a sacola</Button>
      </div>
    </div>
  );
};

export default ProductInfo;
