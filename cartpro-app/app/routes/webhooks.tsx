import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { topic, shop, session, admin } = await authenticate.webhook(request);

  if (!admin) {
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        // Clean up: deactivate shop settings
        await prisma.shopSettings.update({
          where: { shop },
          data: { isActive: false },
        });
      }
      break;
    case "SHOP_UPDATE":
      // Handle shop updates if needed
      console.log("Shop updated:", shop);
      break;
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
