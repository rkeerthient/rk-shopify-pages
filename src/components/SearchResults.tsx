import { useSearchActions } from "@yext/search-headless-react";
import {
  AppliedFilters,
  Facets,
  Geolocation,
  Pagination,
  ResultsCount,
  SearchBar,
  VerticalResults,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import ProductCard from "./ProductCard";

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
                  verticalResultsContainer:
                    "mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:space-x-0 border  border-gray-200 mb-4",
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
