import { App } from "@slack/bolt";
import config from "../utils/config";
import { SpreadsheetClient } from "../utils/spreadsheetClient";

import { errorBlock } from "../blocks/errorBlock";

import { homeBlocks } from "../blocks/homeBlock";

export const useAppHomeOpenedEvent = async (app: App) => {
  const spreadsheetClient = await SpreadsheetClient.build();
  const data = await spreadsheetClient.getValues(config.GOOGLE_SHEET_ID);
  app.event("app_home_opened", async ({ event, client, logger }) => {
    try {
      const user = event.user;

      await client.views.publish({
        user_id: user,
        view: {
          type: "home",
          blocks: homeBlocks({
            user,
            data,
          }),
        },
      });
    } catch (e) {
      logger.error(e);
      await client.chat.postMessage({
        text: "error",
        channel: event.channel,
        blocks: errorBlock(),
      });
    }
  });
};
