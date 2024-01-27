import express from "express";
import * as dotenv from "dotenv";
import Post from "../mongodb/models/post.js";
import OpenAI from "openai";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.MONGODB_URL });
dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from Dalle");
});

router.route("/test").post(async (req, res) => {
  const response = await openai.createImage({
    model: "dall-e-3",
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  });
  image_url = response.data.data[0].url;
  console.log("image_url: ", image_url);
});
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      // response_format: "b64_json",
    });
    const image = aiResponse.data.data[0];
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.send(500).send(error?.response.data.error.message);
  }
});
export default router;
