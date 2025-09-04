// Comprehensive domain restriction logic for Indian construction industry topics
const constructionKeywords = [
  // Core Construction Terms
  "construction", "building", "contractor", "subcontractor", "general contractor",
  "construction management", "project management", "site management", "construction site",
  
  // Engineering & Architecture
  "civil engineering", "structural engineering", "architecture", "architectural design",
  "structural design", "engineering drawings", "blueprints", "CAD", "AutoCAD", "BIM",
  "building information modeling", "3D modeling", "design specifications",
  
  // Indian Standards & Codes
  "IS code", "IS 456", "IS 800", "IS 1893", "IS 875", "IS 10262", "IS 383", "IS 2062",
  "NBC", "National Building Code", "BIS", "Bureau of Indian Standards", "CPWD", "PWD",
  "IGBC", "GRIHA", "LEED India", "building bylaws", "development control rules",
  
  // Building Materials & Properties (Indian Context)
  "concrete", "steel", "rebar", "TMT bars", "reinforcement", "cement", "OPC", "PPC",
  "mortar", "aggregate", "sand", "coarse aggregate", "fine aggregate",
  "lumber", "wood", "timber", "teak", "sal", "deodar", "framing", "drywall", "gypsum",
  "insulation", "roofing", "tiles", "flooring", "foundation", "masonry", "brick",
  "stone", "glass", "aluminum", "copper", "piping", "plumbing", "electrical",
  "wiring", "HVAC", "ductwork", "ventilation", "air conditioning", "heating",
  
  // Safety & Regulations (Indian Context)
  "safety", "construction safety", "safety regulations", "safety equipment", "hard hat",
  "safety vest", "fall protection", "scaffolding", "harness", "safety protocols",
  "workplace safety", "hazard", "risk assessment", "BOCW act", "factories act",
  "contract labour act", "environmental clearance", "pollution control board",
  
  // Construction Techniques & Equipment
  "excavation", "grading", "demolition", "renovation", "remodeling", "framing",
  "carpentry", "masonry", "welding", "soldering", "painting", "finishing",
  "crane", "bulldozer", "excavator", "backhoe", "loader", "dump truck",
  "heavy machinery", "equipment", "tools", "power tools", "hand tools",
  "ready mix concrete", "precast", "prefabrication",
  
  // Project Management & Estimation (Indian Context)
  "cost estimation", "budget", "bidding", "tender", "proposal", "contract", "schedule",
  "timeline", "critical path", "gantt chart", "milestone", "deliverable",
  "resource planning", "labor", "workforce", "productivity", "efficiency",
  "rate analysis", "CPWD rates", "PWD rates", "BOQ", "bill of quantities",
  "GST", "goods and services tax", "VAT", "material rates",
  
  // Specialized Areas (Indian Context)
  "geotechnical", "soil", "foundation design", "load bearing", "structural load",
  "seismic", "earthquake", "seismic zone", "wind load", "monsoon", "waterproofing",
  "drainage", "utilities", "infrastructure", "bridge", "tunnel", "road", "highway",
  "pavement", "residential", "commercial", "industrial", "institutional",
  "green building", "sustainable construction", "energy efficiency",
  
  // Regional & Climate Specific
  "tropical climate", "monsoon construction", "coastal construction", "CRZ",
  "coastal regulation zone", "earthquake resistant", "cyclone resistant",
  "flood resistant", "thermal comfort", "natural ventilation",
  
  // Indian Construction Practices
  "mason", "mistri", "mazdoor", "skilled labor", "unskilled labor", "gang work",
  "piece rate", "daily wage", "material handling", "material storage",
  "site supervision", "quality control", "quality assurance",
  
  // Processes & Standards
  "surveying", "site preparation", "layout", "staking", "elevation", "grade",
  "specification", "standard", "code compliance", "building permit", "approval",
  "environmental impact", "sustainability", "waste management", "recycling",
  "municipal corporation", "town planning", "urban development"
];

/**
 * Checks if a query is related to construction industry topics
 * @param {string} query - The user's input query
 * @returns {boolean} - True if query is construction-related, false otherwise
 */
export function isConstructionQuery(query) {
  if (!query || typeof query !== 'string') {
    return false;
  }
  
  const lowerQuery = query.toLowerCase();
  
  // Check for direct keyword matches
  const hasKeyword = constructionKeywords.some(keyword => 
    lowerQuery.includes(keyword.toLowerCase())
  );
  
  // Additional patterns that might indicate construction topics
  const constructionPatterns = [
    /build\w*/,
    /construct\w*/,
    /engineer\w*/,
    /design\w*/,
    /architect\w*/,
    /project\s+manag\w*/,
    /cost\s+estimat\w*/,
    /safety\s+regulat\w*/
  ];
  
  const hasPattern = constructionPatterns.some(pattern => 
    pattern.test(lowerQuery)
  );
  
  return hasKeyword || hasPattern;
}
