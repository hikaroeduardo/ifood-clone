import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
}

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
  return (
    <Link
      className={cn("min-w-[266px] max-w-[266px] space-y-3 py-6", className)}
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="w-full space-y-3">
        <div className="w-full h-[136px] relative">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover rounded-lg"
          />

          <div className="absolute flex items-center gap-[2px] top-2 left-2 bg-primary py-[2px] px-2 rounded-full bg-white">
            <StarIcon size={12} className="text-yellow-500 fill-yellow-400" />
            <span className="font-semibold text-xs">5.0</span>
          </div>

          <Button
            size="icon"
            className="absolute top-2 right-2 bg-gray-700 rounded-full w-7 h-7"
          >
            <HeartIcon size={16} className="fill-white" />
          </Button>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>

          <div className="flex gap-3">
            <div className="flex gap-1 items-center">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0 ? (
                  "Entrega grátis"
                ) : (
                  <>{formatCurrency(Number(restaurant.deliveryFee))}</>
                )}
              </span>
            </div>

            <div className="flex gap-1 items-center">
              <TimerIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
