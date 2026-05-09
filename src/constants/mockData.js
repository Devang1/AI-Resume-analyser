export const sampleAnalyses = [
  {
    id: "analysis-001",
    fileName: "Senior_Frontend_Resume.pdf",
    createdAt: "2026-05-04T10:30:00.000Z",
    atsScore: 82,
    hiringProbability: 76,
    skillMatch: 84,
    strongestSkill: "React Native",
    improvementPercentage: 24,
    categoryScores: {
      formatting: 86,
      impact: 74,
      keywords: 79,
      skills: 88,
      experience: 81
    },
    strengths: [
      "Strong project descriptions with clear ownership",
      "Modern technical stack aligned with mobile roles",
      "Readable formatting and consistent section hierarchy"
    ],
    weaknesses: [
      "Summary can be sharper and role-specific",
      "Several achievements need measurable outcomes",
      "Leadership impact is present but under-emphasized"
    ],
    missingSkills: ["Docker", "AWS", "Kubernetes", "CI/CD"],
    suggestions: [
      {
        title: "Improve the summary section",
        detail: "Open with a concise two-line pitch that names your target role, years of experience, strongest domain, and measurable business impact."
      },
      {
        title: "Add measurable achievements",
        detail: "Convert responsibilities into outcomes using metrics such as load time, crash rate, revenue impact, retention, or delivery speed."
      },
      {
        title: "Include cloud technologies",
        detail: "Add AWS, Docker, CI/CD, and monitoring keywords if you have hands-on exposure through projects, internships, or production work."
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
  },
  {
    id: "analysis-002",
    fileName: "Product_Engineer_Resume.pdf",
    createdAt: "2026-04-28T15:15:00.000Z",
    atsScore: 74,
    hiringProbability: 68,
    skillMatch: 71,
    strongestSkill: "Product Thinking",
    improvementPercentage: 18,
    categoryScores: {
      formatting: 78,
      impact: 65,
      keywords: 70,
      skills: 76,
      experience: 73
    },
    strengths: ["Clear product ownership", "Good cross-functional language", "Relevant full-stack experience"],
    weaknesses: ["Weak metrics", "Missing deployment keywords", "Project scope could be clearer"],
    missingSkills: ["GraphQL", "Observability", "A/B Testing"],
    suggestions: [
      {
        title: "Quantify product outcomes",
        detail: "Add adoption, conversion, retention, or latency improvements to make your work easier for recruiters to rank."
      }
    ],
    skillBreakdown: {
      frontend: 82,
      backend: 72,
      aiMl: 41,
      communication: 86,
      leadership: 69
    },
    keywordFeedback: {
      strong: ["Product", "React", "APIs"],
      moderate: ["Experimentation", "Node.js"],
      missing: ["GraphQL", "A/B Testing", "Observability"]
    }
  }
];

export const createAnalysisFromFile = (fileName = "Uploaded_Resume.pdf") => ({
  ...sampleAnalyses[0],
  id: `analysis-${Date.now()}`,
  fileName,
  createdAt: new Date().toISOString(),
  atsScore: 82 + Math.floor(Math.random() * 8),
  hiringProbability: 75 + Math.floor(Math.random() * 10),
  skillMatch: 80 + Math.floor(Math.random() * 10)
});
