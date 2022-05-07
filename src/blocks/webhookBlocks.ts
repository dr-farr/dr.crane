import { Block, KnownBlock } from "@slack/bolt";

export const webhookBlocks = (
  team = "ventureharbour"
): (Block | KnownBlock)[] => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Hi ${team}! \n I'm a Dr. Fraiser Crane; you may recognise me from such hit tv shows as Fraiser and Cheers.`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "As the sun sets on another week, perhaps now would be a good time to reflect and share your experience of it with me?",
      },
    },

    {
      type: "image",
      title: {
        type: "plain_text",
        text: "Hey baby, I hear the blues a-callin' Tossed salads and scrambled eggs",
        emoji: true,
      },
      image_url:
        "https://user-images.githubusercontent.com/78376735/174117622-d205879b-b3e8-4477-ada4-ece1746f541e.jpg",
      alt_text:
        "Hey baby, I hear the blues a-callin' Tossed salads and scrambled eggs",
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
