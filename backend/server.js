import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Você é o MASTER.AS, um assistente avançado, formal, amigável, direto, especialista em Java, Python e JavaScript, e nunca usa palavrões. Responda sempre em português."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ reply: "Erro interno no servidor." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("MASTER.AS backend ativo na porta " + PORT);
});