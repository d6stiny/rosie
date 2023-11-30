import { DiscordClient } from "./src/Client";

import { GatewayIntentBits } from "discord.js";
import { OpenAIClient } from "./src/OpenAI";

const client = new DiscordClient({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
  ],
});

client.listenForMessages();

const openai = new OpenAIClient();

client.connect(process.env.DISCORD_TOKEN!);
