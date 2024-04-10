import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

const checkout = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const api_key = YEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN as string;
  const shop_name = YEXT_PUBLIC_SHOPNAME as string;
  const { lineItems } = request.queryParams;

  let input = {
    lineItems: JSON.parse(lineItems),
  };

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
        mutation CreateCheckout($input:CheckoutCreateInput!){
          checkoutCreate(input:$input){
              checkout{
                  webUrl
              }
              checkoutUserErrors {
                            code
                            field
                            message
                      }
          }
      }
      `,
        variables: { input },
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

export default checkout;
