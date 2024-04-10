import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, CartState, clearCart } from "../redux/cartSlice";
import { ShopifyState } from "../redux/shopifyCartSlice";
import { CloseIcon } from "./icons";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ModalProps, toggleModal } from "../redux/modalSlice";
export interface CartProps {
  isOpen: boolean;
}

export interface CartRes {
  checkoutCreate: CheckoutCreate;
}

export interface CheckoutCreate {
  checkout: Checkout;
  checkoutUserErrors: any[];
}

export interface Checkout {
  webUrl: string;
}

export default function Cart() {
  const { total, cartItems } = useSelector(
    (state: { cart: CartState }) => state.cart
  );
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state: { modal: ModalProps }) => state.modal);

  useEffect(() => {
    console.log(isOpen + "----");
  }, [isOpen]);

  const { checkoutUrl } = useSelector(
    (state: { shopify: ShopifyState }) => state.shopify
  );
  const handleCheckout = async () => {
    console.log("unn");

    const checkout = `/api/checkout`;
    try {
      let request = await fetch(`${checkout}`);
      const res: CartRes = await request.json();
      window.location.href = res.checkoutCreate.checkout.webUrl;
    } catch (error) {
      console.log(error);
    }
  };
  const closeCart = () => {
    dispatch(toggleModal({ isOpen: false }));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={closeCart}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.image}
                                    alt={product.image}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <div>{product.name}</div>
                                      </h3>
                                      {/* <p className="ml-4">{product.price}</p> */}
                                    </div>
                                    {/* <p className="mt-1 text-sm text-gray-500">
                                      {product.color}
                                    </p> */}
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {product.quantity}
                                    </p>

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
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$262.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <div
                          onClick={handleCheckout}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <div
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={closeCart}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    // <Transition.Root show={isOpen} as={Fragment}>
    //   <Dialog
    //     initialFocus={cancelButtonRef}
    //     as="div"
    //     className="fixed inset-0 z-50 overflow-hidden"
    //     setOpen(false)={setOpen(false)}
    //   >
    //     <div className="absolute inset-0 overflow-hidden">
    //       <Transition.Child
    //         as={Fragment}
    //         enter="ease-in-out duration-500"
    //         enterFrom="opacity-0"
    //         enterTo="opacity-100"
    //         leave="ease-in-out duration-500"
    //         leaveFrom="opacity-100"
    //         leaveTo="opacity-0"
    //       >
    //         <Dialog.Overlay
    //           key="overlay"
    //           className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75"
    //         />
    //       </Transition.Child>

    //       <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="transform transition ease-in-out duration-500 sm:duration-700"
    //           enterFrom="translate-x-full"
    //           enterTo="translate-x-0"
    //           leave="transform transition ease-in-out duration-500 sm:duration-700"
    //           leaveFrom="translate-x-0"
    //           leaveTo="translate-x-full"
    //         >
    //           <div className="w-screen max-w-md">
    //             <div className="flex px-4 py-6  flex-col h-full overflow-y-scroll bg-white shadow-xl">
    //               <div className="flex flex-col gap-4 overflow-y-auto sm:px-6">
    //                 <div className="flex items-start justify-between">
    //                   <Dialog.Title className="text-lg font-medium text-gray-900">
    //                     Shopping cart
    //                   </Dialog.Title>
    //                   <div className="flex items-center ml-3 h-7">
    //                     <button
    //                       ref={cancelButtonRef}
    //                       type="button"
    //                       className="p-2 -m-2 text-gray-400 hover:text-gray-500"
    //                     >
    //                       <span className="sr-only">Close panel</span>
    //                       <CloseIcon />
    //                     </button>
    //                   </div>
    //                 </div>
    //                 {cartItems.length >= 1 ? (
    //                   <>
    //                     <div className="flex flex-col gap-4 mt-4 ">
    //                       {cartItems.map((item: CartItem, index) => (
    //                         <div
    //                           className="flex gap-2 items-center"
    //                           key={index}
    //                         >
    //                           <div className="w-24 h-24">
    //                             <img src={item.image} alt="" />
    //                           </div>
    //                           <div>{item.name}</div>
    //                         </div>
    //                       ))}
    //                     </div>
    //                     <div
    //                       className="border w-fit px-4 py-2 hover:cursor-pointer"
    //                       onClick={handleCheckout}
    //                     >
    //                       Checkout
    //                     </div>
    //                   </>
    //                 ) : (
    //                   <div>Cart is empty</div>
    //                 )}
    //                 <div
    //                   className="border w-fit px-4 py-2 hover:cursor-pointer"
    //                   onClick={() => dispatch(clearCart())}
    //                 >
    //                   Empty cart
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </Transition.Child>
    //       </div>
    //     </div>
    //   </Dialog>
    // </Transition.Root>
  );
}
