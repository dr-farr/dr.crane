import {
  App,
  ExpressReceiver,
  ExpressReceiverOptions,
  LogLevel,
} from "@slack/bolt";
import path from "path";
import config from "./utils/config";
import { useMentionEvent } from "./events/useMentionEvent";
import { useAppHomeOpenedEvent } from "./events/useAppHomeOpenedEvent";
import { useAppDirectMessageEvent } from "./events/useAppDirectMessageEvent";

import { useShowCheckinModalAction } from "./actions/useShowCheckinModalAction";

import { useAddItemView } from "./views/useAddItemView";
import { useCheckin } from "./commands/useCheckin";

const { WebClient } = require("@slack/web-api");
import { IncomingWebhook } from "@slack/webhook";
import { useAdvice } from "./commands/useAdvice";
import { webhookBlocks } from "./blocks/webhookBlocks";

const client = new WebClient();

class ExpressReceiverWithOAuthEndpoints extends ExpressReceiver {
  constructor(options: ExpressReceiverOptions) {
    super(options);

    this.app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "/index.html"));
    });

    this.app.post("/webhook", async (req, res) => {
      if (!config.SLACK_WEBHOOK_URL) {
        res.status(500).json("Please add a Slack webhook URL");
        return;
      }

      try {
        const webhook = new IncomingWebhook(config.SLACK_WEBHOOK_URL);

        webhook.send({
          blocks: webhookBlocks(),
        });

        res.sendStatus(200);
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
      }
    });

    this.app.get("/health", (req, res) => {
      console.log("Why should things be easy to understand?");
      return res.sendStatus(200);
    });
    this.app.get("/auth/redirect", async (req, res) => {
      try {
        const response = await client.oauth.v2.access({
          client_id: config.SLACK_CLIENT_ID,
          client_secret: config.SLACK_CLIENT_SECRET,
          code: req.query.code as string,
          state: req.query.state,
        });

        console.log(response);

        // const identity = await client.users.identity({
        //   token: response.authed_user.access_token,
        // });

        res.status(200).send("You've logged in with your Slack account!");
      } catch (e) {
        res.status(500).send("Something wrong!");
      }
    });
  }
}

const expressReceiver = new ExpressReceiverWithOAuthEndpoints({
  signingSecret: config.SLACK_SIGNING_SECRET,
  endpoints: "/events",
  processBeforeResponse: true,
});

const app = new App({
  receiver: expressReceiver,
  token: config.SLACK_BOT_TOKEN,
  processBeforeResponse: true,
  logger: {
    error(...msg) {
      console.error(msg);
    },
    debug(...msg) {
      console.info(msg);
    },
    info(...msg) {
      console.info(msg);
    },
    warn(...msg) {
      console.warn(msg);
    },
    setLevel: (level) => ({}),
    getLevel: () => LogLevel.DEBUG,
    setName: (name) => ({}),
  },
});

app.error(async (e) => {
  console.error(e);
});

useMentionEvent(app);
useAppDirectMessageEvent(app);
useAppHomeOpenedEvent(app);

useShowCheckinModalAction(app);
useAddItemView(app);

useCheckin(app);
useAdvice(app);

const start = async () => {
  const port = Number(config.PORT) || 3000;
  await app.start(port);

  console.log(`I'm listening on ${port}... 〠`);
};

start();
