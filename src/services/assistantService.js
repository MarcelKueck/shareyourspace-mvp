// Initial welcome messages from the assistant
export const getInitialMessages = () => {
  return [
    {
      id: 1,
      text: "Hello! I'm the ShareYourSpace Assistant. I can help you find and book workspaces, make connections with business partners, or answer questions about our platform.",
      sender: 'assistant',
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      text: "How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date().toISOString(),
    },
  ];
};

// Mock responses based on user input keywords
const mockResponses = [
  {
    keywords: ['book', 'reserve', 'schedule'],
    response: "I'd be happy to help you book a workspace. Could you tell me what area you're interested in, when you need the space, and how many people it should accommodate?",
  },
  {
    keywords: ['find', 'search', 'looking for', 'workspace', 'space'],
    response: "I can help you find the perfect workspace. Are you looking for a short-term space for a meeting, or something longer-term for your team?",
  },
  {
    keywords: ['connect', 'match', 'introduction', 'network'],
    response: "Our InnovationMatch feature can help you connect with potential business partners. Would you like me to help you set up your profile or search for specific types of connections?",
  },
  {
    keywords: ['price', 'cost', 'expensive', 'pricing'],
    response: "Our workspace pricing varies based on location, amenities, and duration. Most spaces range from €25-€50 per day per workstation, with discounts for longer bookings. Can I help you find options in a specific price range?",
  },
  {
    keywords: ['corporate', 'compliance', 'security', 'enterprise'],
    response: "ShareYourSpace offers enterprise-grade security and compliance features that meet German data protection standards. Would you like me to explain our specific compliance certifications and security measures?",
  },
  {
    keywords: ['amenities', 'features', 'facility', 'facilities'],
    response: "Our workspaces offer various amenities including high-speed internet, meeting rooms, coffee bars, and more. Many spaces also have specialized features like workshop areas or prototyping tools. What specific amenities are you looking for?",
  },
  {
    keywords: ['location', 'area', 'district', 'munich'],
    response: "We have spaces available in several Munich districts, including Schwabing, Maxvorstadt, and Bogenhausen. Each area has its own unique advantages. Which part of Munich are you interested in?",
  },
  {
    keywords: ['cancel', 'reschedule', 'modify', 'booking'],
    response: "I can help you manage your existing bookings. Would you like to cancel, reschedule, or modify a current reservation? Please let me know which booking you'd like to change.",
  },
  {
    keywords: ['help', 'support', 'contact'],
    response: "I'm here to help! You can ask me questions about finding spaces, making bookings, or connecting with partners. If you need specialized support, I can connect you with our customer service team.",
  },
];

// Default responses when no keywords match
const defaultResponses = [
  "I'm here to help with finding workspace, booking, making business connections, or answering questions about ShareYourSpace. What would you like to know?",
  "I can assist with workspace bookings, business matching, or general questions. Could you provide more details about what you're looking for?",
  "I'd be happy to help. Could you tell me more specifically what you need assistance with, such as booking a space or finding business connections?",
];

// Function to send a message and get a response
export const sendMessage = async (text) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Convert to lowercase for matching
  const lowerText = text.toLowerCase();
  
  // Check for keyword matches
  for (const item of mockResponses) {
    if (item.keywords.some(keyword => lowerText.includes(keyword))) {
      return item.response;
    }
  }
  
  // If no keywords match, return a random default response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};