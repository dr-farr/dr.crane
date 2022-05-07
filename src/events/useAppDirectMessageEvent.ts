import { App } from "@slack/bolt";

import { errorBlock } from "../blocks/errorBlock";

export const useAppDirectMessageEvent = (app: App) => {
  app.event("message", async ({ event, logger, client, message }) => {
    try {
      await client.chat.postMessage({
        channel: event.channel,
        blocks: [
          {
            type: "image",

            image_url:
              event.channel_type === "im"
                ? "https://c.tenor.com/8GPhyQF_hqsAAAAM/fraiser-doctor-crane.gif"
                : "https://media.giphy.com/media/WQs2gXVW3wn7ohtWVD/giphy-downsized-large.gif",
            alt_text: "I'm Listening",
          },
        ],
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
