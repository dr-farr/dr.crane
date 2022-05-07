import dayjs from "dayjs";

import {
  getAverageValue,
  renderStars,
  formatValues,
  renderList,
  getSheetValuesByTitle,
} from "../utils/sheetHelpers";
import { Block, KnownBlock } from "@slack/bolt";
export const homeBlocks = ({
  user = "human",
  data,
}): (Block | KnownBlock)[] => {
  const wellnessScore = getAverageValue(
    getSheetValuesByTitle(data, "Wellness")
  );

  const teamworkScore = getAverageValue(
    getSheetValuesByTitle(data, "Teamwork")
  );

  const learnings = formatValues(getSheetValuesByTitle(data, "Learnings"));
  const improvements = formatValues(
    getSheetValuesByTitle(data, "What to improve")
  );
  const goodThings = formatValues(getSheetValuesByTitle(data, "Good things"));

  const learningBlocks = renderList(learnings);

  const improvementBlocks = renderList(improvements);

  const goodThingsBlocks = renderList(goodThings);

  const introBlocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Dr Crane's Chamber of Reflection",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Hi, <@" + user + "> :wave:, great to see you!",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "I'm Dr. Frasier Winslow Crane and welcome to my chamber of reflection. 😀",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "It exists on the intersectional boundary between your physical world and the tachyonic realm where it's possible for you to observe both superluminal transformations and tachyon-bradyon interactions!",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Don't worry- you are safe! Here you can reflect on your teams experiences and if you feel like it, confidentially share your own experiences with me.",
      },
    },
    {
      type: "image",
      title: {
        type: "plain_text",
        text: "Everything I know, I learned from dogs",
        emoji: true,
      },
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzjNaqZTISoJx99gKVv5H7-i_8hzpYX_gv7ATW05bgobKkQ0SUI0oER2Bq_hGIlyTE3I&usqp=CAU",
      alt_text: "Everything I know I learned from dogs",
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
          style: "primary",
          action_id: "show_add_item_modal",
        },

        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Help",
            emoji: true,
          },
          value: "help",
          action_id: "oops",
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "image",
          image_url:
            "https://api.slack.com/img/blocks/bkb_template_images/placeholder.png",
          alt_text: "placeholder",
        },
      ],
    },

    {
      type: "header",
      text: {
        type: "plain_text",
        text: `Reflecting on the week of ${dayjs()
          .subtract(1, "week")
          .startOf("week")
          .format("MMMM D, YYYY")}`,
      },
    },
  ];
  const scoreBlocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Team dynamic *\n${renderStars(
          teamworkScore
        )}\n ${teamworkScore.toFixed()}/5`,
      },
      accessory: {
        type: "image",
        image_url: "https://media.giphy.com/media/RlSj5XhFUVMCUyFS1C/giphy.gif",
        alt_text: "Woah! That's a lot of teamwork!",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Team Wellness score *\n ${renderStars(
          wellnessScore
        )}\n ${wellnessScore.toFixed()}/5`,
      },
      accessory: {
        type: "image",
        image_url: "https://media.giphy.com/media/llIn5sBiWPQ7McbUkZ/giphy.gif",
        alt_text: "Wow! That's a lot of wellness!",
      },
    },
  ];

  const contextBlock = [
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "🛋 You can check-in anytime with `/checkin`\n🏗 Want some advice from a Crane? Just type `/advice`\n❓ Get help at any time by typing *help* in a DM with me \n 📔 <https://docs.google.com/spreadsheets/d/1TMgCsJIJvL72yEtJyBZf8pBZ8jhxF6I8w6uvAGPpkjw/edit#gid=0|View my notes>",
        },
      ],
    },
  ];

  return [
    ...introBlocks,
    {
      type: "divider",
    },
    ...scoreBlocks,
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*What we've learned :brain: *",
      },
    },
    ...learningBlocks,
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*What we feel needs to be improved :construction:*",
      },
    },
    ...improvementBlocks,
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Good things that have happened to us :tada: *",
      },
    },
    ...goodThingsBlocks,
    {
      type: "divider",
    },
    ...contextBlock,
  ];
};
