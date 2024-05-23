import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="relative bg-white mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl">
        <div className="flex justify-between items-center px-5 pt-5">
          <div className="flex items-center gap-1">
            <div className="relative h-8 w-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>

            <h1 className="text-xl font-semibold">{restaurant.name}</h1>
          </div>

          <div className="flex items-center gap-[5px] bg-foreground py-[2px] px-2 rounded-full text-white">
            <StarIcon size={12} className="text-yellow-500 fill-yellow-400" />
            <span className="font-semibold text-xs">5.0</span>
          </div>
        </div>

        <DeliveryInfo restaurant={restaurant} />

        <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 mt-3 px-5">
          {restaurant.categories.map((category) => (
            <div
              key={category.id}
              className="bg-[#f4f4f4] min-w-[167px] rounded-lg text-center"
            >
              <span className="text-xs text-muted-foreground">
                {category.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <h2 className="font-semibold px-5">Mais Pedidos</h2>
          <div className="pl-5">
            <ProductList products={restaurant.products} />
          </div>
        </div>

        {restaurant.categories.reverse().map((category) => {
          return (
            <div className="mt-6 space-y-4" key={category.id}>
              <h2 className="font-semibold px-5">{category.name}</h2>
              <div className="pl-5">
                <ProductList products={category.products} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantPage;
