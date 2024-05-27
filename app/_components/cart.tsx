import { useContext } from "react";
import { CartContext } from "../_providers/_contexts/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotalPrice, totalDiscounts, totalPrice } =
    useContext(CartContext);

  return (
    <div className="py-5 flex flex-col justify-between h-full">
      <div className="space-y-5">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      <div>
        <div className="mt-6">
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="justify-between items-center flex">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subTotalPrice)}</span>
              </div>

              <Separator />

              <div className="justify-between items-center flex">
                <span className="text-muted-foreground">Descontos</span>
                <span>- {formatCurrency(totalDiscounts)}</span>
              </div>

              <Separator />

              <div className="justify-between items-center flex">
                <span className="font-bold">Total</span>
                <span className="font-bold">{formatCurrency(totalPrice)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button className="w-full mt-6">Finalizar Pedido</Button>
      </div>
    </div>
  );
};

export default Cart;
