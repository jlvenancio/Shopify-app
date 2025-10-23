import { useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  InlineGrid,
  Banner,
  List,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  // Get or create shop settings
  let shopSettings = await prisma.shopSettings.findUnique({
    where: { shop: session.shop },
  });

  if (!shopSettings) {
    shopSettings = await prisma.shopSettings.create({
      data: {
        shop: session.shop,
        isActive: true,
        plan: "free",
      },
    });
  }

  // Get analytics for today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayAnalytics = await prisma.analytics.findFirst({
    where: {
      shop: session.shop,
      date: {
        gte: today,
      },
    },
  });

  return json({
    shop: session.shop,
    settings: shopSettings,
    analytics: todayAnalytics || {
      cartViews: 0,
      addedToCart: 0,
      upsellClicks: 0,
      upsellConversions: 0,
      totalRevenue: 0,
      upsellRevenue: 0,
    },
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  // Handle enabling the cart drawer
  await prisma.shopSettings.update({
    where: { shop: session.shop },
    data: { isActive: true },
  });

  return json({ success: true });
};

export default function Index() {
  const { shop, settings, analytics } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  useEffect(() => {
    if (actionData?.success) {
      shopify.toast.show("Cart drawer enabled!");
    }
  }, [actionData]);

  return (
    <Page title="CartPro Dashboard">
      <BlockStack gap="500">
        {!settings.isActive && (
          <Banner
            title="Welcome to CartPro!"
            tone="info"
            action={{
              content: "Enable Cart Drawer",
              onAction: () => submit({}, { method: "post" }),
            }}
          >
            <p>
              Get started by enabling your cart drawer and customizing it to match your store.
            </p>
          </Banner>
        )}

        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Welcome to CartPro! 🎉
                </Text>
                <Text as="p" variant="bodyMd">
                  Your advanced cart drawer with upsells is ready to boost your store's conversion rate.
                </Text>
                <Text as="p" variant="bodyMd">
                  <strong>Current Plan:</strong> {settings.plan.toUpperCase()}
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Today's Performance
                </Text>
                <InlineGrid columns={3} gap="400">
                  <Card>
                    <BlockStack gap="200">
                      <Text as="p" variant="bodyMd" tone="subdued">
                        Cart Views
                      </Text>
                      <Text as="h3" variant="headingLg">
                        {analytics.cartViews}
                      </Text>
                    </BlockStack>
                  </Card>
                  <Card>
                    <BlockStack gap="200">
                      <Text as="p" variant="bodyMd" tone="subdued">
                        Added to Cart
                      </Text>
                      <Text as="h3" variant="headingLg">
                        {analytics.addedToCart}
                      </Text>
                    </BlockStack>
                  </Card>
                  <Card>
                    <BlockStack gap="200">
                      <Text as="p" variant="bodyMd" tone="subdued">
                        Upsell Conversions
                      </Text>
                      <Text as="h3" variant="headingLg">
                        {analytics.upsellConversions}
                      </Text>
                    </BlockStack>
                  </Card>
                </InlineGrid>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Quick Start Guide
                </Text>
                <List type="number">
                  <List.Item>
                    Configure your cart drawer design in the Settings page
                  </List.Item>
                  <List.Item>
                    Set up your free shipping threshold
                  </List.Item>
                  <List.Item>
                    Create upsell rules to recommend products
                  </List.Item>
                  <List.Item>
                    Enable the cart drawer on your storefront
                  </List.Item>
                  <List.Item>
                    Monitor performance in the Analytics page
                  </List.Item>
                </List>
                <Button url="/app/settings" variant="primary">
                  Go to Settings
                </Button>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
