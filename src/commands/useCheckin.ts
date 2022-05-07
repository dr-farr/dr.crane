import { App } from "@slack/bolt";
import { checkinModalBlock } from "../blocks/checkinModalBlock";
import { errorBlock } from "../blocks/errorBlock";

export const useCheckin = (app: App) => {
  app.command("/checkin", async ({ ack, body, client, logger }) => {
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: {
          type: "modal",
          callback_id: "add_item_view",

          submit: {
            type: "plain_text",
            text: "Done",
            emoji: true,
          },
          close: {
            type: "plain_text",
            text: "Cancel",
            emoji: true,
          },
          private_metadata: JSON.stringify({
            channelId: body.user_id,
            username: body.user_name,
          }),
          title: {
            type: "plain_text",
            text: "Wellness check-in",
          },
          blocks: checkinModalBlock(),
        },
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
