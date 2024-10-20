import Vapi from "@vapi-ai/web";

export default async function handler(req, res) { //test comment
  if (req.method === 'POST') {
    try {
      const vapi = new Vapi(process.env.VAPI_PUBLIC_KEY);

      const assistantOptions = {
        name: "Barack Obama",
        firstMessage: "My fellow Americans",
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer",
        },
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "Your system prompt here",
            },
          ],
        },
      };

      const result = await vapi.start(assistantOptions);

      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
