// Common CSS class combinations for dark mode support
export const styles = {
  // Page backgrounds
  pageBackground: "bg-gray-50 dark:bg-dark-bg-light transition-colors duration-200",
  
  // Card backgrounds
  cardBg: "bg-white dark:bg-dark-bg-light shadow transition-colors duration-200",
  
  // Text colors
  heading: "text-gray-900 dark:text-dark-text-primary transition-colors duration-200",
  subheading: "text-gray-600 dark:text-dark-text-secondary transition-colors duration-200",
  paragraph: "text-gray-500 dark:text-dark-text-secondary transition-colors duration-200",
  
  // Interactive elements
  primaryButton: "bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 text-white transition-colors duration-200",
  secondaryButton: "border border-gray-300 dark:border-dark-bg text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-bg-light hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors duration-200",
  accentButton: "bg-primary-50 dark:bg-dark-bg-light text-primary-700 dark:text-dark-primary-400 hover:bg-primary-100 dark:hover:bg-dark-bg transition-colors duration-200",
  
  // Form elements
  input: "bg-white dark:bg-dark-bg border-gray-300 dark:border-dark-bg-light focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 text-gray-900 dark:text-dark-text-primary transition-colors duration-200",
  
  // Border
  border: "border-gray-200 dark:border-dark-bg-light transition-colors duration-200",
  
  // Links
  link: "text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 transition-colors duration-200",
  
  // Badges and tags
  badge: "bg-primary-100 dark:bg-dark-primary-900 text-primary-800 dark:text-dark-primary-300 transition-colors duration-200",
  
  // Selection/Active states
  activeState: "bg-primary-50 dark:bg-dark-bg-light border-primary-500 dark:border-dark-primary-500 text-primary-700 dark:text-dark-primary-400 transition-colors duration-200"
};