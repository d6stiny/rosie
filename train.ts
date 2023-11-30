import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

(async () => {
  console.time("openai.train.uploadFile");
  const file = await openai.files.create({
    file: fs.createReadStream("data.jsonl"),
    purpose: "fine-tune",
  });
  console.timeEnd("openai.train.uploadFile");

  console.time("openai.train.fineTuning");
  await openai.fineTuning.jobs
    .create({
      training_file: file.id,
      model: "gpt-3.5-turbo",
    })
    .then((job) => {
      console.log(openai.fineTuning.jobs.retrieve(job.id));
    });
  console.timeEnd("openai.train.fineTuning");
})();
