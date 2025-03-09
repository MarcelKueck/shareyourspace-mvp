import React from 'react';
import { Link } from 'react-router-dom';

const PilotTermsPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-dark-bg-light min-h-screen transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <Link to="/" className="text-gray-400 hover:text-gray-500">
                  Home
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <Link to="/enterprise-pilot" className="ml-4 text-gray-400 hover:text-gray-500">
                  Enterprise Pilot
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <span className="ml-4 text-gray-500 font-medium">
                  Terms & Conditions
                </span>
              </div>
            </li>
          </ol>
        </nav>
        
        <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow overflow-hidden transition-colors duration-200">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-dark-bg">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
              Enterprise Pilot Program Terms & Conditions
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
              Last updated: March 1, 2025
            </p>
          </div>
          
          <div className="px-4 py-5 sm:p-6 prose dark:prose-invert max-w-none transition-colors duration-200">
            <h2>1. Introduction</h2>
            <p>
              These Enterprise Pilot Program Terms and Conditions ("Pilot Terms") govern your participation in the ShareYourSpace Enterprise Pilot Program. By applying for or participating in the Pilot Program, you agree to these Pilot Terms in addition to our standard Terms of Service.
            </p>
            
            <h2>2. Definitions</h2>
            <p>
              In these Pilot Terms, the following definitions apply:
            </p>
            <ul>
              <li><strong>"Pilot Program"</strong> means the ShareYourSpace Enterprise Pilot Program, a limited-time evaluation period for the Enterprise Services.</li>
              <li><strong>"Pilot Period"</strong> means the agreed upon duration of the Pilot Program, typically 90 days unless otherwise specified in writing.</li>
              <li><strong>"Enterprise Services"</strong> means the enterprise features and functionality of the ShareYourSpace platform made available during the Pilot Period.</li>
              <li><strong>"Client"</strong> or <strong>"you"</strong> means the organization that has been accepted into the Pilot Program.</li>
              <li><strong>"ShareYourSpace"</strong>, <strong>"we"</strong>, or <strong>"us"</strong> means ShareYourSpace GmbH and its affiliates.</li>
            </ul>
            
            <h2>3. Pilot Program Duration</h2>
            <p>
              The Pilot Program begins on the start date specified in your Pilot Dashboard and continues for the duration of the Pilot Period. ShareYourSpace may, at its sole discretion, extend the Pilot Period upon written notification.
            </p>
            
            <h2>4. Purpose of the Pilot Program</h2>
            <p>
              The Pilot Program is designed to:
            </p>
            <ul>
              <li>Allow you to evaluate the Enterprise Services for your organization's needs.</li>
              <li>Provide a structured framework for implementing and testing the Enterprise Services.</li>
              <li>Establish success metrics and evaluate the platform against these metrics.</li>
              <li>Determine whether a full deployment of Enterprise Services is appropriate for your organization.</li>
            </ul>
            
            <h2>5. Pilot Program Fee</h2>
            <p>
              A nominal Pilot Program fee may be charged to cover implementation, training, and resource allocation costs. This fee will be fully credited toward your subscription if you decide to continue with ShareYourSpace Enterprise Services after the Pilot Period. The specific fee amount will be provided in your Pilot Program proposal.
            </p>
            
            <h2>6. Pilot Program Obligations</h2>
            <h3>6.1 ShareYourSpace Obligations</h3>
            <p>
              During the Pilot Period, ShareYourSpace will:
            </p>
            <ul>
              <li>Provide access to the Enterprise Services as described in the Pilot Program documentation.</li>
              <li>Assign a dedicated account manager for the duration of the Pilot Period.</li>
              <li>Provide implementation support, training, and technical assistance.</li>
              <li>Conduct regular check-ins and progress reviews.</li>
              <li>Maintain the security and integrity of the Enterprise Services and your data.</li>
              <li>Provide analytics and reporting on usage and success metrics.</li>
            </ul>
            
            <h3>6.2 Client Obligations</h3>
            <p>
              During the Pilot Period, you agree to:
            </p>
            <ul>
              <li>Designate a primary point of contact for the Pilot Program.</li>
              <li>Participate in the implementation process, including providing necessary information and resources.</li>
              <li>Ensure that authorized users comply with the Terms of Service and these Pilot Terms.</li>
              <li>Participate in check-in meetings and provide feedback on the Enterprise Services.</li>
              <li>Report any issues or defects promptly to your account manager.</li>
              <li>Work with ShareYourSpace to define and measure success metrics.</li>
            </ul>
            
            <h2>7. Intellectual Property Rights</h2>
            <p>
              All intellectual property rights in the Enterprise Services remain the property of ShareYourSpace. Nothing in these Pilot Terms transfers any ownership rights to you. Any feedback, suggestions, or ideas provided by you regarding the Enterprise Services may be used by ShareYourSpace without any obligation to you.
            </p>
            
            <h2>8. Confidentiality</h2>
            <p>
              Each party agrees to maintain the confidentiality of any confidential information received from the other party during the Pilot Program. This includes, but is not limited to, proprietary technology, business plans, pricing, and user data. This obligation survives the termination of the Pilot Program.
            </p>
            
            <h2>9. Data Processing</h2>
            <p>
              ShareYourSpace will process personal data in accordance with our Privacy Policy and applicable data protection laws. For clients in the European Union, our Data Processing Agreement applies to all personal data processed during the Pilot Program.
            </p>
            
            <h2>10. Termination</h2>
            <p>
              Either party may terminate the Pilot Program at any time by providing written notice to the other party. Upon termination:
            </p>
            <ul>
              <li>Your access to the Enterprise Services will be discontinued.</li>
              <li>You may request an export of your data within 30 days of termination.</li>
              <li>ShareYourSpace will securely delete your data in accordance with our data retention policies and applicable laws.</li>
            </ul>
            
            <h2>11. Conversion to Full Subscription</h2>
            <p>
              If you decide to continue using the Enterprise Services after the Pilot Period, you may convert to a full subscription by:
            </p>
            <ul>
              <li>Notifying your account manager of your intention to convert.</li>
              <li>Signing a subscription agreement with ShareYourSpace.</li>
              <li>Paying the applicable subscription fees (with the Pilot Program fee credited toward your subscription).</li>
            </ul>
            
            <h2>12. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, ShareYourSpace's liability for any claims arising from or related to the Pilot Program is limited to the amount of the Pilot Program fee paid by you. In no event will ShareYourSpace be liable for any indirect, special, incidental, or consequential damages.
            </p>
            
            <h2>13. Disclaimer of Warranties</h2>
            <p>
              The Enterprise Services are provided "as is" and "as available" during the Pilot Period. ShareYourSpace makes no warranties, express or implied, regarding the Enterprise Services, including any warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            
            <h2>14. Changes to Pilot Terms</h2>
            <p>
              ShareYourSpace may modify these Pilot Terms at any time by providing written notice to you. Your continued participation in the Pilot Program after such notice constitutes acceptance of the modified terms.
            </p>
            
            <h2>15. Governing Law and Dispute Resolution</h2>
            <p>
              These Pilot Terms are governed by the laws of the Federal Republic of Germany. Any disputes arising from or relating to these Pilot Terms will be subject to the exclusive jurisdiction of the courts of Munich, Germany.
            </p>
            
            <h2>16. Entire Agreement</h2>
            <p>
              These Pilot Terms, together with the Terms of Service, Privacy Policy, and any other documents expressly incorporated by reference, constitute the entire agreement between you and ShareYourSpace regarding the Pilot Program and supersede any prior agreements or understandings.
            </p>
          </div>
          
          <div className="px-4 py-5 sm:px-6 border-t border-gray-200 dark:border-dark-bg flex justify-between items-center">
            <Link
              to="/enterprise-pilot"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-bg shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-bg-light hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Pilot Program
            </Link>
            
            <Link
              to="/enterprise-pilot/apply"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
            >
              Apply for Pilot
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PilotTermsPage;