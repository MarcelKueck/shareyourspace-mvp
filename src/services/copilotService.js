import { spaces } from '../data/spaces';
import { profiles } from '../data/profiles';

// Initial welcome messages from the copilot
export const getInitialMessages = () => {
  return [
    {
      id: 1,
      text: "Welcome to ShareYourSpace Copilot. I can help you find workspaces, make connections, and manage your bookings.",
      sender: 'copilot',
      timestamp: new Date().toISOString(),
    }
  ];
};

// Available commands for the command palette
export const availableCommands = [
  {
    command: '/book',
    description: 'Book a workspace',
    example: '/book Schwabing for tomorrow morning',
  },
  {
    command: '/find',
    description: 'Find a workspace',
    example: '/find quiet space with meeting rooms',
  },
  {
    command: '/match',
    description: 'Find business connections',
    example: '/match corporate partners in AI',
  },
  {
    command: '/help',
    description: 'Show available commands',
    example: '/help',
  },
  {
    command: '/clear',
    description: 'Clear conversation history',
    example: '/clear',
  }
];

// Context-aware suggestions based on current route
export const getContextSuggestions = (pathname) => {
  if (pathname === '/') {
    return [
      "Help me find a workspace",
      "How do I connect with corporate partners?",
      "What security features do you offer?"
    ];
  }
  
  if (pathname === '/explore') {
    return [
      "Find spaces in Schwabing",
      "Show me spaces with meeting rooms",
      "What's the average price per day?"
    ];
  }

  if (pathname.startsWith('/space/')) {
    const spaceId = parseInt(pathname.split('/').pop());
    const space = spaces.find(s => s.id === spaceId);
    
    if (space) {
      return [
        `Is ${space.name} available next week?`,
        `Book ${space.name} for tomorrow`,
        `Show me similar spaces to ${space.name}`
      ];
    }
  }
  
  if (pathname === '/match') {
    return [
      "Find corporate partners in fintech",
      "Connect me with innovation directors",
      "Show companies interested in AI"
    ];
  }
  
  if (pathname === '/dashboard') {
    return [
      "Show my upcoming bookings",
      "Reschedule my booking for tomorrow",
      "Add a meeting room to my reservation"
    ];
  }
  
  // Default suggestions if no specific context
  return [
    "Find a workspace",
    "Connect with partners",
    "Get help with booking"
  ];
};

// Mock responses based on user input keywords or commands
const mockResponses = [
  {
    keywords: ['book', 'reserve', 'schedule'],
    response: {
      text: "I'd be happy to help you book a workspace. Here are some options available:",
      cards: getRandomSpaces(2),
    }
  },
  {
    keywords: ['find', 'search', 'looking for', 'workspace', 'space'],
    response: {
      text: "Here are some workspaces that might be a good fit:",
      cards: getRandomSpaces(2),
    }
  },
  {
    keywords: ['connect', 'match', 'introduction', 'network'],
    response: {
      text: "I can help you connect with potential business partners. Here are some suggestions:",
      profiles: getRandomProfiles(2),
    }
  },
  {
    keywords: ['price', 'cost', 'expensive', 'pricing'],
    response: {
      text: "Our workspace pricing varies based on location, amenities, and duration. Most spaces range from €25-€50 per day per workstation, with discounts for longer bookings. Here are some options in different price ranges:",
      cards: [
        spaces.find(s => s.price <= 30),
        spaces.find(s => s.price >= 40)
      ],
    }
  },
  {
    keywords: ['security', 'compliance', 'data protection'],
    response: {
      text: "ShareYourSpace offers enterprise-grade security and compliance features that meet German data protection standards. All spaces include:",
      bulletPoints: [
        "GDPR-compliant data handling",
        "End-to-end encryption for all communications",
        "Physical access controls",
        "Optional NDA templates for all bookings"
      ]
    }
  },
  {
    keywords: ['help', 'commands', 'can you do'],
    response: {
      text: "I can help you with many tasks. Here are some things you can ask me:",
      commands: availableCommands,
    }
  }
];

// Command handlers
const commandHandlers = {
  book: (args) => {
    // Parse args for location, date, etc.
    return {
      text: `I've found some booking options based on "${args}":`,
      cards: getRandomSpaces(2),
      actions: [
        { label: "Book Now", action: "BOOK_SPACE", data: { spaceId: spaces[0].id } },
        { label: "More Options", action: "MORE_SPACES", data: {} }
      ]
    };
  },
  
  find: (args) => {
    return {
      text: `Here are spaces matching "${args}":`,
      cards: getRandomSpaces(3),
    };
  },
  
  match: (args) => {
    return {
      text: `I've found potential business connections matching "${args}":`,
      profiles: getRandomProfiles(2),
    };
  },
  
  help: () => {
    return {
      text: "Here are all available commands:",
      commands: availableCommands,
    };
  },
  
  clear: () => {
    return {
      text: "I've cleared our conversation history.",
      systemAction: "CLEAR_CONVERSATION"
    };
  }
};

// Helper to get random spaces for demo purposes
function getRandomSpaces(count) {
  const shuffled = [...spaces].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper to get random profiles for demo purposes
function getRandomProfiles(count) {
  const shuffled = [...profiles].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Default responses when no keywords match
const defaultResponses = [
  {
    text: "I'm here to help with finding workspace, booking, making business connections, or answering questions about ShareYourSpace. What would you like to know?"
  },
  {
    text: "I can assist with workspace bookings, business matching, or general questions. Could you provide more details about what you're looking for?"
  },
  {
    text: "I'd be happy to help. Could you tell me more specifically what you need assistance with, such as booking a space or finding business connections?"
  }
];

// Function to send a message and get a response
export const sendMessage = async (text, isCommand, currentPath) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
  
  // Handle commands
  if (isCommand && text.startsWith('/')) {
    const [command, ...args] = text.substring(1).split(' ');
    const handler = commandHandlers[command];
    
    if (handler) {
      return handler(args.join(' '));
    }
    
    return {
      text: `I don't recognize the command "${command}". Type /help to see available commands.`
    };
  }
  
  // Normal message processing
  const lowerText = text.toLowerCase();
  
  // Check for keyword matches
  for (const item of mockResponses) {
    if (item.keywords.some(keyword => lowerText.includes(keyword))) {
      return item.response;
    }
  }
  
  // Add contextual awareness based on current path
  if (currentPath && currentPath.startsWith('/space/')) {
    const spaceId = parseInt(currentPath.split('/').pop());
    const space = spaces.find(s => s.id === spaceId);
    
    if (space) {
      return {
        text: `I notice you're looking at ${space.name}. Would you like to know more about this space or book it for your team?`,
        cards: [space],
        actions: [
          { label: "Book Now", action: "BOOK_SPACE", data: { spaceId: space.id } },
          { label: "Show Similar", action: "SIMILAR_SPACES", data: { location: space.location } }
        ]
      };
    }
  }
  
  // If no keywords match, return a random default response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};