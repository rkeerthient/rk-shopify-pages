import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CartItem = ({ product }: any) => {
  const { name, image, quantity, colorName, amount, id } = product;
  const [itemQuantity, setItemQuantity] = useState<number>(quantity);
  return (
    <li key={id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={image}
          alt={image}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <div>{name}</div>
            </h3>
            <p className="ml-4">{amount}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{colorName}</p>
          <div className="flex gap-2 text-sm items-center">
            <div>
              <MinusIcon
                className={`h-4 w-4  ${quantity <= 1 ? `cursor-not-allowed opacity-25` : `hover:cursor-pointer`}`}
                onClick={() => quantity >= 2 && setItemQuantity(quantity - 1)}
              />
            </div>
            <div>{itemQuantity}</div>
            <div>
              <PlusIcon
                className="h-4 w-4 hover:cursor-pointer"
                onClick={() => setItemQuantity(quantity + 1)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {quantity}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
