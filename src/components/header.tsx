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
    label: "About",
    url: "/turtlehead-tacos",
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
    <div className="bg-[#645cff]">
      <div className="centered-container">
        <nav className="py-6 flex items-center justify-between">
          <img
            src="https://cdn.fs.brandfolder.com/cache=expiry:604800/deY3VGFpSjC761Abjbfc"
            alt="Turtlehead Tacos Logo"
            width="50"
            height="50"
          ></img>
          <div className="text-2xl font-semibold">Turtlehead Tacos</div>
          <div className="flex gap-x-10 text-lg font-semibold">{linkDoms}</div>
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
        </nav>
      </div>
    </div>
  );
};

export default Header;
