import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
  product: Product;
  className?: string;
}

const DiscountBadge = ({ product, className }: DiscountBadgeProps) => {
  return (
    <div
      className={`flex items-center gap-[2px] top-2 left-2 bg-primary py-[2px] px-2 rounded-full text-white ${className}`}
    >
      <ArrowDownIcon size={12} />
      <span className="font-semibold text-xs">
        {product.discountPercentage}%
      </span>
    </div>
  );
};

export default DiscountBadge;
