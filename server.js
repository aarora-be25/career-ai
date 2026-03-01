npm init -y
npm install express cors openai
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: "PUT_YOUR_API_KEY_HERE"
});

app.post("/skills", async (req, res) => {
  const { job, degree } = req.body;

  const prompt = `
You are a career advisor.
Given the job: ${job}
And degree: ${degree}
List the key skills needed.
Return as bullet points.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }]
  });

  res.json({ result: response.choices[0].message.content });
});

app.post("/lesson", async (req, res) => {
  const { skill } = req.body;

  const prompt = `
You are a tutor.
Teach ${skill} to a beginner.
Include:
1. Explanation
2. Example
3. Exercise
4. One resource link
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }]
  });

  res.json({ result: response.choices[0].message.content });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
node server.js
