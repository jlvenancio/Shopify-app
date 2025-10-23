import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  BlockStack,
  TextField,
  Select,
  RangeSlider,
  Checkbox,
  Button,
  Text,
  Divider,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const settings = await prisma.shopSettings.findUnique({
    where: { shop: session.shop },
  });

  return json({ settings });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();

  const data = {
    drawerPosition: formData.get("drawerPosition") as string,
    drawerWidth: parseInt(formData.get("drawerWidth") as string),
    primaryColor: formData.get("primaryColor") as string,
    secondaryColor: formData.get("secondaryColor") as string,
    buttonColor: formData.get("buttonColor") as string,
    textColor: formData.get("textColor") as string,
    freeShippingEnabled: formData.get("freeShippingEnabled") === "true",
    freeShippingThreshold: parseFloat(formData.get("freeShippingThreshold") as string),
    freeShippingMessage: formData.get("freeShippingMessage") as string,
    upsellEnabled: formData.get("upsellEnabled") === "true",
    upsellTitle: formData.get("upsellTitle") as string,
    maxUpsellProducts: parseInt(formData.get("maxUpsellProducts") as string),
    timerEnabled: formData.get("timerEnabled") === "true",
    timerDuration: parseInt(formData.get("timerDuration") as string),
    timerMessage: formData.get("timerMessage") as string,
  };

  await prisma.shopSettings.update({
    where: { shop: session.shop },
    data,
  });

  return json({ success: true });
};

export default function Settings() {
  const { settings } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const [drawerPosition, setDrawerPosition] = useState(settings?.drawerPosition || "right");
  const [drawerWidth, setDrawerWidth] = useState(settings?.drawerWidth || 400);
  const [primaryColor, setPrimaryColor] = useState(settings?.primaryColor || "#000000");
  const [secondaryColor, setSecondaryColor] = useState(settings?.secondaryColor || "#ffffff");
  const [buttonColor, setButtonColor] = useState(settings?.buttonColor || "#000000");
  const [textColor, setTextColor] = useState(settings?.textColor || "#000000");

  const [freeShippingEnabled, setFreeShippingEnabled] = useState(
    settings?.freeShippingEnabled || false
  );
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(
    String(settings?.freeShippingThreshold || 50)
  );
  const [freeShippingMessage, setFreeShippingMessage] = useState(
    settings?.freeShippingMessage || "Free shipping on orders over {amount}"
  );

  const [upsellEnabled, setUpsellEnabled] = useState(settings?.upsellEnabled || true);
  const [upsellTitle, setUpsellTitle] = useState(
    settings?.upsellTitle || "You may also like"
  );
  const [maxUpsellProducts, setMaxUpsellProducts] = useState(
    settings?.maxUpsellProducts || 3
  );

  const [timerEnabled, setTimerEnabled] = useState(settings?.timerEnabled || false);
  const [timerDuration, setTimerDuration] = useState(
    String(settings?.timerDuration || 600)
  );
  const [timerMessage, setTimerMessage] = useState(
    settings?.timerMessage || "Hurry! Offer ends in"
  );

  const handleSave = useCallback(() => {
    const formData = new FormData();
    formData.append("drawerPosition", drawerPosition);
    formData.append("drawerWidth", String(drawerWidth));
    formData.append("primaryColor", primaryColor);
    formData.append("secondaryColor", secondaryColor);
    formData.append("buttonColor", buttonColor);
    formData.append("textColor", textColor);
    formData.append("freeShippingEnabled", String(freeShippingEnabled));
    formData.append("freeShippingThreshold", freeShippingThreshold);
    formData.append("freeShippingMessage", freeShippingMessage);
    formData.append("upsellEnabled", String(upsellEnabled));
    formData.append("upsellTitle", upsellTitle);
    formData.append("maxUpsellProducts", String(maxUpsellProducts));
    formData.append("timerEnabled", String(timerEnabled));
    formData.append("timerDuration", timerDuration);
    formData.append("timerMessage", timerMessage);

    submit(formData, { method: "post" });
  }, [
    drawerPosition,
    drawerWidth,
    primaryColor,
    secondaryColor,
    buttonColor,
    textColor,
    freeShippingEnabled,
    freeShippingThreshold,
    freeShippingMessage,
    upsellEnabled,
    upsellTitle,
    maxUpsellProducts,
    timerEnabled,
    timerDuration,
    timerMessage,
    submit,
  ]);

  return (
    <Page
      title="Cart Drawer Settings"
      primaryAction={{
        content: "Save",
        onAction: handleSave,
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Cart Drawer Design
              </Text>
              <Select
                label="Drawer Position"
                options={[
                  { label: "Left", value: "left" },
                  { label: "Right", value: "right" },
                ]}
                value={drawerPosition}
                onChange={setDrawerPosition}
              />
              <RangeSlider
                label="Drawer Width"
                value={drawerWidth}
                onChange={setDrawerWidth}
                min={300}
                max={600}
                output
                suffix={<p>{drawerWidth}px</p>}
              />
              <TextField
                label="Primary Color"
                type="color"
                value={primaryColor}
                onChange={setPrimaryColor}
                autoComplete="off"
              />
              <TextField
                label="Secondary Color"
                type="color"
                value={secondaryColor}
                onChange={setSecondaryColor}
                autoComplete="off"
              />
              <TextField
                label="Button Color"
                type="color"
                value={buttonColor}
                onChange={setButtonColor}
                autoComplete="off"
              />
              <TextField
                label="Text Color"
                type="color"
                value={textColor}
                onChange={setTextColor}
                autoComplete="off"
              />
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Free Shipping Bar
              </Text>
              <Checkbox
                label="Enable Free Shipping Bar"
                checked={freeShippingEnabled}
                onChange={setFreeShippingEnabled}
              />
              {freeShippingEnabled && (
                <>
                  <TextField
                    label="Free Shipping Threshold"
                    type="number"
                    value={freeShippingThreshold}
                    onChange={setFreeShippingThreshold}
                    prefix="$"
                    autoComplete="off"
                  />
                  <TextField
                    label="Free Shipping Message"
                    value={freeShippingMessage}
                    onChange={setFreeShippingMessage}
                    helpText="Use {amount} to show the threshold"
                    autoComplete="off"
                  />
                </>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Product Upsells
              </Text>
              <Checkbox
                label="Enable Product Upsells"
                checked={upsellEnabled}
                onChange={setUpsellEnabled}
              />
              {upsellEnabled && (
                <>
                  <TextField
                    label="Upsell Section Title"
                    value={upsellTitle}
                    onChange={setUpsellTitle}
                    autoComplete="off"
                  />
                  <RangeSlider
                    label="Maximum Upsell Products"
                    value={maxUpsellProducts}
                    onChange={setMaxUpsellProducts}
                    min={1}
                    max={6}
                    output
                  />
                </>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Countdown Timer
              </Text>
              <Checkbox
                label="Enable Countdown Timer"
                checked={timerEnabled}
                onChange={setTimerEnabled}
              />
              {timerEnabled && (
                <>
                  <TextField
                    label="Timer Duration (seconds)"
                    type="number"
                    value={timerDuration}
                    onChange={setTimerDuration}
                    autoComplete="off"
                  />
                  <TextField
                    label="Timer Message"
                    value={timerMessage}
                    onChange={setTimerMessage}
                    autoComplete="off"
                  />
                </>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
