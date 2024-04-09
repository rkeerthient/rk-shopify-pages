/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import {
  GetHeadConfig,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import "../index.css";
import SearchResults from "../components/SearchResults";

export const config: TemplateConfig = {
  name: "search",
};

export const getPath = () => {
  return `search.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: " Search",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
        },
      },
    ],
  };
};

const Search: Template<TemplateRenderProps> = ({ document }) => {
  return (
    <>
      <PageLayout>
        <div className="max-w-screen-2xl mx-auto px-20">
          <SearchResults verticalKey={"products"}></SearchResults>
        </div>
      </PageLayout>
    </>
  );
};

export default Search;
