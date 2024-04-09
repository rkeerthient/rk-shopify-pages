import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, CartState, clearCart } from "../redux/cartSlice";
import { ShopifyState } from "../redux/shopifyCartSlice";
import { CloseIcon } from "./icons";
export interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const { total, cartItems } = useSelector(
    (state: { cart: CartState }) => state.cart
  );
  const { checkoutUrl } = useSelector(
    (state: { shopify: ShopifyState }) => state.shopify
  );
  const handleCheckout = () => {
    window.location.href = checkoutUrl;
  };
  const dispatch = useDispatch();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        initialFocus={cancelButtonRef}
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              key="overlay"
              className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75"
            />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="flex px-4 py-6  flex-col h-full overflow-y-scroll bg-white shadow-xl">
                  <div className="flex flex-col gap-4 overflow-y-auto sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="flex items-center ml-3 h-7">
                        <button
                          ref={cancelButtonRef}
                          type="button"
                          className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Close panel</span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                    {cartItems.length >= 1 ? (
                      <>
                        <div className="flex flex-col gap-4 mt-4 ">
                          {cartItems.map((item: CartItem, index) => (
                            <div
                              className="flex gap-2 items-center"
                              key={index}
                            >
                              <div className="w-24 h-24">
                                <img src={item.image} alt="" />
                              </div>
                              <div>{item.name}</div>
                            </div>
                          ))}
                        </div>
                        <div
                          className="border w-fit px-4 py-2 hover:cursor-pointer"
                          onClick={handleCheckout}
                        >
                          Checkout
                        </div>
                      </>
                    ) : (
                      <div>Cart is empty</div>
                    )}
                    <div
                      className="border w-fit px-4 py-2 hover:cursor-pointer"
                      onClick={() => dispatch(clearCart())}
                    >
                      Empty cart
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
