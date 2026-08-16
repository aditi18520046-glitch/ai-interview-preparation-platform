import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Use Gemini API
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  app.post('/api/interview/chat', async (req, res) => {
    try {
      const { config, history, answer } = req.body;
      
      let prompt = "";
      if (answer) {
        prompt = `
You are an expert AI Technical Interviewer conducting a mock interview for a ${config.difficulty} ${config.job_role} role at ${config.company}.
Interview Type: ${config.interview_type}.

The candidate just provided this answer to your previous question:
"${answer}"

Evaluate the candidate's answer and generate the next context-aware question.
The next question should adapt based on their performance (e.g., dive deeper if they did well, or clarify if they struggled).

Return your response strictly in the following JSON format without Markdown code blocks or any other text:
{
  "evaluation": {
    "correctness": 80,
    "relevance": 85,
    "completeness": 75,
    "technicalKnowledge": 80,
    "clarity": 85,
    "overall": 81,
    "strengths": ["...", "..."],
    "improvements": ["...", "..."]
  },
  "feedback": "Concise paragraph of feedback to the candidate.",
  "nextQuestion": "The next question you want to ask."
}
`;
      } else {
        prompt = `
You are an expert AI Technical Interviewer conducting a mock interview for a ${config.difficulty} ${config.job_role} role at ${config.company}.
Interview Type: ${config.interview_type}.

This is the start of the interview. 
Generate the very first question to ask the candidate. Make it relevant to the role and company.

Return your response strictly in the following JSON format without Markdown code blocks or any other text:
{
  "nextQuestion": "The next question you want to ask."
}
`;
      }
      
      let fullPrompt = `System: You are an expert AI Technical Interviewer.
Context: Interviewing for ${config.difficulty} ${config.job_role} at ${config.company}. Type: ${config.interview_type}.

`;
      if (history && history.length > 0) {
        fullPrompt += "Interview History:\n";
        for (const msg of history) {
            fullPrompt += `${msg.role === 'ai' ? 'Interviewer' : 'Candidate'}: ${msg.text}\n`;
        }
        fullPrompt += "\n";
      }

      fullPrompt += prompt;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: fullPrompt,
        config: {
            temperature: 0.7,
            responseMimeType: 'application/json',
            responseSchema: answer ? {
                type: 'OBJECT',
                properties: {
                    evaluation: {
                        type: 'OBJECT',
                        properties: {
                            correctness: { type: 'INTEGER' },
                            relevance: { type: 'INTEGER' },
                            completeness: { type: 'INTEGER' },
                            technicalKnowledge: { type: 'INTEGER' },
                            clarity: { type: 'INTEGER' },
                            overall: { type: 'INTEGER' },
                            strengths: { type: 'ARRAY', items: { type: 'STRING' } },
                            improvements: { type: 'ARRAY', items: { type: 'STRING' } }
                        }
                    },
                    feedback: { type: 'STRING' },
                    nextQuestion: { type: 'STRING' }
                }
            } : {
                type: 'OBJECT',
                properties: {
                    nextQuestion: { type: 'STRING' }
                }
            }
        }
      });

      const text = response.text || "{}";
      const result = JSON.parse(text);

      res.json(result);
    } catch (error: any) {
      console.error('AI API Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/interview/report', async (req, res) => {
    try {
      const { config, history } = req.body;
      
      let fullPrompt = `System: You are an expert AI Technical Interviewer.
Context: Interviewing for ${config.difficulty} ${config.job_role} at ${config.company}. Type: ${config.interview_type}.

The interview has concluded. Review the transcript and the per-answer evaluations, then provide a final comprehensive report.

Interview Transcript:
`;
      for (const msg of history) {
         fullPrompt += `${msg.role === 'ai' ? 'Interviewer' : 'Candidate'}: ${msg.text}\n`;
      }
      
      fullPrompt += `
Generate a final evaluation strictly in the following JSON format:
{
  "overallScore": 85,
  "technicalScore": 80,
  "communicationScore": 90,
  "problemSolvingScore": 85,
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "summary": "Overall summary of candidate's performance...",
  "preparationPlan": "Actionable steps to improve..."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: fullPrompt,
        config: {
            temperature: 0.7,
            responseMimeType: 'application/json',
            responseSchema: {
                type: 'OBJECT',
                properties: {
                    overallScore: { type: 'INTEGER' },
                    technicalScore: { type: 'INTEGER' },
                    communicationScore: { type: 'INTEGER' },
                    problemSolvingScore: { type: 'INTEGER' },
                    strengths: { type: 'ARRAY', items: { type: 'STRING' } },
                    weaknesses: { type: 'ARRAY', items: { type: 'STRING' } },
                    summary: { type: 'STRING' },
                    preparationPlan: { type: 'STRING' }
                }
            }
        }
      });

      const text = response.text || "{}";
      const result = JSON.parse(text);
      res.json(result);

    } catch (error: any) {
      console.error('AI Report API Error:', error);
      res.status(500).json({ error: error.message });
    }
  });


  
  // Proxy for dashboard_stats to bypass adblockers
  app.post('/api/user_overview', async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({error: 'Unauthorized'});
      
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: authHeader } }
      });

      let { data, error } = await supabase
        .from('dashboard_stats')
        .select('*')
        .eq('user_id', req.body.userId)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from('dashboard_stats')
          .insert([{ user_id: req.body.userId }])
          .select()
          .maybeSingle();
        if (insertError) {
           data = { user_id: req.body.userId };
        } else {
           data = newData;
        }
      }
      res.json(data);
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  });

  app.post('/api/user_overview/update', async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({error: 'Unauthorized'});
      
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: authHeader } }
      });

      const { data, error } = await supabase
        .from('dashboard_stats')
        .upsert({ user_id: req.body.userId, ...req.body.updates }, { onConflict: 'user_id' })
        .select()
        .single();
        
      if (error) throw error;
      res.json(data);
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
