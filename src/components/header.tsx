import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartState } from "../redux/cartSlice";
import Cart from "./cart";
import { CartIcon } from "./icons";
import { ShopifyState, addCartDetails } from "../redux/shopifyCartSlice";

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

  const dispatch = useDispatch();
  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    const url = `/api/createCart`;
    try {
      let request = await fetch(`${url}`);
      const res = await request.json();
      dispatch(
        addCartDetails({
          cartId: res.cartCreate.cart.id,
          checkoutUrl: res.cartCreate.cart.checkoutUrl,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="bg-[#645cff]">
      <div className="centered-container">
        <nav className="py-6 flex items-center justify-between ">
          <img
            src="https://cdn.fs.brandfolder.com/cache=expiry:604800/deY3VGFpSjC761Abjbfc"
            width="50"
            height="50"
          ></img>
          <div className="text-2xl font-semibold">Turtlehead Tacos</div>
          <div className="flex gap-x-10 text-lg font-semibold">{linkDoms}</div>
          <div
            className="block relative"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <CartIcon />
            <div className="absolute top-[-0.5rem] right-[-0.5rem] w-6 h-6 rounded-full bg-primary-light flex items-center justify-center">
              <p className="text-black">{cartItems.length}</p>
            </div>
          </div>
          <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </nav>
      </div>
    </div>
  );
};

export default Header;
