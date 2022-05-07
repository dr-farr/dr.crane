import { App } from "@slack/bolt";
import { SpreadsheetClient } from "../utils/spreadsheetClient";

import { ViewSubmitAction } from "@slack/bolt/dist/types/view";
import config from "../utils/config";
import { submitSuccessBlock } from "../blocks/submitSuccessBlock";
import { errorBlock } from "../blocks/errorBlock";
export const useAddItemView = (app: App) => {
  app.view<ViewSubmitAction>(
    "add_item_view",
    async ({ ack, view, logger, client, body }) => {
      await ack();

      try {
        // This is all the date from the form submitted by the user

        // we are munging into a format to save into the google sheet https://docs.google.com/spreadsheets/d/1TMgCsJIJvL72yEtJyBZf8pBZ8jhxF6I8w6uvAGPpkjw/edit#gid=2141952065
        const data = Object.values(view.state.values).reduce((prev, next) => {
          const key = Object.keys(next)[0];
          const value = next[key]?.selected_option?.value
            ? next[key]?.selected_option.value
            : next[key]?.value;

          if (!value || value === "") {
            return [...prev];
          }
          return [
            ...prev,
            {
              key,
              value,
            },
          ];
        }, []);

        const spreadsheetClient = await SpreadsheetClient.build();

        await spreadsheetClient.setValues(config.GOOGLE_SHEET_ID, data);

        await client.chat.postMessage({
          channel: body.user?.id,
          user: body.user?.name,
          blocks: submitSuccessBlock(body.user?.name),
        });
      } catch (e) {
        logger.error(e);
        await client.chat.postMessage({
          channel: body.user.id,
          user: body.user.name,
          blocks: errorBlock(
            "My apologies, I wasn't able to process your request *farty noises* 🥴"
          ),
        });
      }
    }
  );
};
