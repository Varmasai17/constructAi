# ConstructBot - Construction Industry AI Chatbot

A ChatGPT-like interface specifically designed for the construction industry, powered by open-source LLMs with# ConstructBot Professional - AI Construction Industry Assistant

A professional AI-powered chatbot specialized in construction industry consultation, featuring Indian construction standards, building codes, and market expertise.

## 🏗️ Features

- **AI-Powered Responses**: Uses Google Gemini API for intelligent, contextual answers
- **Construction Industry Focus**: Specialized knowledge in civil engineering, project management, safety, and materials
- **Indian Standards Integration**: Comprehensive knowledge of IS codes, NBC requirements, and local regulations
- **Professional Interface**: ChatGPT-like interface optimized for construction professionals
- **Persistent User Preferences**: Remembers user settings across sessions
- **Real-time Cost Data**: Current Indian market rates and pricing information

## 🚀 Deployment on Vercel

### Prerequisites
- Node.js 18+ installed
- Vercel account
- Google Gemini API key

### Step 1: Clone and Setup
```bash
git clone [your-repo-url]
cd chatbot
npm install
```

### Step 2: Environment Configuration
1. Create a `.env.production` file in the root directory
2. Add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### Step 3: Build and Test Locally
```bash
npm run build
npm run preview
```

### Step 4: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables in Vercel dashboard:
   - Add `VITE_GEMINI_API_KEY` with your API key
4. Deploy

### Step 5: Configure Environment Variables in Vercel
1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `VITE_GEMINI_API_KEY`: Your Google Gemini API key
   - `VITE_APP_NAME`: "ConstructBot Professional"
   - `VITE_ENVIRONMENT`: "production"

## 🔧 Configuration Files

### vercel.json
- Configures Vercel deployment settings
- Sets up SPA routing for React application
- Optimizes build process

### vite.config.js
- Production build optimizations
- Code splitting for better performance
- Source maps for debugging

## 🏗️ Architecture

```
src/
├── components/          # React components
│   ├── ChatWindow.jsx   # Main chat interface
│   ├── ChatSidebar.jsx  # Conversation history
│   └── ChatInput.jsx    # Message input component
├── lib/                 # Core services
│   ├── gemini.js        # Google Gemini API integration
│   ├── llm.js           # Local LLM service (fallback)
│   ├── chatService.js   # Main chat orchestration
│   └── domainGuard.js   # Construction domain validation
└── App.jsx              # Main application component
```

## 🔒 Security Considerations

- API keys are stored as environment variables
- Client-side domain validation prevents misuse
- CORS and security headers configured for production
- No sensitive data stored in localStorage

## 🎯 Production Optimizations

- **Code Splitting**: Vendor chunks for better caching
- **Compression**: Gzip compression enabled
- **CDN**: Vercel's global CDN for fast loading
- **Source Maps**: Available for debugging production issues

## 📋 Pre-Deployment Checklist

- [ ] Environment variables configured in Vercel
- [ ] Build process tested locally (`npm run build`)
- [ ] API integrations working in production environment
- [ ] Domain validation properly filtering queries
- [ ] Error handling and fallbacks implemented
- [ ] Performance optimizations applied

## 🛠️ Troubleshooting

### Common Issues:

1. **API Key Not Working**
   - Verify environment variable name: `VITE_GEMINI_API_KEY`
   - Check API key permissions in Google Cloud Console

2. **Build Failures**
   - Run `npm run build` locally to identify issues
   - Check for missing dependencies or import errors

3. **Routing Issues**
   - Ensure `vercel.json` is properly configured
   - Verify SPA routing settings

## 📞 Support

For technical support or questions about construction industry features, refer to the in-app help or example questions.

## 🔄 Updates

The application automatically updates when deployed through Vercel. Check the Vercel dashboard for deployment status and logs.i API fallback.

## 🏗️ Features

- **Domain-Restricted AI**: Only answers construction industry related questions
- **Dual AI Model Support**: Primary open-source LLM with Google Gemini fallback
- **Modern Chat Interface**: Clean, responsive UI similar to ChatGPT
- **Conversation History**: Sidebar with persistent chat sessions
- **Markdown Support**: Rich formatting for technical responses
- **Mobile Responsive**: Works on all device sizes
- **Real-time Typing Indicators**: Visual feedback during response generation

## 🚀 Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Pure CSS with modern features
- **AI Integration**: 
  - Open-source LLMs (configurable for Ollama, etc.)
  - Google Gemini API (fallback)
- **Markdown Rendering**: react-markdown
- **HTTP Client**: Axios

## 📋 Construction Topics Covered

- Civil Engineering & Structural Design
- Building Materials & Properties
- Construction Project Management
- Safety Regulations & Protocols
- Cost Estimation & Budgeting
- Architecture & Building Codes
- Construction Equipment & Techniques
- Quality Control & Inspections
- HVAC, Electrical, and Plumbing Systems
- Site Planning & Surveying

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure AI Services:**
   
   **For Open-source LLM (Ollama example):**
   - Install Ollama: https://ollama.ai/
   - Pull a model: `ollama pull llama3`
   - Start Ollama service: `ollama serve`
   - Update the LLM endpoint in `src/lib/llm.js` if needed

   **For Gemini API:**
   - The API key is already configured in `src/lib/gemini.js`
   - Replace with your own key if needed

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

## 🔧 Configuration

### Switching LLM Models

To use a different open-source LLM, modify `src/lib/llm.js`:

```javascript
// Example for different API endpoints
const response = await axios.post('YOUR_LLM_ENDPOINT', {
  model: 'your-model-name',
  prompt: enhancedPrompt,
  // ... other parameters
});
```

### Updating Domain Keywords

Add more construction-related keywords in `src/lib/domainGuard.js`:

```javascript
const constructionKeywords = [
  // ... existing keywords
  "your-new-keyword",
  "another-construction-term"
];
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ChatSidebar.jsx  # Conversation history sidebar
│   ├── ChatWindow.jsx   # Main chat display area
│   ├── ChatInput.jsx    # Message input component
│   └── *.css           # Component styles
├── lib/                 # Utility libraries
│   ├── chatService.js   # Main chat orchestration
│   ├── domainGuard.js   # Construction domain validation
│   ├── llm.js          # Open-source LLM integration
│   └── gemini.js       # Google Gemini API integration
├── App.jsx             # Main application component
├── App.css             # Application styles
├── index.css           # Global styles
└── main.jsx            # Application entry point
```

## 🎯 Usage Examples

**Ask about materials:**
- "What are the different types of concrete and their applications?"
- "Compare steel vs. aluminum for structural framing"

**Project management questions:**
- "How do I create a construction project timeline?"
- "What are the key phases of construction project management?"

**Safety inquiries:**
- "What safety equipment is required on a construction site?"
- "Explain OSHA regulations for excavation work"

**Cost estimation:**
- "How do I estimate material costs for a residential project?"
- "What factors affect construction labor costs?"

## 🔒 Domain Restriction

The chatbot automatically detects and restricts responses to construction-related topics. If a user asks about non-construction topics, it will politely redirect them back to construction industry questions.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel/Netlify

1. Build the project
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for API keys if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

---

**Built with ❤️ for the construction industry**te

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
