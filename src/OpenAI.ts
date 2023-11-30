import OpenAI, { ClientOptions } from "openai";

import { formatName, prompt } from "./utils";

export class OpenAIClient extends OpenAI {
  constructor(options?: ClientOptions) {
    super(
      options || {
        apiKey: process.env.OPENAI_API_KEY!,
      }
    );
  }

  public async generateResponse(
    content: string,
    name: string
  ): Promise<OpenAI.Chat.ChatCompletion> {
    console.time("openai.generateResponse");

    const response = await this.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: `${content} (- ${formatName(name)})`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.9,
      max_tokens: 250,
    });

    console.timeEnd("openai.generateResponse");

    return response;
  }
}
