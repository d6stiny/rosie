import { Client, ClientOptions, Message, Events } from "discord.js";

import { OpenAIClient } from "./OpenAI";

export class DiscordClient extends Client {
  constructor(options: ClientOptions, private openai = new OpenAIClient()) {
    super(options);
  }

  public listenForMessages(): void {
    this.on(Events.MessageCreate, async (message: Message) => {
      if (message.author.bot) return;
      if (!message.content.startsWith("<@!1132759106994847766>")) return;
      if (message.content.startsWith(">")) return;

      message.channel.sendTyping();

      const response = await this.openai.generateResponse(
        message.content,
        message.author.username
      );

      message.reply(response.choices[0].message.content as string);
      return;
    });
  }

  async connect(token: string): Promise<void> {
    await super.login(token);
  }
}
