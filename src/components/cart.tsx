import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartState, removeFromCart } from "../redux/cartSlice";
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

interface LineItemProps {
  variantId: string;
  quantity: number;
}

export default function Cart() {
  const {   cartItems } = useSelector(
    (state: { cart: CartState }) => state.cart
  );

  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: { modal: ModalProps }) => state.modal);

  const handleCheckout = async () => {
    const lineItems: LineItemProps[] = cartItems.map((item: any) => ({
      variantId: `gid://shopify/ProductVariant/${item.id}`,
      quantity: item.quantity || 1,
    }));

    const checkout = `/api/checkout?lineItems=${JSON.stringify(lineItems)}`;

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

  const handleRemove = (id: string) => {
    dispatch(removeFromCart({ id }));
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
                            {cartItems.map((product, index) => {
                              const {
                                name,
                                image,
                                quantity,
                                colorName,
                                amount,
                                id,
                              } = product;
                              return (
                                <li key={index} className="flex py-6">
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
                                        <h3>{name}</h3>
                                        <p className="ml-4">{amount}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {colorName}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {quantity}
                                      </p>
                                      <div className="flex">
                                        <div
                                          onClick={() => handleRemove(id)}
                                          className="hover:cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          $
                          {cartItems.length >= 1
                            ? cartItems.reduce(
                                (acc, item) =>
                                  acc + item.quantity * parseFloat(item.amount),
                                0
                              )
                            : 0}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <div
                          onClick={handleCheckout}
                          className="hover:cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </div>
                      </div>
                      <div className="mt-3 gap-4 flex flex-col justify-center text-center text-sm text-gray-500">
                        <div>or</div>
                        <div
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={closeCart}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </div>
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
  );
}
