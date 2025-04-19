import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable.");
}

const genAI = new GoogleGenerativeAI(apiKey);


const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro-preview-03-25",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: "text/plain",
};

export interface ChatMessage {
  role: "user" | "model";
  message: string;
}

export interface GeminiChatResponse {
  response: string;
  chatHistory: ChatMessage[];
}

export interface GeminiChatRequest {
  prompt: string;
}

export async function askGemini(prompt: string): Promise<string> {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `You are a helpful AI cooking assistant. You should:
            - Explain clearly and simply, step-by-step
            - Suggest substitutions based on availability
            - Consider allergies, dietary needs, and skill level
            - Never assume user can see images or videos
            - Encourage users to try different ingredient combinations and creative alternatives
            - Provide suggestions based on the cooking tools and equipment the user might have
            - Ask or suggest portion sizes based on the number of people the user is cooking for
            - Offer clear and realistic cooking times, including preparation and cooking times
            - Suggest how to store leftovers or freeze food if relevant
            - Describe actions and steps clearly with step-by-step written instructions, as if giving verbal directions
            - Adjust instructions based on user’s skill level, from novice to expert
            - If a user mentions dietary restrictions (e.g., gluten-free, dairy-free), give suggestions for substitutions and modifications
            - Where applicable, provide healthier alternatives or low-calorie modifications
            - Provide variations of recipes based on flavor preferences or specific dietary needs (e.g., spicy, low-carb, high-protein)
            - Be an interactive helper during the cooking process, offering tips or answering questions in real-time`
        },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: `My thinking process for generating the helpful AI cooking assistant persona and initial response goes like this:

1. **Deconstruct the Request:** I first break down the core requirements and constraints provided in the prompt.

* **Role:** Helpful AI Cooking Assistant.
* **Key Actions/Attributes:**
* Explain clearly, simply, step-by-step.
* Suggest substitutions (availability).
* Consider allergies, dietary needs, skill level.
* *Never* assume visual aids (no images/videos).
* Encourage experimentation/creativity.
* Suggest based on tools/equipment.
* Ask/suggest portion sizes.
* Offer clear, realistic cooking times (prep + cook).
* Suggest storage/freezing.
* Describe actions clearly (like verbal directions).
* Adjust instructions for skill level.
* Provide dietary substitutions (gluten-free, dairy-free, etc.).
* Offer healthier/low-calorie options.
* Provide variations (spicy, low-carb, high-protein, etc.).
* Be interactive during cooking (tips, real-time answers).

2. **Synthesize the Persona:** Based on these points, I need to embody a friendly, knowledgeable, patient, and adaptable cooking guide. The tone should be encouraging and supportive, not prescriptive or judgmental. It needs to sound like someone *talking* you through a recipe, anticipating potential hurdles.

3. **Identify Key Capabilities:** The core functionalities are:
* Recipe generation/explanation.
* Ingredient substitution guidance.
* Dietary adaptation.
* Skill level adjustment.
* Equipment consideration.
* Portioning advice.
* Timing estimation.
* Storage advice.
* Interactive Q&A during cooking.
* Variation suggestions.

4. **Draft an Opening Statement:** How should this assistant introduce itself and set expectations? It needs to immediately convey its purpose and capabilities based on the prompt.
* Start with a friendly greeting.
* State its role: "Your helpful AI cooking assistant."
* Mention key features from the prompt: step-by-step guidance, substitutions, dietary needs, skill levels, equipment, etc.
* Emphasize the interactive nature: "I'm here to help you..."
* End with an open invitation for the user to start: "What would you like to cook today?" or similar.

5. **Refine the Opening Statement (Self-Correction/Improvement):**
* *Initial thought:* "Hi, I'm a cooking AI. Tell me what to do." - Too blunt, doesn't showcase features.
* *Second thought:* "Hello! I can help you cook. I'll give you steps, subs, and consider diets." - Better, but still a bit dry.
* *Third thought (closer to final):* "Hello there! I'm ready to be your friendly cooking guide. Think of me as your virtual kitchen helper. I can walk you through recipes step-by-step, suggest easy swaps if you're missing an ingredient, and help tailor things to your dietary needs (like gluten-free or vegan), your skill level, and even the tools you have on hand. I'll give you realistic timings, portion ideas, and tips for leftovers. Just tell me what you have in mind, or ask me anything along the way!" - This captures the essence much better: friendly tone, lists key features naturally, emphasizes interaction.

6. **Structure the Interaction Flow (Internal Logic):** When a user asks for a recipe or help, my internal process will be:
* **Clarify:** Ask clarifying questions first (if needed):
* "What kind of dish are you thinking of?"
* "How many people are you cooking for?"
* "Any dietary restrictions or allergies I should know about?"
* "What's your comfort level in the kitchen (beginner, intermediate, experienced)?"
* "What key ingredients do you have or want to use?"
* "What main cooking equipment do you have (oven, stovetop, microwave, air fryer, slow cooker, etc.)?"
* **Generate/Adapt:** Based on the answers, retrieve or generate a suitable recipe.
* **Present Step-by-Step:** Break down the recipe into clear, numbered steps. Use action verbs. Describe *how* to do things (e.g., "finely chop the onion" vs. just "chop onion").
* **Embed Features:**
* *Substitutions:* Mention common subs within the ingredient list or steps (e.g., "1 cup milk (or almond milk, soy milk, or oat milk)").`
      },
    ],
  },
],
});

  const result = await chatSession.sendMessage(prompt);

  const responseText = result.response.text();

  if (!responseText) {
    throw new Error("No response received from Gemini.");
  }

  return responseText;

}
