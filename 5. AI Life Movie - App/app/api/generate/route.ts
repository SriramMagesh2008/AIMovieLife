import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const memories = body?.memories;

    if (!memories || typeof memories !== "string") {
      return Response.json(
        { error: "Invalid or missing memories input" },
        { status: 400 }
      );
    }

    const prompt = `
You are a cinematic screenplay narrator.

Transform the following life memories into a 60-second emotional movie trailer narration.

Rules:
- Only output the final narration
- No titles, no explanations
- Make it emotional, cinematic, inspiring
- Use vivid storytelling language
- 120–180 words

Memories:
${memories}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a cinematic storyteller who writes emotional movie trailer narrations."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.9
    });

    const story = completion.choices?.[0]?.message?.content?.trim();

    if (!story) {
      return Response.json(
        { error: "Empty response from AI" },
        { status: 500 }
      );
    }

    return Response.json({ story });
  } catch (error: any) {
    console.error("Generate API Error:", error);

    return Response.json(
      { error: "Failed to generate story" },
      { status: 500 }
    );
  }
}