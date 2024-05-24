"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurant } from "./_actions/search";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const Restaurants = () => {
  const searchParams = useSearchParams();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurantes = async () => {
      if (!searchFor) return;

      const foundRestaurants = await searchForRestaurant(searchFor);

      setRestaurants(foundRestaurants);
    };

    fetchRestaurantes();
  }, [searchFor]);

  console.log(restaurants);

  if (!searchFor) return notFound();

  return (
    <>
      <Header />

      <div className="p-5">
        <h2 className="text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className="flex flex-col gap-6 w-full">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
