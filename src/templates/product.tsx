/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import Banner from "../components/banner";
import Contact from "../components/contact";
import Cta from "../components/cta";
import Hours from "../components/hours";
import List from "../components/list";
import PageLayout from "../components/page-layout";
import StaticMap from "../components/static-map";
import "../index.css";
import { RadioGroup } from "@headlessui/react";
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { LexicalRichText, Image } from "@yext/pages-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { ShopifyState } from "../redux/shopifyCartSlice";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-products",
    fields: [
      "id",
      "uid",
      "meta",
      "c_greysonProductVariants.c_greysonIsOnSale",
      "c_greysonProductPage",
      "c_greysonPattern",
      "c_greysonProductCategory",
      "c_greysonProductVariants.c_greysonProductAvailability",
      "c_greysonProductVariants.c_greysonProductAvailable",
      "c_greysonSleeveLength",
      "slug",
      "c_greysonProductVariants.id",
      "c_greysonProductRole",
      "c_greysonProductVariants.c_greysonOldPrice",
      "c_greysonColorList",
      "c_greysonStatus",
      "c_greysonProductVariants.c_greysonProductAvailabilityComposite",
      "c_greysonDepartment",
      "c_greysonProductVariants.c_greysonColorFamily",
      "c_greysonProductVariants.color",
      "c_greysonProductVariants.c_greysonProductPhoto",
      "c_greysonProductVariants.c_greysonStatus",
      "c_greysonProductVariants.name",
      "c_greysonProductVariants.price",
      "c_greysonPhotoGallery",
      "c_greysonProductVariants.c_greysonSizeDetails",
      "name",
      "richTextDescriptionV2",
      "c_greysonProductPhoto",
    ],
    filter: {
      entityTypes: ["product"],
      savedFilterIds: ["1369764093"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.id}-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

const Product: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  return (
    <>
      <PageLayout>
        <Inner document={document} />
      </PageLayout>
    </>
  );
};

export default Product;

const Inner = ({ document }: any) => {
  const {
    _site,
    c_greysonProductVariants,
    c_greysonProductPage,
    c_greysonPattern,
    c_greysonProductCategory,
    c_greysonSleeveLength,
    c_greysonProductRole,
    c_greysonColorList,
    c_greysonStatus,
    c_greysonDepartment,
    name,
    richTextDescriptionV2,
    c_greysonProductPhoto,
  } = document;
  const dispatch = useDispatch();
  const { cartId } = useSelector(
    (state: { shopify: ShopifyState }) => state.shopify
  );
  const [currentProduct, setCurrentProduct] = useState(
    c_greysonProductVariants[0]
  );

  const addToCartHandle = async () => {
    const imgUrl = currentProduct.c_greysonProductPhoto.url;

    dispatch(addToCart({ name, image: imgUrl }));
    const addToCartUrl = `/api/addToCart?cartId=${cartId}&variantId=${currentProduct.id}`;
    try {
      let request = await fetch(`${addToCartUrl}`);
      const res = await request.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="centered-container text-[#2f2f2f]"
      style={{ fontFamily: "sans-serif" }}
    >
      <div className="bg-white">
        <div className="pb-16 pt-6 sm:pb-24">
          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex flex-col justify-between">
                  <div className="text-lg font-medium flex  items-center gap-4">
                    {currentProduct.c_greysonOldPrice.value >= 1 && (
                      <div className="line-through">
                        ${currentProduct.c_greysonOldPrice.value}
                      </div>
                    )}
                    <div>${currentProduct.price.value}</div>
                  </div>
                  <h1
                    style={{ fontFamily: "Baskerville" }}
                    className="my-4  text-2xl font-normal  pb-5 border-b border-gray-400 border-opacity-50"
                  >
                    {name}
                  </h1>
                </div>
              </div>

              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  <Image
                    image={currentProduct.c_greysonProductPhoto}
                    className={classNames(
                      currentProduct.c_greysonProductPhoto
                        ? "lg:col-span-2 lg:row-span-2"
                        : "hidden lg:block",
                      "rounded-lg"
                    )}
                  ></Image>
                </div>
              </div>

              <div className=" lg:col-span-5">
                <form>
                  <div>
                    <h2 className="text-sm font-medium ">
                      Color - {currentProduct.color}{" "}
                      <span className="text-gray-300">
                        {currentProduct.c_greysonColorFamily}
                      </span>
                    </h2>

                    <RadioGroup
                      value={currentProduct.c_greysonColorFamily}
                      className="mt-2"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {c_greysonProductVariants.map(
                          (item: any, index: any) => (
                            <RadioGroup.Option
                              key={index}
                              value={item}
                              onClick={() => setCurrentProduct(item)}
                              checked={item === currentProduct}
                              className={({ active }) => {
                                return classNames(
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none",
                                  item === currentProduct
                                    ? "ring ring-offset-1"
                                    : active
                                      ? "ring-2"
                                      : ""
                                );
                              }}
                            >
                              <span
                                style={{
                                  background:
                                    item.c_greysonColorFamily.toLowerCase(),
                                }}
                                aria-hidden="true"
                                className="h-8 w-8 rounded-full border border-black border-opacity-10"
                              />
                            </RadioGroup.Option>
                          )
                        )}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium ">Size</h2>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        See sizing chart
                      </a>
                    </div>
                    <RadioGroup className="mt-2">
                      <RadioGroup.Label className="sr-only">
                        Choose a Size
                      </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {currentProduct.c_greysonSizeDetails.map(
                          (item: any, index: any) => (
                            <RadioGroup.Option
                              key={index}
                              value={item.size}
                              className={({ active, checked }) =>
                                classNames(
                                  item.inventory >= 1
                                    ? "cursor-pointer focus:outline-none"
                                    : "cursor-not-allowed opacity-25",
                                  active ? "border-b border-black" : "",
                                  checked
                                    ? " border-b  border-black"
                                    : "  bg-white   ",
                                  "flex items-center justify-center py-3 px-3 text-sm font-medium uppercase flex-1 md:flex-none pb-2"
                                )
                              }
                              disabled={item.inventory <= 0}
                            >
                              <RadioGroup.Label as="span" className="w-fit">
                                {item.size}
                              </RadioGroup.Label>
                            </RadioGroup.Option>
                          )
                        )}
                      </div>
                    </RadioGroup>
                  </div>

                  <div
                    onClick={addToCartHandle}
                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </div>
                </form>

                <div className="mt-10" style={{ fontFamily: "sans-serif" }}>
                  <h2 className="text-xl font-normal mb-6">Description</h2>

                  {richTextDescriptionV2 ? (
                    <LexicalRichText
                      serializedAST={JSON.stringify(richTextDescriptionV2.json)}
                    ></LexicalRichText>
                  ) : (
                    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam soluta, accusantium nobis maxime repudiandae nostrum animi harum quisquam saepe quidem ducimus consectetur dolore perspiciatis alias eos, aspernatur aliquam deleniti tenetur."
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
