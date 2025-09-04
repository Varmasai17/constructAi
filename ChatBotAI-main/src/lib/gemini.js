import axios from 'axios';

// Gemini API key - works in both Node.js and Vite/browser
let GEMINI_API_KEY =  'AIzaSyCw999aBsphGLevSk8Up68H_i8_WQoq_Fc';

/**
 * Calls Google's Gemini API as a fallback when open-source LLM fails
 * @param {string} prompt - The construction-related query
 * @returns {Promise<string|null>} - The Gemini response or null if failed
 */
export async function callGemini(prompt) {
  try {
    console.log('Gemini API called with prompt:', prompt.substring(0, 50) + '...');
    
    // Enhanced construction prompt that focuses on user's specific question
    const constructionPrompt = `You are a highly experienced construction industry expert and licensed professional engineer with 20+ years of experience in the Indian construction market. You have extensive knowledge of both Indian standards and international best practices. 

IMPORTANT: You MUST respond specifically to the user's question. Analyze their exact question and provide a detailed, contextual answer that directly addresses what they asked about.

**CRITICAL INSTRUCTIONS:**
1. READ the user's question carefully and understand what they specifically want to know
2. Provide a focused, detailed answer that directly addresses their question
3. Include relevant Indian standards, codes, and current market information
4. Use specific data, numbers, and practical examples relevant to their query
5. Format with clear sections and bullet points for readability
6. If they ask about costs, provide Indian Rupee amounts with current 2024-25 rates
7. If they ask about standards, reference specific IS codes and NBC requirements
8. Always provide practical, actionable information for Indian construction context

**YOUR EXPERTISE COVERS:**
- Structural & Civil Engineering (IS 456, IS 800, IS 1893, NBC 2016)
- Indian Construction Materials (Cement grades, TMT bars, regional aggregates)
- Cost Estimation & Rate Analysis (CPWD rates, current market prices in ₹)
- Safety & Compliance (BOCW Act, IS 14489, factory licensing)
- Project Management (Monsoon planning, labor management, scheduling)
- Building Systems (HVAC, electrical, plumbing for Indian climate)
- Green Building (IGBC, GRIHA certifications)

**REGIONAL EXPERTISE:**
- Mumbai/Coastal: Marine exposure, PPC cement, corrosion resistance
- Delhi/North: Seismic design, freeze-thaw considerations
- Bangalore/South: Climate-appropriate design, local materials
- Monsoon regions: Waterproofing, drainage, weather-resistant construction

**USER'S SPECIFIC QUESTION:**
${prompt}

**RESPOND WITH:**
A comprehensive, specific answer to their exact question with relevant Indian construction standards, current market rates, practical implementation guidance, and regional considerations. Be detailed and technical while remaining practical and actionable.`;

    console.log('Making Gemini API request...');
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: constructionPrompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log('Gemini API response status:', response.status);
    console.log('Gemini API response data:', response.data);

    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const result = response.data.candidates[0].content.parts[0].text.trim();
      console.log('Gemini response received, length:', result.length);
      return result;
    }

    console.log('No valid response from Gemini API');
    return null;
    
  } catch (error) {
    console.error('Gemini API call failed:', error);
    console.error('Error details:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Creates a construction-focused prompt for better AI responses
 * @param {string} userQuery - The user's original question
 * @returns {string} - Enhanced prompt with construction context
 */
export function createConstructionPrompt(userQuery) {
  return `As an expert Indian construction consultant, answer this specific question with detailed technical information, relevant IS codes, current market rates in Indian Rupees, and practical implementation guidance for Indian construction conditions:

Question: ${userQuery}`;
}
