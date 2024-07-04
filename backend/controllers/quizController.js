import { User } from '../models/user.js'; 
import { Quiz } from '../models/quiz.js'; 
import OpenAI from "openai";

export const getQuiz = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id)
    if (!user) {
      return res.status(401).send("Cant Find the user")
    }
  
    if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Not the same user")
    }
  
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
  
    if (!quiz) {
      return res.status(401).send("Can't find the Quiz");
    } 
    return res.status(200).send(quiz);
  }
  catch (error) {
    console.error('Error:', error);
    return res.status(404).send({ message: 'NOT_FOUND 404 ERROR', cause: error.message });
  }
}

export const getAllQuizQuestion = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id)
    if (!user) {
      return res.status(401).send("Cant Find the user")
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Not the same user")
    }

    const quiz = await Quiz.find();

   
    return res.status(200).send({quiz});
  
  } catch (error) {
    console.error('Error:', error);
    return res.status(404).send({ message: 'NOT_FOUND 404 ERROR', cause: error.message });
  }
} 

export const generateQuestion = async (req, res) => {
  try { 
    const { topic, number } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
        return res.status(401).send("Can't find the user");
    }
      
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_SECRET
    });

    const quizQuestion = `Generate ${number} unique questions on ${topic} with 4 choices each. Do not repeat any questions.
    
      Format:
      Question: <question>
      Choices:
      A. <choice 1>
      B. <choice 2>
      C. <choice 3>
      D. <choice 4>
      Correct Answer: <write the complete correct choice>`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: quizQuestion }],
  
    }); 

    const response = completion.choices[0].message.content; 

    const questionBlocks = response.split('\n\n').map(block => block.trim()).filter(block => block);

    const questionsData = questionBlocks.map(block => {
      const lines = block.split('\n').map(line => line.trim()).filter(line => line);

      const questionLine = lines.find(line => line.startsWith("Question"));
      const choices = lines.filter(line => line.startsWith("A.") || line.startsWith("B.") || line.startsWith("C.") || line.startsWith("D."));
      const correctAnswerLine = lines.find(line => line.startsWith("Correct Answer"));

      const question = questionLine.replace("Question: ", "");
      const correctAnswer = correctAnswerLine.replace(/^Correct Answer: [A-D]\. /, "");
      const formattedChoices = choices.map(choice => choice.replace(/^[A-D]\. /, ''));

      return {
        question,
        choices: [
          formattedChoices[0],
          formattedChoices[1],
          formattedChoices[2],
          formattedChoices[3],
        ],
        correctAnswer,
      };
    });

    const quiz = new Quiz({
      topic,
      number,
      questions: questionsData,
      user: user._id
    })

    await quiz.save();

    user.quizzes.push(quiz.id);

    await user.save();
 
    res.status(200).send({status: 200, message:"Successfully created", quiz});
  
  } catch (error) {
    console.error('Error:', error);
    return res.status(404).send({ message: 'NOT_FOUND 404 ERROR', cause: error.message });
  }
};

export const postQuizResult = async (req, res) => {
  try {
    const { selectedOptions, id } = req.body;

    const quiz = await Quiz.findById(id);

    quiz.questions.forEach((question, index) => {
      if (Array.isArray(selectedOptions[index])) {
        
        quiz.questions[index].selectedOptions = [];

        // Populate selectedOptions with the provided values
        selectedOptions[index].forEach(option => {
          quiz.questions[index].selectedOptions.push({ option });
        });
      } else if (typeof selectedOptions[index] === 'string') {
        // Handle the case where selectedOptions[index] is a single string
        quiz.questions[index].selectedOptions = [{ option: selectedOptions[index] }];
      }
    });

    let score = 0;
    quiz.questions.forEach((question, index) => {
      const selected = quiz.questions[index].selectedOptions.map(opt => opt.option);
      const correct = quiz.questions[index].correctAnswer;

      // Assuming correctAnswer is an array of strings
      if (selected.sort().toString() === correct.sort().toString()) {
        score++;
      }
    });

    quiz.score = score;

    await quiz.save();
    res.status(200).json({ quiz });

  } catch (error) {
    console.error('Error:', error);
    return res.status(404).send({ message: 'NOT_FOUND 404 ERROR', cause: error.message });
  }
};
