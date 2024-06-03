// ./api/generate
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

async function handleRequest(message, setApiOutput) {
  console.log("handleRequest", message)

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: "Say this is a test" }],
  }).then((res) => {
    const { data } = res;

    console.log(data);
  });

  setApiOutput(response);
}

export default handleRequest;