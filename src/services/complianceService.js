/**
 * Compliance Verification Service
 * 
 * Handles all compliance-related functionality including verification processes,
 * document validation, compliance status tracking, and certification management.
 */

// Compliance standards with detailed descriptions and requirements
export const complianceStandards = {
  dataProtection: {
    id: 'dataProtection',
    name: 'German Data Protection',
    description: 'Compliance with German implementation of GDPR (DSGVO) and additional German data protection requirements.',
    icon: 'shield-check',
    verificationLevels: ['self-declared', 'documented', 'verified', 'certified'],
    requirements: [
      'Data Processing Agreement (DPA) in place',
      'Privacy Policy compliant with DSGVO',
      'Data minimization and purpose limitation',
      'Technical and organizational measures documented',
      'Privacy impact assessment',
      'Data breach notification process'
    ],
    documentationRequired: ['Privacy Policy', 'Data Processing Agreement', 'Technical Measures Description']
  },
  nda: {
    id: 'nda',
    name: 'NDA Support',
    description: 'Non-disclosure agreement templates and processes for protecting confidential information.',
    icon: 'document-text',
    verificationLevels: ['self-declared', 'documented', 'verified'],
    requirements: [
      'Standard NDA templates available',
      'NDA signing process defined',
      'Confidentiality breach reporting process',
      'Visitor logging and tracking procedures'
    ],
    documentationRequired: ['NDA Template', 'Confidentiality Process Document']
  },
  ipProtection: {
    id: 'ipProtection',
    name: 'IP Protection Measures',
    description: 'Enhanced intellectual property protection protocols for innovation and development activities.',
    icon: 'lock-closed',
    verificationLevels: ['self-declared', 'documented', 'verified', 'certified'],
    requirements: [
      'Intellectual property policy',
      'Workspace segmentation protocols',
      'Controlled access to sensitive areas',
      'Device security policies',
      'Clean desk policy enforcement'
    ],
    documentationRequired: ['IP Protection Policy', 'Access Control Procedures']
  },
  iso27001: {
    id: 'iso27001',
    name: 'ISO 27001 Compliance',
    description: 'Adherence to information security management standards per ISO/IEC 27001.',
    icon: 'badge-check',
    verificationLevels: ['self-declared', 'documented', 'verified', 'certified'],
    requirements: [
      'Information security management system',
      'Risk assessment and treatment',
      'Security awareness training',
      'Asset management',
      'Access control',
      'Cryptography',
      'Physical and environmental security',
      'Operations security',
      'Communications security'
    ],
    documentationRequired: ['ISO 27001 Certificate', 'ISMS Documentation', 'Last Audit Report']
  },
  physicalSecurity: {
    id: 'physicalSecurity',
    name: 'Physical Security',
    description: 'Comprehensive physical security measures to protect premises, assets, and information.',
    icon: 'office-building',
    verificationLevels: ['self-declared', 'documented', 'verified'],
    requirements: [
      'Access control systems',
      'Surveillance systems',
      'Visitor management',
      'Alarm systems',
      'Security personnel'
    ],
    documentationRequired: ['Physical Security Policy', 'Access Control System Documentation']
  },
  networkSecurity: {
    id: 'networkSecurity',
    name: 'Network Security',
    description: 'Enterprise-grade network security measures ensuring data protection and secure communications.',
    icon: 'wifi',
    verificationLevels: ['self-declared', 'documented', 'verified', 'certified'],
    requirements: [
      'Firewall protection',
      'Network segmentation',
      'Intrusion detection/prevention',
      'Secure WiFi with enterprise encryption',
      'Regular network security assessments',
      'VPN availability'
    ],
    documentationRequired: ['Network Security Configuration', 'Last Security Assessment Report']
  },
  financialCompliance: {
    id: 'financialCompliance',
    name: 'Financial Services Compliance',
    description: 'Additional compliance measures for financial services regulatory requirements.',
    icon: 'currency-euro',
    verificationLevels: ['self-declared', 'documented', 'verified', 'certified'],
    requirements: [
      'BaFin compliance measures',
      'Financial data handling protocols',
      'Clean room environments',
      'Additional access restrictions',
      'Financial services audit readiness'
    ],
    documentationRequired: ['Financial Services Compliance Statement', 'Clean Room Protocol']
  },
  researchEthics: {
    id: 'researchEthics',
    name: 'Research Ethics Framework',
    description: 'Ethical frameworks for research and development activities in the workspace.',
    icon: 'academic-cap',
    verificationLevels: ['self-declared', 'documented', 'verified'],
    requirements: [
      'Ethics committee availability',
      'Research protocols documentation',
      'Informed consent processes',
      'Data anonymization capabilities',
      'Research ethics training'
    ],
    documentationRequired: ['Research Ethics Policy', 'Ethics Committee Structure']
  }
};

