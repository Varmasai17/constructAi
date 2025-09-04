🏗️ ConstructBot Professional

AI-Powered Assistant for the Construction Industry

ConstructBot Professional is a specialized chatbot designed for civil engineers, architects, contractors, and construction managers.
It combines open-source LLMs with Google Gemini API fallback to deliver accurate, domain-restricted answers focused on construction practices, Indian building codes, and cost data.

✨ Key Features

Construction-Focused AI
Answers restricted to civil engineering, project management, materials, safety, cost estimation, and Indian standards.

Indian Standards Integration
Includes IS Codes, NBC guidelines, and local regulations for compliance.

Dual AI Model Support

Open-source LLM (configurable for Ollama, etc.)

Google Gemini API fallback for reliability.

Professional Chat Interface

ChatGPT-like design

Sidebar with conversation history

Markdown + code formatting

Mobile responsive

Market Expertise

Real-time construction material costs (India)

Cost estimation and budgeting guidance

📋 Example Use Cases

Materials & Properties:
“What are the types of concrete and their applications?”

Project Management:
“How do I prepare a construction project timeline?”

Safety & Regulations:
“What are the NBC fire safety requirements for high-rise buildings?”

Cost Estimation:
“Estimate brickwork cost for a 1000 sq.ft. project in Delhi.”

🛠️ Technology Stack

Frontend: React 18 + Vite

Styling: Pure CSS (lightweight, responsive)

AI Layer:

Open-source LLMs (Ollama, LLaMA, etc.)

Google Gemini API (fallback)

Markdown Rendering: react-markdown

HTTP Client: Axios

Deployment: Vercel (CDN, auto-builds)

📂 Project Structure
src/
├── components/          # Chat UI components
│   ├── ChatWindow.jsx   # Main conversation area
│   ├── ChatSidebar.jsx  # Conversation history
│   └── ChatInput.jsx    # User input field
├── lib/                 # Core services
│   ├── gemini.js        # Gemini API integration
│   ├── llm.js           # Open-source LLM service
│   ├── chatService.js   # Chat orchestration
│   └── domainGuard.js   # Construction domain validation
└── App.jsx              # Root application

🚀 Getting Started
1. Clone & Install
git clone <your-repo-url>
cd constructbot
npm install

2. Configure Environment Variables

Create .env in project root:

VITE_GEMINI_API_KEY=your_api_key_here
VITE_APP_NAME=ConstructBot Professional
VITE_ENVIRONMENT=production

3. Run Development Server
npm run dev


Open → http://localhost:5173

🌐 Deployment (Vercel)
Option A: Vercel CLI
npm install -g vercel
vercel login
vercel

Option B: Vercel Dashboard

Push repo to GitHub

Import into Vercel

Add environment variables (VITE_GEMINI_API_KEY, etc.)

Deploy 🚀

🔒 Security

API keys stored securely in environment variables

Domain guard ensures construction-only responses

CORS & security headers enabled

No sensitive user data stored

📊 Optimizations

Code splitting for faster loading

Gzip compression

Global CDN via Vercel

Source maps for debugging

🛠️ Troubleshooting

API Key Issues

Check VITE_GEMINI_API_KEY spelling

Ensure Google Cloud Console permissions

Build Errors

Run npm run build locally

Verify imports & dependencies

Routing Problems

Check vercel.json for SPA configuration

🤝 Contributing

Fork this repo

Create a feature branch → git checkout -b feature/new-feature

Commit → git commit -m "Add new feature"

Push → git push origin feature/new-feature

Submit Pull Request

❤️ Built for the Construction Industry

Helping professionals with better decisions, safer projects, and cost efficiency.

