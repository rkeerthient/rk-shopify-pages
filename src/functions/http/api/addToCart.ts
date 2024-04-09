import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

const addToCart = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const { cartId, variantId } = request.queryParams;
  const api_key = YEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN as string;
  const shop_name = YEXT_PUBLIC_SHOPNAME as string;
  const nVariantId = `gid://shopify/ProductVariant/${variantId}`;
  const getResponse = await fetch(
    `https://${shop_name}.myshopify.com/api/2021-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": `${api_key}`,
      },
      body: JSON.stringify({
        query: `
        mutation AddToCart($cartId: ID!, $nVariantId: ID!) {
          cartLinesAdd(cartId: $cartId, lines: [{ quantity: 1, merchandiseId: $nVariantId}]) {
            userErrors {
              field
              message
            }
            cart {
              checkoutUrl
              lines(first: 100) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        product {
                          title
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
        variables: { cartId, nVariantId },
      }),
    }
  );

  const resp = await getResponse.json();

  return {
    body: JSON.stringify(resp.data),
    headers: {},
    statusCode: 200,
  };
};

export default addToCart;
