import { isConstructionQuery } from './domainGuard.js';
import { callOpenSourceLLM, createConstructionPrompt } from './llm.js';
import { callGemini } from './gemini.js';

/**
 * Main chat service that handles user queries with domain restriction,
 * open-source LLM primary response, and Gemini fallback
 * @param {string} userMessage - The user's input message
 * @returns {Promise<Object>} - Response object with message and metadata
 */
export async function processChatMessage(userMessage) {
  try {
    // Step 1: Check if the query is construction-related
    console.log('Processing message:', userMessage);
    
    if (!isConstructionQuery(userMessage)) {
      return {
        response: "**Professional Construction Consultation Scope**\n\nI'm a specialized construction industry expert focused exclusively on providing professional-grade technical consultation for construction-related topics.\n\n## **MY AREAS OF EXPERTISE:**\n\n### 🏗️ **Structural & Civil Engineering**\n• Foundation design and geotechnical analysis\n• Load calculations and structural systems\n• Building codes and engineering standards\n\n### 📋 **Project Management & Estimation**\n• Construction scheduling and resource planning\n• Cost estimation and budget development\n• Contract administration and risk management\n\n### 🧱 **Materials & Specifications**\n• Building materials selection and properties\n• Quality control and testing standards\n• Sustainable construction practices\n\n### ⚠️ **Safety & Compliance**\n• OSHA regulations and safety protocols\n• Building codes and permit requirements\n• Environmental compliance standards\n\n### 🔧 **Construction Methods & Technology**\n• Modern construction techniques\n• Equipment selection and operations\n• BIM and construction technology\n\n### 🏛️ **Architecture & Building Systems**\n• HVAC, electrical, and plumbing systems\n• Building envelope and energy efficiency\n• Accessibility and design standards\n\n---\n\n**Please redirect your question to any construction industry topic.** I'm here to provide expert technical guidance, code compliance information, best practices, and professional recommendations.\n\n**Example Questions:**\n• \"What are the key factors in concrete mix design for a 30-story building?\"\n• \"How do I develop a CPM schedule for a commercial construction project?\"\n• \"What OSHA requirements apply to excavation work over 10 feet deep?\"\n• \"Compare foundation systems for high-rise construction in seismic zones\"",
        source: 'domain_restriction',
        timestamp: new Date().toISOString()
      };
    }

    // Step 2: Try open-source LLM first
    console.log('Query passed domain check, attempting to call open-source LLM...');
    const enhancedPrompt = createConstructionPrompt(userMessage);
    let response = await callOpenSourceLLM(enhancedPrompt);
    
    if (response && response.length > 20) {
      console.log('LLM response received:', response.substring(0, 100) + '...');
      return {
        response: response,
        source: 'open_source_llm',
        timestamp: new Date().toISOString()
      };
    }

    // Step 3: Fallback to Gemini API if LLM fails or response is insufficient
    console.log('Open-source LLM returned null/insufficient, trying Gemini API...');
    response = await callGemini(userMessage);
    
    console.log('Gemini API response:', response ? response.substring(0, 100) + '...' : 'null');
    
    if (response && response.length > 20) {
      return {
        response: response,
        source: 'gemini_fallback',
        timestamp: new Date().toISOString()
      };
    }

    // Step 4: Final fallback if both services fail
    return {
      response: "**Technical Consultation Request**\n\nI apologize, but I'm experiencing technical difficulties accessing my construction knowledge base at the moment. Let me help you refine your question for optimal results.\n\n## **PLEASE PROVIDE MORE SPECIFIC DETAILS:**\n\n### 📋 **For Project Questions:**\n• Project type, size, and location\n• Specific phase or system of interest\n• Applicable codes or standards\n\n### 🧱 **For Materials Questions:**\n• Application or use case\n• Environmental conditions\n• Performance requirements\n\n### ⚠️ **For Safety/Code Questions:**\n• Specific regulation or standard\n• Work environment or conditions\n• Equipment or systems involved\n\n### 💰 **For Cost/Estimation Questions:**\n• Project scope and location\n• Quality level and specifications\n• Timeline and market conditions\n\n---\n\n**SAMPLE DETAILED QUESTIONS:**\n• *\"What are the ACI 318 requirements for concrete mix design for a 20-story residential building in seismic zone D?\"*\n• *\"How do I calculate labor productivity rates for drywall installation in commercial construction?\"*\n• *\"What OSHA fall protection requirements apply to structural steel erection above 30 feet?\"*\n• *\"Compare lifecycle costs of different roofing systems for a 50,000 sf warehouse?\"*\n\nPlease rephrase your question with specific technical details, and I'll provide comprehensive professional guidance.",
      source: 'fallback_message',
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error processing chat message:', error);
    return {
      response: "I encountered an error while processing your question. Please try again, and make sure your question is related to construction topics.",
      source: 'error',
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
}

/**
 * Get a professional welcome message for new users
 * @returns {Object} - Welcome message object
 */
export function getWelcomeMessage() {
  return {
    response: "🏗️ **Welcome to ConstructBot Professional**\n\nI'm your expert AI construction consultant with comprehensive knowledge across all aspects of the construction industry. I provide professional-grade advice and technical expertise in:\n\n## **CORE SPECIALIZATIONS:**\n\n### 🏢 **Structural & Civil Engineering**\n• Structural design principles and load analysis\n• Foundation systems and geotechnical engineering\n• Building codes compliance (IBC, IRC, ACI, AISC)\n• Seismic design and wind load calculations\n\n### 🧱 **Building Materials & Specifications**\n• Material properties, selection, and specifications\n• Concrete technology and steel construction\n• Quality control standards and testing protocols\n• Sustainable materials and green building practices\n\n### 📊 **Project Management & Estimation**\n• CPM scheduling and resource planning\n• Detailed cost estimation and budget management\n• Contract administration and risk management\n• Value engineering and cost optimization\n\n### ⚠️ **Safety & Regulatory Compliance**\n• OSHA regulations and safety program development\n• Building codes and permit processes\n• Environmental compliance and sustainability\n• Quality assurance and inspection procedures\n\n### 🔧 **Construction Technology & Methods**\n• Modern construction techniques and equipment\n• BIM/CAD integration and digital workflows\n• Prefabrication and modular construction\n• Quality control and commissioning\n\n### 🏛️ **Architecture & Building Systems**\n• HVAC, electrical, and plumbing integration\n• Building envelope design and energy efficiency\n• Accessibility compliance (ADA)\n• Smart building technology and automation\n\n---\n\n**Ask me anything about construction!** I provide detailed, code-compliant responses with specific standards, cost considerations, and practical implementation guidance.\n\n**Professional Standards:** ACI • AISC • ASTM • OSHA • ICC • NECA • SMACNA",
    source: 'welcome',
    timestamp: new Date().toISOString()
  };
}
