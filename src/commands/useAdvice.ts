import { App } from "@slack/bolt";

import { errorBlock } from "../blocks/errorBlock";

const advice = [
  "https://media.giphy.com/media/H8DietxBNO5YvxjLk7/giphy.gif",
  "https://media.giphy.com/media/PgLT45jalDM0gA4sTS/giphy.gif",
  "https://media.giphy.com/media/tCvBc1aMSQsW7YkUHw/giphy.gif",
  "https://media.giphy.com/media/VdtUSRYsrygNP2jNRF/giphy.gif",
  "https://media.giphy.com/media/KvRz33ErPAKAYFd9K6/giphy.gif",
  "https://media.giphy.com/media/JaFskUjHkHq1ABms5G/giphy.gif",
  "https://media.giphy.com/media/jSVNWawkSIO9odplcJ/giphy.gif",
  "https://media.giphy.com/media/gczb87N87I3gSScx96/giphy.gif",
  "https://64.media.tumblr.com/72cea9a172030c8959df2de9fb2ee3b2/c333917898e31949-a1/s540x810/43583cee6edeed9ec8401c767cdb5e1d05874ced.gifv",
];

export const useAdvice = (app: App) => {
  app.command("/advice", async ({ ack, body, client, logger }) => {
    await ack();

    try {
      await client.chat.postMessage({
        text: "I'm Listening....",
        channel: body.channel_id,
        blocks: [
          {
            type: "image",
            image_url: advice[Math.floor(Math.random() * advice.length)],
            alt_text: "It's adivce, you don't have to take it!",
          },
        ],
      });
    } catch (e) {
      logger.error(e);
      await client.chat.postMessage({
        channel: body.channel_id,
        blocks: errorBlock(),
      });
    }
  });
};
