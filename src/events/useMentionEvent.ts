import { App } from "@slack/bolt";

import { mentionBlocks } from "../blocks/mentionBlock";
import { errorBlock } from "../blocks/errorBlock";

export const useMentionEvent = (app: App) => {
  app.event("app_mention", async ({ event, client, logger }) => {
    try {
      await client.chat.postMessage({
        channel: event.channel,
        blocks: mentionBlocks({ name: event.user }),
      });
    } catch (e) {
      logger.error(e);
      await client.chat.postMessage({
        channel: event.channel,
        blocks: errorBlock(),
      });
    }
  });
};
