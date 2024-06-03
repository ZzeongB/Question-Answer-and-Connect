import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function handleRequest(message, keywords, questions) {
  let formattedKeywords = keywords.join('\n');
  let formattedQuestions = questions.join('\n');
  
  let system_prompt = '"'+message+'"' + 
    "\nYou are tasked to Classify this message if it is asking question or not a question. \nIf it is a question, then using these keywords:\n" + 
    formattedKeywords + 
    "\n give me the closest keyword that relates to the question. If you think it REALLY doesnt fit any of the keywords, give me a new keyword with one or two phrases that tries to relate to the topic of Math. ONLY if the question doesnt relate to math/Science at all, name it Miscellaneous.\n" +
    "If it is not a question and an answer, then using these recent questions:\n" + 
    formattedQuestions + 
    "\nGive me the closest question with the identification number that relates to the answer. This is ran through the automatic script so ONLY give me ONE answer with the given FORMAT. \n" +
    "EX: How do I preform Gradient Descent\nQ, Optimization and Gradient Descent\nGradient Descent is done easily.\nA, (ID of that question)\nWhat is the weather like today\nQ,Miscellaneous\(ID of that question).\nThe weather is sunny today \nA, 1020\nTell me about NiN network, GoogLeNet\nQ, Networks and GoogLeNet (new keyword)\nONLY GIVE THE ANSWER IN THIS FORMAT 'NO OTHER TEXT ALLOWED':(Q/A), (keyword/ID can of the recent questions))\n";
  
  
  console.log("System Prompt:", system_prompt);

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Make sure the model name is correct
      messages: [
        { role: "user", content: system_prompt }  // User's actual message
      ],
    });

    if (res && res.choices && res.choices.length > 0 && res.choices[0].message) {
      const answer = res.choices[0].message.content;
      console.log("Extracted message:", answer);
      return answer;
    } else {
      console.log("No valid response or message content found in GPT-4 response");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    return null;
  }
}

export default handleRequest;
