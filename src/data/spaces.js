export const spaces = [
  {
    id: 1,
    name: "BMW Innovation Hub",
    description: "Modern innovation space from BMW Group, ideal for tech startups and collaborative projects. Features flexible workstations, meeting rooms with video conferencing, and a creative workshop area.",
    location: "Schwabing, Munich",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true,
    amenities: ["High-speed internet", "Meeting rooms", "Coffee bar", "24/7 access", "Workshop area"],
    price: 35,
    priceUnit: "per day / workstation",
    size: 150,
    capacity: 20,
    provider: {
      name: "BMW Group",
      type: "Corporate",
      verified: true
    },
    availability: [
      { day: "Monday", slots: ["Morning", "Afternoon"] },
      { day: "Tuesday", slots: ["Morning", "Afternoon"] },
      { day: "Wednesday", slots: ["Morning"] },
      { day: "Thursday", slots: ["Morning", "Afternoon"] },
      { day: "Friday", slots: ["Morning", "Afternoon"] },
    ],
    compliance: {
      dataProtection: true,
      nda: true,
      ipProtection: true
    }
  },
  {
    id: 2,
    name: "Siemens Future Lab",
    description: "Collaborative workspace hosted by Siemens, equipped with cutting-edge technology and designed for innovation teams working on digital transformation projects.",
    location: "Maxvorstadt, Munich",
    imageUrl: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true,
    amenities: ["Smart office tech", "Prototyping tools", "Conference rooms", "Lounge area", "Parking"],
    price: 45,
    priceUnit: "per day / workstation",
    size: 200,
    capacity: 30,
    provider: {
      name: "Siemens AG",
      type: "Corporate",
      verified: true
    },
    availability: [
      { day: "Monday", slots: ["Afternoon"] },
      { day: "Tuesday", slots: ["Morning", "Afternoon"] },
      { day: "Wednesday", slots: ["Morning", "Afternoon"] },
      { day: "Thursday", slots: ["Morning", "Afternoon"] },
      { day: "Friday", slots: ["Morning"] },
    ],
    compliance: {
      dataProtection: true,
      nda: true,
      ipProtection: true
    }
  },
  {
    id: 3,
    name: "Allianz Digital Workspace",
    description: "Premium office environment in Allianz headquarters perfect for fintech startups and insurance innovators. Private meeting spaces and financial data access available.",
    location: "Schwabing, Munich",
    imageUrl: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true,
    amenities: ["Secure data access", "Private offices", "Premium catering", "Financial library", "Investment team access"],
    price: 50,
    priceUnit: "per day / workstation",
    size: 180,
    capacity: 25,
    provider: {
      name: "Allianz SE",
      type: "Corporate",
      verified: true
    },
    availability: [
      { day: "Monday", slots: ["Morning", "Afternoon"] },
      { day: "Tuesday", slots: ["Morning", "Afternoon"] },
      { day: "Wednesday", slots: ["Morning", "Afternoon"] },
      { day: "Thursday", slots: ["Morning"] },
      { day: "Friday", slots: ["Morning"] },
    ],
    compliance: {
      dataProtection: true,
      nda: true,
      ipProtection: true,
      financialCompliance: true
    }
  },
  {
    id: 4,
    name: "TechLab Munich",
    description: "Startup-friendly shared office with a tech focus. Perfect for early-stage B2B SaaS teams looking for flexible space in a vibrant community.",
    location: "Maxvorstadt, Munich",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false,
    amenities: ["Startup community", "Pitch area", "Networking events", "Kitchen", "Bike storage"],
    price: 25,
    priceUnit: "per day / workstation",
    size: 120,
    capacity: 15,
    provider: {
      name: "Munich Tech Hub",
      type: "Startup Incubator",
      verified: true
    },
    availability: [
      { day: "Monday", slots: ["Morning", "Afternoon"] },
      { day: "Tuesday", slots: ["Morning", "Afternoon"] },
      { day: "Wednesday", slots: ["Morning", "Afternoon"] },
      { day: "Thursday", slots: ["Morning", "Afternoon"] },
      { day: "Friday", slots: ["Morning", "Afternoon"] },
    ],
    compliance: {
      dataProtection: true,
      nda: true
    }
  },
  {
    id: 5,
    name: "Enterprise Innovation Center",
    description: "Corporate-grade workspace with enterprise security and professional meeting facilities. Ideal for B2B startups hosting client meetings or working on sensitive projects.",
    location: "Bogenhausen, Munich",
    imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false,
    amenities: ["Enterprise security", "Client meeting rooms", "Presentation equipment", "Receptionist service", "Catering options"],
    price: 40,
    priceUnit: "per day / workstation",
    size: 250,
    capacity: 35,
    provider: {
      name: "Munich Business Center",
      type: "Professional Services",
      verified: true
    },
    availability: [
      { day: "Monday", slots: ["Morning", "Afternoon"] },
      { day: "Tuesday", slots: ["Morning", "Afternoon"] },
      { day: "Wednesday", slots: ["Morning", "Afternoon"] },
      { day: "Thursday", slots: ["Morning", "Afternoon"] },
      { day: "Friday", slots: ["Morning", "Afternoon"] },
    ],
    compliance: {
      dataProtection: true,
      nda: true,
      ipProtection: true,
      iso27001: true
    }
  },
  {
    id: 6,
    name: "MunichTech Campus",
    description: "Academic-industry collaboration space hosted at Technical University Munich. Excellent for deep tech startups requiring research facilities and academic partnerships.",
    location: "Garching, Munich",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false,
    amenities: ["Research lab access", "Academic network", "High-performance computing", "Technical library", "Student talent"],
    price: 30,
    priceUnit: "per day / workstation",
    size: 300,
    capacity: 40,
    provider: {
      name: "TU Munich",
      type: "Academic",
      verified: true
    },
    availability: [
      { day: "Monday", slots: ["Morning", "Afternoon"] },
      { day: "Tuesday", slots: ["Morning", "Afternoon"] },
      { day: "Wednesday", slots: ["Morning", "Afternoon"] },
      { day: "Thursday", slots: ["Morning", "Afternoon"] },
      { day: "Friday", slots: ["Morning", "Afternoon"] },
    ],
    compliance: {
      dataProtection: true,
      nda: true,
      researchEthics: true
    }
  }
];