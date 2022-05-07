import { Block, KnownBlock } from "@slack/bolt";

export const errorBlock = (
  text = "Do excuse me, I'm just having a moment. *farty noises*"
): (Block | KnownBlock)[] => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text,
      },
    },
    {
      type: "divider",
    },
  ];
};
