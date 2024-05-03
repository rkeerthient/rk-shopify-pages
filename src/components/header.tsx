import { useDispatch, useSelector } from "react-redux";
import { CartState } from "../redux/cartSlice";
import { toggleModal } from "../redux/modalSlice";
import Cart from "./cart";
import { CartIcon } from "./icons";
import { useEffect, useState } from "react";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Products",
    url: "/",
  },
];

const Header = () => {
  const { cartItems } = useSelector((state: { cart: CartState }) => state.cart);
  const [cartItemCount, setCartItemCount] = useState(0);

  const dispatch = useDispatch();

  // Only run this effect on the client
  useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(cartItems));
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));

  return (
    <div className="bg-[#261d09] text-white">
      <div className="centered-container">
        <nav className="py-6 flex items-center justify-start gap-8">
          <img
            src="https://thumbs.bfldr.com/at/k72v58hrggbkvxscj9t8g67?expiry=1715373615&fit=bounds&height=800&sig=Y2FkNTZhZGE4NWE1MzExMjRmMjllYjk0MWIwMzFhNjA3OTM3ZTA2Zg%3D%3D&width=1100"
            alt="Turtlehead Tacos Logo"
            width="50"
            height="50"
          ></img>
          <div className="flex justify-between w-full">
            <div className="flex gap-x-10 text-lg font-semibold">
              {linkDoms}
            </div>
            <div
              className="block relative"
              onClick={() => dispatch(toggleModal({ isOpen: true }))}
            >
              <CartIcon />
              <div className="absolute top-[-0.5rem] right-[-0.5rem] w-6 h-6 rounded-full bg-primary-light flex items-center justify-center">
                <p className="text-black">{cartItemCount}</p>
              </div>
            </div>
            <Cart />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