// Verification levels with descriptions
export const verificationLevels = {
  'self-declared': {
    name: 'Self-Declared',
    description: 'Provider has declared compliance without formal verification.',
    icon: 'clipboard-list',
    color: 'yellow'
  },
  'documented': {
    name: 'Documented',
    description: 'Provider has submitted documentation supporting compliance claims, awaiting verification.',
    icon: 'document-text',
    color: 'blue'
  },
  'verified': {
    name: 'Verified',
    description: 'ShareYourSpace has verified the compliance through document review and on-site assessment.',
    icon: 'check-circle',
    color: 'green'
  },
  'certified': {
    name: 'Certified',
    description: 'Compliance has been certified by an accredited third-party auditor.',
    icon: 'badge-check',
    color: 'purple'
  }
};

/**
 * Get compliance level details for a specific standard and level
 * @param {string} standardId - The compliance standard ID
 * @param {string} level - The verification level
 * @returns {object} - Details about the verification level
 */
export const getComplianceLevelDetails = (standardId, level) => {
  const standard = complianceStandards[standardId];
  const levelDetails = verificationLevels[level];
  
  if (!standard || !levelDetails) {
    return null;
  }
  
  return {
    ...levelDetails,
    standard: standard.name,
    requirements: standard.requirements
  };
};

/**
 * Get verification status details for a space
 * @param {object} space - The space object
 * @returns {object} - Detailed compliance verification status
 */
export const getSpaceVerificationStatus = (space) => {
  if (!space || !space.compliance) {
    return {};
  }
  
  const result = {};
  
  // Process each compliance standard the space claims
  Object.keys(space.compliance).forEach(standardId => {
    if (typeof space.compliance[standardId] === 'object') {
      // If it's an object, it has detailed compliance info
      result[standardId] = {
        ...space.compliance[standardId],
        details: complianceStandards[standardId] || null
      };
    } else if (space.compliance[standardId] === true) {
      // If it's just true, assume it's self-declared
      result[standardId] = {
        level: 'self-declared',
        verifiedDate: null,
        verifiedBy: null,
        documents: [],
        details: complianceStandards[standardId] || null
      };
    }
  });
  
  return result;
};

/**
 * Calculate compliance score for a space
 * @param {object} space - The space object
 * @returns {number} - Compliance score from 0-100
 */
export const calculateComplianceScore = (space) => {
  if (!space || !space.compliance) {
    return 0;
  }
  
  // Weights for different verification levels
  const levelWeights = {
    'self-declared': 0.25,
    'documented': 0.5,
    'verified': 0.75,
    'certified': 1.0
  };
  
  // Weights for different standards (out of 100 total points)
  const standardWeights = {
    dataProtection: 25,
    iso27001: 20,
    networkSecurity: 15,
    physicalSecurity: 15,
    ipProtection: 10,
    nda: 5,
    financialCompliance: 5,
    researchEthics: 5
  };
  
  let totalScore = 0;
  let availablePoints = 0;
  
  // Process each compliance standard
  Object.keys(standardWeights).forEach(standardId => {
    availablePoints += standardWeights[standardId];
    
    if (!space.compliance[standardId]) {
      return; // Skip if standard not implemented
    }
    
    // Get the verification level
    let level = 'self-declared';
    if (typeof space.compliance[standardId] === 'object' && space.compliance[standardId].level) {
      level = space.compliance[standardId].level;
    }
    
    // Add weighted score
    totalScore += standardWeights[standardId] * levelWeights[level];
  });
  
  // Convert to percentage of available points
  return Math.round((totalScore / availablePoints) * 100);
};

/**
 * Get a list of all missing compliance standards for a space
 * @param {object} space - The space object
 * @returns {array} - Array of missing compliance standards
 */
export const getMissingCompliance = (space) => {
  if (!space || !space.compliance) {
    return Object.keys(complianceStandards);
  }
  
  return Object.keys(complianceStandards).filter(
    standardId => !space.compliance[standardId]
  );
};

