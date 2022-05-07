import { App } from "@slack/bolt";

const MENTION_REGEX = /(?<botName>@.+)>(?<message>[\s\S]*)/;

export const extractMessageFromText = (text: string) =>
  MENTION_REGEX.exec(text)?.groups?.message.trim() || "";

export const isMentionMessage = (text: string) => MENTION_REGEX.test(text);

export const getChannelName = async (
  client: App["client"],
  channelId: string
) => {
  if (!channelId) {
    throw Error("Cannot get a channel name with no channel id");
  }
  const channelInfo = await client.conversations.info({
    channel: channelId,
  });
  return channelInfo.channel?.name || "";
};
