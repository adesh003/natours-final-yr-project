const { GoogleGenerativeAI } = require("@google/generative-ai");
const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getChatResponse = catchAsync(async (req, res, next) => {
  const { prompt } = req.body;

  if (!prompt) {
    return next(new AppError("Please provide a prompt/question!", 400));
  }

  // 1. Saare Tours ka data nikalo DB se (Context ke liye)
  // Hum sirf zaroori fields lenge taaki token limit cross na ho
  const tours = await Tour.find().select(
    "name duration maxGroupSize difficulty price summary description startLocation"
  );

  // 2. Data ko String mein convert karo taaki AI padh sake
  const toursContext = JSON.stringify(tours);

  // 3. Gemini AI ko Config karo
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  // 4. Magic Prompt ✨ (AI ko Role samjhao)
  const finalPrompt = `
    You are an intelligent travel assistant for a tour company called "Natours".
    Here is the JSON data of all available tours: ${toursContext}
    
    User Question: "${prompt}"
    
    Rules:
    1. Only recommend tours from the provided data.
    2. Be friendly and exciting! Use emojis 🌲🏔️.
    3. If the user asks for something not available (like a tour to Mars), politely say we don't have that yet.
    4. Mention the Price and Duration of the recommended tour.
    5. Keep the answer short (max 3-4 sentences).
  `;

  // 5. AI se Jawab mango
  const result = await model.generateContent(finalPrompt);
  const response = await result.response;
  const text = response.text();

  // 6. Response Frontend ko bhejo
  res.status(200).json({
    status: "success",
    message: text,
  });
});