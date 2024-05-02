import { Image } from "@yext/pages-components";
import { useSearchState } from "@yext/search-headless-react";
import { CardProps } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
const ProductCard = ({ result }: CardProps<any>) => {
  const {
    name,
    primaryPhoto,
    c_greysonProductPhoto,
    c_greysonProductVariants,
    slug,
  } = result.rawData;
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

  return (
    <>
      <div className=" border-b border-r border-gray-200 p-4 inline-flex w-64 flex-col text-center lg:w-auto">
        <div className="group relative">
          <div className=" w-full overflow-hidden rounded-md bg-gray-200">
            {c_greysonProductVariants.map((item: any, index: any) =>
              item.c_greysonProductPhoto ? (
                <Image
                  key={index}
                  layout="fixed"
                  width={300}
                  height={380}
                  image={item.c_greysonProductPhoto}
                  className={` group-hover:opacity-75 ${active.id === item.id ? `block` : `hidden`}`}
                />
              ) : (
                <Image
                  key={index}
                  layout="fixed"
                  width={300}
                  height={380}
                  image={c_greysonProductPhoto}
                  className={` group-hover:opacity-75 ${active.id === item.id ? `block` : `hidden`}`}
                />
              )
            )}
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              {active.c_greysonColorFamily}
            </p>
            <h3 className="mt-1 font-semibold text-gray-900">
              <a href={`/${slug}`}>
                <span className="absolute inset-0" />
                {name}
              </a>
            </h3>
          </div>
        </div>
        <h4 className="sr-only">Available colors</h4>
        <ul
          role="list"
          className="mt-auto flex items-center justify-center space-x-3 pt-2"
        >
          {c_greysonProductVariants.map((item: any, index: any) => (
            <li
              key={index}
              onClick={() => setActive(item)}
              className={`h-4 w-4 rounded-full border border-black border-opacity-10 ${active.id === item.id ? `ring-[2px] ring-offset-2  ring-black` : `ring-offset-1`}`}
              style={{
                backgroundColor: item.c_greysonColorFamily?.toLowerCase(),
              }}
            >
              <span className="sr-only">{item.color}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductCard;
