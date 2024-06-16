import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function handleRequest(message, keywords, formattedQuestions) {
  
  console.log("Received message:", message);
  console.log("Formatted Questions:", formattedQuestions);

  let classificationPrompt = `You are tasked to classify a message: is it asking a question or not? Label 'Q' if it is a question and 'A' if it is an answer. If it can NEVER be an answer or Question (like a mistype) give me NA. ONLY give me the answer in one of the following Q, A, or NA\n Message: "${message}"\n` +
  'Examples:\n' +
  '\n Message: html로 바꾸고 인쇄에서 pdf로 저장 한 것도 인정 되나요? \n' +
  'Q\n' +
  'Message: py 파일 옆에 pdf 파일 안에 1-5번 다 있을 겁니다 (inside the pdf file attached next to .py files)\n' +
  'A\n';

  console.log("Classification Prompt:", classificationPrompt);

  try {
    const classification = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Note: This should be "gpt-4-turbo" unless "gpt-4o" is a specific model version
      messages: [{ role: "user", content: classificationPrompt }],
    });

    console.log("Classification Response:", classification.choices[0].message.content);

    let responseType = classification && classification.choices && classification.choices.length > 0
      ? classification.choices[0].message.content.trim()
      : null;

    console.log("Response Type:", responseType);

    if (responseType === "Q") {
      // If it's a question, find the closest keyword
      let keywords = [
        "Course Logistics",
        "Lecture Content",
        "HW: Submission Standards-HW5",
        "HW: Coding Implementation-HW5",
        "HW: Mathematical Theories and Proofs-HW5",
        "HW: Grades and Inquiries-HW5"
      ];
      let formattedKeywords = keywords.join(", "); // Join keywords into a single string separated by commas
      
      let keywordPrompt = `"Message: ${message}"\nChoose the keyword that best matches the topic of the message from the following list:\n${formattedKeywords}\n If it doesnt fit any of the keyword, label it NA ONLY give me the answer as a single word ` +
      'Examples:\n' +
      'Message: "How do I submit my assignment?"\nHW: Submission Standards-HW5 \n' +
      'Message: "What was covered in the last lecture?"\nLecture Content \n' +
      'Message: "Can you explain the proof of this theorem in problem 2?"\nHW: Mathematical Theories and Proofs-HW5\n'+
      'Message: "양태현은 길쭉하지않아?"\nNA\n';



      const keywordResponse = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: keywordPrompt }],
      });

      console.log("Keyword Response:", keywordResponse.choices);

      let keywordMatch = keywordResponse && keywordResponse.choices && keywordResponse.choices.length > 0
        ? keywordResponse.choices[0].message.content.trim()
        : "No keyword found";

      console.log(`Q, ${keywordMatch}`);
      return `Q, ${keywordMatch}`;

    } else if (responseType === "A") {
      // If it's an answer, find the closest previous question
      let questionPrompt = `\nTry to match an answer to the appropriate question and pick out of these questions:\n${formattedQuestions}\n ONLY give the answer in a single number that best links our answer to a question \n Answer: ${message}'\n` +
      'Examples:\n' +
      'Message: The deadline was set for next Friday.\n1\n' +
      'Message: You can find all lecture materials on the course website.\n530\n';

      console.log("Question Prompt:", questionPrompt);

      const questionResponse = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: questionPrompt }],
      });

      console.log("Question Response:", questionResponse.choices);

      let questionMatch = questionResponse && questionResponse.choices && questionResponse.choices.length > 0
        ? questionResponse.choices[0].message.content.trim()
        : "No question ID found";

      console.log(`A, ${questionMatch}`);
      return `A, ${questionMatch}`;
    } 
    else {
      
      return "NA";
    }
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    return null;
  }
}

export default handleRequest;
