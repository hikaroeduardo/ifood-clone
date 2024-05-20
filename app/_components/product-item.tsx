import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link className="w-[150px] min-w-[150px]" href={`/products/${product.id}`}>
      <div className="space-y-2 w-full">
        <div className="h-[150px] w-full relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg shadow-md"
          />

          {product.discountPercentage && (
            <DiscountBadge product={product} className="absolute" />
          )}
        </div>

        <div>
          <h2 className="text-sm truncate">{product.name}</h2>
          <div className="flex gap-1 items-center">
            <h3 className="font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h3>

            {product.discountPercentage > 0 && (
              <span className="line-through text-muted-foreground text-xs">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>

          <span className="text-muted-foreground text-xs block">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
