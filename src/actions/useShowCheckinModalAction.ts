import { App, BlockButtonAction } from "@slack/bolt";

import { checkinModalBlock } from "../blocks/checkinModalBlock";
import { errorBlock } from "../blocks/errorBlock";

export const useShowCheckinModalAction = (app: App) => {
  app.action<BlockButtonAction>(
    "show_add_item_modal",
    async ({ ack, client, body, logger }) => {
      const channelId = body.channel?.id;
      const userId = body.user?.id;

      try {
        await ack();
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
            title: {
              type: "plain_text",
              text: "End of week check-in",
              emoji: true,
            },
            blocks: checkinModalBlock(),
            private_metadata: JSON.stringify({
              channelId,
              userId,
            }),
          },
        });
      } catch (e) {
        logger.error(e);
        await client.chat.postMessage({
          channel: channelId,
          blocks: errorBlock(),
        });
      }
    }
  );
};
