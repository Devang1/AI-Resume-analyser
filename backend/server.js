import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = process.env.PORT || 4000;
const gemini = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
const geminiModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";

app.use(cors());
app.use(express.json({ limit: "8mb" }));

const fallbackAnalysis = {
  atsScore: 82,
  hiringProbability: 76,
  skillMatch: 84,
  categoryScores: {
    formatting: 86,
    impact: 74,
    keywords: 79,
    skills: 88,
    experience: 81
  },
  strengths: [
    "Strong project descriptions with clear ownership",
    "Good technical stack for software engineering roles",
    "Clear formatting and readable section structure"
  ],
  weaknesses: [
    "Summary section should be more targeted",
    "Achievements need more measurable business outcomes",
    "Missing some cloud and deployment keywords"
  ],
  missingSkills: ["Docker", "AWS", "Kubernetes", "CI/CD"],
  suggestions: [
    {
      title: "Improve summary section",
      detail: "Add a concise role-focused summary with years of experience, strongest technologies, and a measurable outcome."
    },
    {
      title: "Add measurable achievements",
      detail: "Rewrite bullets with numbers that show scope, speed, quality, revenue, adoption, or reliability improvements."
    },
    {
      title: "Include cloud technologies",
      detail: "Add cloud, deployment, and DevOps keywords where you have real project or internship experience."
    }
  ],
  skillBreakdown: {
    frontend: 92,
    backend: 68,
    aiMl: 54,
    communication: 83,
    leadership: 72
  },
  keywordFeedback: {
    strong: ["React", "TypeScript", "Performance", "REST APIs"],
    moderate: ["Testing", "Accessibility", "Analytics"],
    missing: ["Docker", "AWS", "CI/CD", "Kubernetes"]
  }
};

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "AI Resume Analyzer API" });
});

app.post("/analyze-resume", async (req, res) => {
  const { resumeText = "" } = req.body;

  if (!resumeText.trim()) {
    return res.status(400).json({ error: "resumeText is required" });
  }

  if (!gemini) {
    return res.json(fallbackAnalysis);
  }

  try {
    const response = await gemini.models.generateContent({
      model: geminiModel,
      contents: `You are a senior technical recruiter and ATS resume analyst.
Return strict JSON only with numeric scores and practical, specific feedback.

Analyze this resume professionally.

Return:
- ATS score out of 100
- Key strengths
- Weak areas
- Missing technical skills
- Resume improvement suggestions
- Hiring probability
- Keyword optimization feedback

Use this JSON shape:
{
  "atsScore": number,
  "hiringProbability": number,
  "skillMatch": number,
  "categoryScores": {"formatting": number, "impact": number, "keywords": number, "skills": number, "experience": number},
  "strengths": string[],
  "weaknesses": string[],
  "missingSkills": string[],
  "suggestions": [{"title": string, "detail": string}],
  "skillBreakdown": {"frontend": number, "backend": number, "aiMl": number, "communication": number, "leadership": number},
  "keywordFeedback": {"strong": string[], "moderate": string[], "missing": string[]}
}

Resume:
${resumeText}`
      ,
      config: {
        temperature: 0.25,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            atsScore: { type: "number" },
            hiringProbability: { type: "number" },
            skillMatch: { type: "number" },
            categoryScores: {
              type: "object",
              properties: {
                formatting: { type: "number" },
                impact: { type: "number" },
                keywords: { type: "number" },
                skills: { type: "number" },
                experience: { type: "number" }
              },
              required: ["formatting", "impact", "keywords", "skills", "experience"]
            },
            strengths: { type: "array", items: { type: "string" } },
            weaknesses: { type: "array", items: { type: "string" } },
            missingSkills: { type: "array", items: { type: "string" } },
            suggestions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  detail: { type: "string" }
                },
                required: ["title", "detail"]
              }
            },
            skillBreakdown: {
              type: "object",
              properties: {
                frontend: { type: "number" },
                backend: { type: "number" },
                aiMl: { type: "number" },
                communication: { type: "number" },
                leadership: { type: "number" }
              },
              required: ["frontend", "backend", "aiMl", "communication", "leadership"]
            },
            keywordFeedback: {
              type: "object",
              properties: {
                strong: { type: "array", items: { type: "string" } },
                moderate: { type: "array", items: { type: "string" } },
                missing: { type: "array", items: { type: "string" } }
              },
              required: ["strong", "moderate", "missing"]
            }
          },
          required: [
            "atsScore",
            "hiringProbability",
            "skillMatch",
            "categoryScores",
            "strengths",
            "weaknesses",
            "missingSkills",
            "suggestions",
            "skillBreakdown",
            "keywordFeedback"
          ]
        }
      }
    });

    const content = response.text || "{}";
    res.json(JSON.parse(content));
  } catch (error) {
    console.error("Gemini analysis failed", error);
    res.status(500).json({ error: "Unable to analyze resume" });
  }
});

app.listen(port, () => {
  console.log(`AI Resume Analyzer API running on http://localhost:${port}`);
});
