import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  AppliedFilters,
  Facets,
  Geolocation,
  Pagination,
  ResultsCount,
  SearchBar,
  StandardCard,
  VerticalResults,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { CartState } from "../redux/cartSlice";

type verticalKey = {
  verticalKey: string;
};

const ProfessionalPage = ({ verticalKey }: verticalKey) => {
  const dispatch = useDispatch();
  const searchActions = useSearchActions();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical(verticalKey);
    searchActions.executeVerticalQuery().then(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col mt-4">
          <SearchBar placeholder="Search here"></SearchBar>
          <div className="flex">
            <div className="w-64 shrink-0 mr-5 mt-4">
              <Facets />
            </div>
            <div className="flex-grow">
              <div className="flex flex-col items-baseline">
                <ResultsCount />
                <AppliedFilters />
              </div>
              <VerticalResults
                CardComponent={ProductCard}
                customCssClasses={{
                  verticalResultsContainer: "flex grid grid-cols-4 gap-4",
                }}
              />
              <Pagination />
              <Geolocation />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfessionalPage;
