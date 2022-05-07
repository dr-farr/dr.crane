import { Block, KnownBlock } from "@slack/bolt";
export const checkinModalBlock = (): (Block | KnownBlock)[] => {
  return [
    {
      type: "section",

      text: {
        type: "plain_text",
        text: "Take a few moments to reflect on the week and feel free to share your experience",
        emoji: true,
      },
    },
    {
      type: "image",

      image_url:
        "https://user-images.githubusercontent.com/78376735/174088925-51eb1ed8-84cd-46f6-8dc2-8aff7f5b9c41.png",
      alt_text: "Everything I know I learned from dogs",
    },

    {
      type: "divider",
    },
    {
      type: "input",
      optional: true,
      label: {
        type: "plain_text",
        text: "How well do you feel you've worked with the rest of the team?",

        emoji: true,
      },
      element: {
        type: "radio_buttons",
        action_id: "team_work",
        options: [
          {
            text: {
              type: "plain_text",
              text: "It's an all time high!",
              emoji: true,
            },
            value: "5",
          },
          {
            text: {
              type: "plain_text",
              text: "I'm happy with the team's progress",
              emoji: true,
            },
            value: "4",
          },
          {
            text: {
              type: "plain_text",
              text: "I've worked well together with everyone but there is room for improvements",
              emoji: true,
            },
            value: "3",
          },
          {
            text: {
              type: "plain_text",
              text: "There was a lot of work and I didn't do it well",
              emoji: true,
            },
            value: "2",
          },
          {
            text: {
              type: "plain_text",
              text: "*emerging from a cave constructed from empty energy drink cans & crisp packets* Team? What is this team of which you speak? ",
              emoji: true,
            },
            value: "1",
          },
        ],
      },
    },

    {
      type: "input",
      optional: true,
      label: {
        type: "plain_text",
        text: "What do you feel was the best thing that happened this week?",
        emoji: true,
      },
      element: {
        action_id: "good_things",
        type: "plain_text_input",
        multiline: true,
      },
    },
    {
      type: "input",
      optional: true,
      label: {
        type: "plain_text",
        text: "What is one thing that you feel wish could have improved?",
        emoji: true,
      },
      element: {
        action_id: "improve",
        type: "plain_text_input",
        multiline: true,
      },
    },
    {
      type: "input",
      optional: true,
      label: {
        type: "plain_text",
        text: "Could you you tell me something you've learned?",

        emoji: true,
      },
      element: {
        action_id: "learning",
        type: "plain_text_input",
        multiline: true,
      },
    },
    {
      type: "input",
      optional: true,
      label: {
        type: "plain_text",
        text: "How comfortable did you feel in your role?",
        emoji: true,
      },
      element: {
        action_id: "wellness",
        type: "radio_buttons",
        options: [
          {
            text: {
              type: "plain_text",
              text: "The perfect ratio of workload and productivity, I feel like I'm on top of the world and I am able to crush physical objects using my thoughts alone",
              emoji: true,
            },
            value: "5",
          },
          {
            text: {
              type: "plain_text",
              text: "A bit of a mess, but I'm still on top of the world",
              emoji: true,
            },
            value: "4",
          },
          {
            text: {
              type: "plain_text",
              text: "I'm feeling suitably challenged and crusin'",
              emoji: true,
            },
            value: "3",
          },
          {
            text: {
              type: "plain_text",
              text: "It was a tough week!",
              emoji: true,
            },
            value: "2",
          },
          {
            text: {
              type: "plain_text",
              text: "I need a hug Doc' 🥹",
              emoji: true,
            },
            value: "1",
          },
        ],
      },
    },
  ];
};
