import Site from "../types/Site";
import Header from "./header";
import Footer from "./footer";
import { Provider } from "react-redux";
import store from "../redux/store";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./searchConfig";

type Props = {
  _site?: Site;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, children }: Props) => {
  return (
    <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
      <Provider store={store}>
        <div className="min-h-screen">
          <Header _site={_site} />
          {children}
          <Footer _site={_site}></Footer>
        </div>
      </Provider>
    </SearchHeadlessProvider>
  );
};

export default PageLayout;
