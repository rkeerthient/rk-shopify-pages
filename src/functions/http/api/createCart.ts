import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

const createCart = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const api_key = YEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN as string;
  const shop_name = YEXT_PUBLIC_SHOPNAME as string;
  const getFieldsResponse = await fetch(
    `https://${shop_name}.myshopify.com/api/2024-04/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": `${api_key}`,
      },
      body: JSON.stringify({
        query: `
          mutation CreateCart {
            cartCreate {
              cart {
                checkoutUrl
                id
              }
            }
          }
        `,
        variables: {},
      }),
    }
  );

  const resp = await getFieldsResponse.json();

  return {
    body: JSON.stringify(resp.data),
    headers: {},
    statusCode: 200,
  };
};

export default createCart;
