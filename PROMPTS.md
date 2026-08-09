# AI-Assisted Development Prompts

Here are the prompts used during the implementation of Problem Statement 2 (The Interview Agent):

1. **Initial Inspection Prompt:**
"Before making any changes, inspect my entire existing application. Do NOT modify anything yet. First identify: Existing frontend structure, routes, authentication, Mock Interview flow, Supabase integration, AI integrations... Then give me a concise implementation plan."

2. **Core Implementation Prompt:**
"I approve the implementation direction, with the following requirements and corrections.
IMPORTANT: Upgrade the EXISTING application. Do not rebuild the application from scratch.
Preserve: Existing React/Vite/TypeScript architecture, UI/styling, routes, authentication, Supabase project, interview_history table.
CORE HACKATHON REQUIREMENT: Build the interviewer, not the interview. The most important functionality must be a REAL ADAPTIVE AI INTERVIEWER.
Implement the loop: Candidate selects config -> AI generates question -> Candidate answers -> AI evaluates -> AI adapts next question -> repeat -> final AI evaluation.
1. AI QUESTION GENERATION: Use @google/genai. Generate dynamically based on context.
2. ANSWER EVALUATION: Evaluate correctness, relevance, completeness, technical knowledge, depth, clarity.
3. ADAPTIVE NEXT-QUESTION DECISION: Adapt based on performance.
4. INTERVIEW STATE: Maintain state for questions, answers, evaluations.
5. FINAL EVALUATION: Overall score, strengths, weaknesses, plan.
6. DATABASE: Reuse existing interview_history schema.
7. BACKEND / API SECURITY: Do not expose API keys. Use server-side endpoints.
8. TEXT INTERVIEW FIRST: Prioritize text-based.
9. EXISTING UI: Reuse MockInterviewWorkspace.tsx.
10. ERROR HANDLING: Handle failures gracefully.
...
Before finishing, provide a concise summary of the implementation."
