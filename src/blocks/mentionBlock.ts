import { Block, KnownBlock } from "@slack/bolt";

export const mentionBlocks = ({ name = "human" }): (Block | KnownBlock)[] => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Hi <@${name}>! 👋`,
      },
    },
    {
      type: "image",
      image_url:
        "https://c.tenor.com/8GPhyQF_hqsAAAAM/fraiser-doctor-crane.gif",
      alt_text: "I'm Listening",
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Check-in",
            emoji: true,
          },

          action_id: "show_add_item_modal",
        },
      ],
    },
  ];
};
