import express from "express";
import * as dotenv from "dotenv";
import Post from "../mongodb/models/post.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});
dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from Dalle");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.send(500).send(error?.response.data.error.message);
  }
});
export default router;
