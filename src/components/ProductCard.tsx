import { CardProps } from "@yext/search-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { CartState, addToCart } from "../redux/cartSlice";
import { ShopifyState } from "../redux/shopifyCartSlice";
import { useEffect, useState } from "react";
import { useSearchState } from "@yext/search-headless-react";

const ProductCard = ({ result }: CardProps<any>) => {
  const { name, primaryPhoto, c_greysonProductVariants, slug } = result.rawData;
  const [active, setActive] = useState(c_greysonProductVariants[0]);
  let selected = useSearchState((state) => {
    const facet = state.filters.facets?.find(
      (f) => f.fieldId === "c_greysonProductVariants.c_greysonColorFamily"
    );
    return facet?.options.find((item) => item.selected === true)?.value;
  });

  useEffect(() => {
    if (selected) {
      let activeVariant = c_greysonProductVariants.filter(
        (item: any) => item.c_greysonColorFamily === selected
      )[0];
      setActive(activeVariant);
    }
  }, [selected]);

  //   useEffect(() => {
  //     console.log(selectedFacet);

  //     // if (selectedFacet) {
  //     //   let activeVariant = c_greysonProductVariants.filter(
  //     //     (item: any) => item.c_greysonColorFamily === selectedFacet
  //     //   )[0];
  //     //   activeVariant && setActive(activeVariant);
  //     // }
  //   }, [selectedFacet]);

  return (
    <>
      <a href={`/${slug}`}>
        <div className="flex flex-col gap-2 border p-2">
          <div className="flex flex-col">
            {c_greysonProductVariants.map((item: any, index: any) => (
              <div
                className={`${active.id === item.id ? `block` : `hidden`}`}
                key={index}
              >
                <img
                  src={item.c_greysonProductPhoto?.url}
                  alt=""
                  className={`aspect-square `}
                />
                <div>{`$${item.price?.value}`}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-2 mt-4">
            {c_greysonProductVariants.map((item: any, index: any) => (
              <div
                key={index}
                onClick={() => setActive(item)}
                style={{
                  background: item.c_greysonColorFamily?.toLowerCase(),
                }}
                className={` h-3 w-3 rounded-full border border-black ${active.id === item.id ? `ring-[2px] ring-offset-2  ring-black` : `ring-offset-1`}`}
              ></div>
            ))}
          </div>
          <div>{name}</div>
          <div
            className="w-fit border p-2 hover:cursor-pointer"
            // onClick={addToCartHandle}
          >
            Add to cart
          </div>
        </div>
      </a>
    </>
  );
};

export default ProductCard;