/**
 * Validate if a space meets minimum compliance requirements
 * @param {object} space - The space object
 * @param {array} requiredStandards - Array of required standard IDs
 * @returns {object} - Validation result with status and message
 */
export const validateMinimumCompliance = (space, requiredStandards = ['dataProtection', 'nda']) => {
  if (!space || !space.compliance) {
    return {
      valid: false,
      message: 'No compliance information available'
    };
  }
  
  const missing = requiredStandards.filter(standardId => !space.compliance[standardId]);
  
  if (missing.length > 0) {
    return {
      valid: false,
      message: `Missing required compliance standards: ${missing.map(id => complianceStandards[id]?.name || id).join(', ')}`,
      missing
    };
  }
  
  return {
    valid: true,
    message: 'Space meets minimum compliance requirements'
  };
};

/**
 * Get required documents for specific compliance standards
 * @param {array} standardIds - Array of compliance standard IDs
 * @returns {array} - Array of required documents
 */
export const getRequiredDocuments = (standardIds) => {
  let documents = [];
  
  standardIds.forEach(standardId => {
    const standard = complianceStandards[standardId];
    if (standard && standard.documentationRequired) {
      documents = [...documents, ...standard.documentationRequired];
    }
  });
  
  // Remove duplicates
  return [...new Set(documents)];
};

/**
 * Mock function to simulate verification process
 * @param {string} spaceId - The space ID
 * @param {string} standardId - The compliance standard ID
 * @param {array} documents - Array of document objects
 * @returns {Promise} - Promise that resolves to verification result
 */
export const initiateVerification = async (spaceId, standardId, documents) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Verification process initiated for ${complianceStandards[standardId]?.name || standardId}`,
        estimatedCompletionDays: 5,
        referenceNumber: `VER-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      });
    }, 1000);
  });
};

/**
 * Get all spaces that meet specific compliance criteria
 * @param {array} spaces - Array of space objects
 * @param {object} criteria - Object with compliance criteria
 * @returns {array} - Filtered array of spaces
 */
export const filterSpacesByCompliance = (spaces, criteria) => {
  if (!spaces || !criteria) {
    return spaces;
  }
  
  return spaces.filter(space => {
    if (!space.compliance) {
      return false;
    }
    
    // Check each criterion
    for (const [standardId, requirement] of Object.entries(criteria)) {
      // If standard doesn't exist in the space
      if (!space.compliance[standardId]) {
        return false;
      }
      
      // If a specific level is required
      if (requirement.level && 
          (!space.compliance[standardId].level || 
           verificationLevels[space.compliance[standardId].level].color !== requirement.level)) {
        return false;
      }
    }
    
    return true;
  });
};

// Mock data for enhanced compliance information
export const getEnhancedComplianceData = (spaceId) => {
  // In a real implementation, this would fetch from an API
  return {
    verificationHistory: [
      {
        date: '2025-01-15',
        standard: 'dataProtection',
        level: 'certified',
        verifier: 'TÜV Süd',
        notes: 'Annual certification completed'
      },
      {
        date: '2024-11-20',
        standard: 'iso27001',
        level: 'verified',
        verifier: 'ShareYourSpace',
        notes: 'On-site verification completed'
      },
      {
        date: '2024-10-05',
        standard: 'networkSecurity',
        level: 'documented',
        verifier: 'ShareYourSpace',
        notes: 'Documentation submitted'
      }
    ],
    documents: [
      {
        id: 'doc-123',
        name: 'Data Protection Policy',
        standard: 'dataProtection',
        uploadDate: '2024-12-10',
        status: 'verified',
        fileType: 'pdf'
      },
      {
        id: 'doc-124',
        name: 'ISO 27001 Certificate',
        standard: 'iso27001',
        uploadDate: '2024-11-15',
        status: 'verified',
        fileType: 'pdf'
      },
      {
        id: 'doc-125',
        name: 'Network Security Assessment',
        standard: 'networkSecurity',
        uploadDate: '2024-10-01',
        status: 'pending',
        fileType: 'pdf'
      }
    ],
    complianceContact: {
      name: 'Anna Schmidt',
      title: 'Data Protection Officer',
      email: 'compliance@example.com',
      phone: '+49 123 4567890'
    },
    lastAudit: '2025-01-15',
    nextAudit: '2025-07-15'
  };
};