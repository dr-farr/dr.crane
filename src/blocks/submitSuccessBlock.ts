import { Block, KnownBlock } from "@slack/bolt";

export const submitSuccessBlock = (name?: string): (Block | KnownBlock)[] => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Oh well now isn't that fabulous! \n Don't you feel so much better for sharing ${
          name ? "<@" + name + ">" : ""
        }? I knew you would! \n If you are curious and want to reflect on your answers you can <https://docs.google.com/spreadsheets/d/1TMgCsJIJvL72yEtJyBZf8pBZ8jhxF6I8w6uvAGPpkjw/edit#gid=0|View my notes>`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "I'll catch up with you next Friday to find out about your progress! \n If you can't wait in until then, you can `/checkin` anytime night or day",
      },
    },
    {
      type: "image",
      image_url:
        "https://user-images.githubusercontent.com/78376735/174083664-51346607-4380-4342-93f5-0eef61f917c5.jpg",
      alt_text: "Scambled eggs all over my face. What is a boy to do?",
      title: {
        type: "plain_text",
        text: "Scambled eggs all over my face. What is a boy to do?",
        emoji: true,
      },
    },
  ];
};
