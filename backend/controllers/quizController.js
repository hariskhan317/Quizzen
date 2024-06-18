import { User } from '../models/user.js'; 
import OpenAI from "openai";

export const generateQuestion = async (req, res) => {
  try { 
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
        return res.status(401).send("Can't find the user");
    }
      
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_SECRET
    });

    const quizQuestion = `Generate a multiple-choice question on React JS with 4 choices.
      Provide the question, 4 choices, and indicate the correct answer.
      Format:
      Question: <question>
      Choices:
      A. <choice 1>
      B. <choice 2>
      C. <choice 3>
      D. <choice 4>
      Correct Answer: <correct answer letter>`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: quizQuestion }],
  
    }); 

    const response = completion.choices[0].message.content;

    const lines = response.split('\n').map(line => line.trim()).filter(line => line);
    const questionLine = lines.find((line) => line.startsWith("Question"));
    const choices = lines.filter(line => line.startsWith("A.") || line.startsWith("B.") || line.startsWith("C.") || line.startsWith("D."))
    const correctAnswerLine = lines.find((line) => line.startsWith("Correct Answer"))

    const question = questionLine.replace("Question: ", "");
    const correctAnswer = correctAnswerLine.replace("Correct Answer: ", "");
    const formattedChoices = choices.map(choice => choice.replace(/^[A-D]\. /, ''));

    const responseData = {
      question,
      choices: [
        formattedChoices[0],
        formattedChoices[1],
        formattedChoices[2],
        formattedChoices[3],
      ],
      correctAnswer,
    }

    user.quiz.push(responseData)

    await user.save();
 
    res.status(200).send({message: 'Successfull', quiz: user.quiz});
  
  } catch (error) {
    console.error('Error:', error);
    return res.status(404).send({ message: 'NOT_FOUND 404 ERROR', cause: error.message });
  }
};