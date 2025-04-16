# ShareYourSpace 2.0 - MVP Development Plan

**Version:** 1.0
**Date:** 2025-04-14
**Goal:** Launch the Minimum Viable Product (MVP) of the ShareYourSpace 2.0 platform, focusing on the Munich "Corporate Hub Node" pilot with Pixida. The MVP will validate the core loop of connecting corporate space providers with startups/freelancers, facilitating matching within the space, enabling basic administration, and testing the initial recruiting agent functionality.

---

## 1. MVP Feature List

The MVP features are categorized for clarity. "Must-Have" features are essential for the initial launch. "Should-Have" features add significant value but could potentially follow in a fast-follow release if time is constrained.

**1.1 Core Platform & UI/UX (Must-Have)**

*   **[CP-01] Basic Platform Structure:** Setup project repository, basic configuration, environment variables (`.env`).
*   **[CP-02] Simplistic & Beautiful UI Design:**
    *   Clean, modern aesthetic using a consistent design system/component library (e.g., Shadcn UI, Material UI).
    *   Implement **Dark Mode** as a standard option.
    *   Use English as the primary language.
    *   Incorporate subtle, tasteful animations (e.g., using Framer Motion) for transitions and interactions to enhance user experience without being distracting.
*   **[CP-03] Responsive Design:** Ensure usability across desktop, tablet, and mobile devices.
*   **[CP-04] Database Seeding:** Implement scripts to populate the database with sample data for all user types (SYS Admin, Company Admin, Company Employee, Startup Admin, Startup Member, Freelancer) and space configurations for effective testing.
*   **[CP-05] Basic Email Service Integration:** Setup service (e.g., SendGrid, Mailgun) for sending transactional emails (registration confirmation, password reset, basic notifications).

**1.2 Landing Page & Onboarding (Must-Have)**

*   **[LP-01] Engaging Landing Page:**
    *   **"Wow Effect":** Create a visually appealing entry point.
        *   High-quality hero section clearly stating the value proposition.
        *   Consider a subtle, non-intrusive 3D animated background effect triggered on scroll (e.g., using React Three Fiber/Drei helpers, potentially starting with a pre-built template).
        *   Use animated SVGs or Lottie files for iconography or illustrations.
    *   **Content:** Clearly explain the ShareYourSpace 2.0 concept, benefits for *both* sides (Corporates/Space Providers like Pixida, and Startups/Freelancers). Highlight the value of curated connections, optimized spaces, and potential for innovation.
    *   **Call to Actions (CTAs):** Prominent "Sign Up" / "Learn More" buttons for both user groups.
*   **[ON-01] User Registration:**
    *   Separate sign-up flows for:
        *   Corporate Representatives (e.g., Pixida contact person).
        *   Startup Representatives (Admin).
        *   Freelancers.
    *   Collect essential information (Name, Email, Password, Company Name/Freelancer, Role).
    *   Implement secure password handling (hashing).
*   **[ON-02] Social Login Integration:** Allow users to register/login using Google, LinkedIn, and Apple accounts for convenience.
*   **[ON-03] Email Verification:** Send confirmation email upon registration with a verification link.
*   **[ON-04] Login System:** Secure login form with email/password and social login options. Implement "Forgot Password" functionality.
*   **[ON-05] Startup/Freelancer Waitlist Flow:**
    *   Upon successful sign-up & verification, display a dedicated page explaining they've been added to the talent pool/waitlist.
    *   Inform them that space providers (initially Pixida admin via the recruiting agent) will review profiles and reach out if there's a suitable fit for available space.
    *   Store their profile data in the database, marked as "Waitlisted" or "Pool". They should *not* have full platform access at this stage but should be searchable by the Recruiting Agent.
*   **[ON-06] Corporate Sign-Up Flow:**
    *   Upon successful sign-up & verification, display a dedicated page thanking them for their interest.
    *   State that the ShareYourSpace team will reach out within 24 hours to discuss onboarding, space configuration, and next steps (manual process for MVP).

**1.3 User Profiles & Space Association (Must-Have)**

*   **[UP-01] Detailed User Profiles:**
    *   Allow users (once fully onboarded, not waitlisted) to view and **edit** their profiles.
    *   **Profile Picture Upload:** Functionality to upload and display a profile photo.
    *   **Essential Information (Basis for Matching):**
        *   **Common:** Name, Role/Title, Company/Startup Name (if applicable), Profile Picture, Short Bio/Introduction, Contact Info (optional visibility controls).
        *   **Skills & Expertise:** Tag-based or free-text input for key skills (e.g., Software Development, AI/ML, Marketing, Design, Project Management).
        *   **Industry Focus:** Primary industry (e.g., Tech, Automotive, Health, Finance).
        *   **Project Interests/Goals:** What kind of projects or collaborations are they looking for? What are their current objectives? (Text area).
        *   **Collaboration Preferences:** How do they prefer to collaborate? (e.g., brainstorming, focused work, casual networking).
        *   **Tools & Technologies:** Key software/hardware they use (relevant for tech/creative).
        *   **LinkedIn Profile URL:** Link to external professional profile.
*   **[UP-02] Space Association:**
    *   Every active user (Company Employee, onboarded Startup Member, onboarded Freelancer) must be clearly associated with **one** specific physical space/node (e.g., "Pixida Munich Hub"). This association is fundamental for intra-space matching. This association will initially be set manually by SYS Admin or during Corporate onboarding.

**1.4 Matching & Connection (Must-Have)**

*   **[MA-01] Intra-Space Matching Engine:**
    *   **Core Logic:** Develop an algorithm that operates *only* within the user's assigned space/node.
    *   **Input:** Leverages the detailed user profile information (Skills, Industry, Interests, Goals, etc.).
    *   **Algorithm Concept (AI-Powered):**
        *   Use embedding techniques (e.g., Sentence-BERT or Universal Sentence Encoder via potentially a Gemini model or dedicated embedding API) to convert profile text fields (Bio, Skills, Interests) into vector representations.
        *   Calculate similarity scores (e.g., cosine similarity) between a user's vector and all other *active* users' vectors within the *same space*.
        *   Filter out matches with oneself or members of the same company/startup.
        *   Consider incorporating tag-based matching (e.g., shared skills, industry overlap) as additional scoring factors.
        *   *Agentic Approach Consideration:* While potentially powerful, having an AI agent individually analyze *every* profile pair for *every* user in real-time might be computationally expensive for MVP. Start with vector similarity, potentially adding an agentic layer for *re-ranking* the top N matches later if needed.
    *   **Output:** Generate a ranked list of potential matches for the user.
*   **[MA-02] Matching Interface:**
    *   Dedicated "Discover Connections" or "Matching" section in the user dashboard.
    *   Display suggested matches in a visually appealing way (e.g., profile cards showing photo, name, role, key skills/interests, and a match score/reason).
    *   Allow users to browse suggested matches.
*   **[MA-03] Connection Request:**
    *   Implement a "Connect" button on match profiles.
    *   Sends a connection request notification (in-app and potentially email) to the target user.
*   **[MA-04] Connection Management:**
    *   Users can view pending incoming/outgoing connection requests.
    *   Ability to Accept or Decline requests.
    *   Once accepted, users become "Connected".

**1.5 Chat & Communication (Must-Have)**

*   **[CH-01] Direct Messaging:** Implement a real-time chat interface for **connected** users.
*   **[CH-02] High-Quality Chat UI:**
    *   Aim for a modern, WhatsApp-like experience.
    *   Features: Chat bubbles, timestamps, read receipts (optional for MVP), user online status (optional).
    *   **MVP Essential:** Text messaging.
*   **[CH-03] Basic Chat Features (Should-Have):**
    *   Emoji reactions to messages.
    *   Ability to attach/share basic documents (e.g., PDF, images).
    *   Editing/Deleting own messages.
*   **[CH-04] Admin Contact Chat:** Implement the "Contact Space Admin" button for Startup Admins/Freelancers to initiate a chat directly with their assigned Corporate Space Admin (e.g., Pixida's designated contact). This uses the same chat infrastructure.

**1.6 Dashboards & Administration (Must-Have)**

*   **[DB-01] Basic User Dashboard:** Personalized view for all logged-in users showing:
    *   Profile summary.
    *   Quick access to Matching/Discover.
    *   Recent connection activity/notifications.
    *   Access to Chats.
*   **[DB-02] Startup/Freelancer Admin Dashboard:**
    *   View/Manage own profile.
    *   **(Startup Only):** View list of own team members within the space.
    *   **(Startup Only):** Button/Mechanism to *request* adding new members (triggers notification/task for Corporate Admin, subject to workstation availability).
    *   Access "Contact Space Admin" chat.
    *   **(Post-Pilot):** View/Manage subscription details.
    *   **(Post-Pilot):** View basic usage stats (e.g., own connections made).
*   **[DB-03] Corporate Admin Dashboard (e.g., Pixida Admin):**
    *   View/Manage own profile.
    *   **Member Management:**
        *   View list of own company employees participating in the space.
        *   View list of onboarded Startups & Freelancers currently assigned to their space.
        *   View profiles of all users within their space.
    *   **Space & Workstation Management:**
        *   Define **Total Available Workstations** for their space.
        *   View **Currently Occupied Workstations** count.
        *   Assign/Allocate workstations to specific Startups/Freelancers.
        *   Approve/Reject requests from Startups to add members based on workstation availability.
    *   **Recruiting Agent Tool Access (See Section 1.7).**
    *   Access chats initiated by Startup Admins/Freelancers via "Contact Space Admin".
    *   **(Post-Pilot):** View/Manage company subscription details.
    *   **(Post-Pilot):** View basic space utilization & connection statistics.
*   **[DB-04] ShareYourSpace (SYS) Admin Dashboard:**
    *   **User Management:** View all users (all types), filter/search, view profiles, manually change roles/status (e.g., onboard waitlisted user, assign space).
    *   **Space Management:** Define/Manage Spaces/Nodes (e.g., create "Pixida Munich Hub"). Assign Corporate Admins to spaces.
    *   **Basic Statistics:** View key platform metrics (Total Users, Active Users, Users per Space, Connections Made, Waitlist Size).
    *   **Feedback Inbox (See Section 1.9):** View submitted user feedback.
    *   **(Post-Pilot):** Manage Subscriptions & Promo Codes.

**1.7 Agentic Features (Recruiting Agent - Must-Have)**

*   **[AG-01] Recruiting Agent Interface (within Corporate Admin Dashboard):**
    *   Section titled "Find Talent for Your Space" or similar.
    *   Display Total vs. Used Workstations.
    *   **Input:** Text area for admin to describe the ideal Startup/Freelancer profile they are looking for (e.g., "Early-stage AI startup focused on automotive sensor fusion," "Experienced freelance UX designer with B2B SaaS experience"). Include details about resources/synergies available at their space.
    *   **Agent Trigger:** Button like "Find Potential Members".
*   **[AG-02] Recruiting Agent Core Logic (Google ADK):**
    *   Develop an ADK `LlmAgent`.
    *   **Input Processing:** The agent receives the admin's textual description, the geographic location context (Munich for the pilot), and potentially context about existing members in the space (profile summaries/keywords).
    *   **Tools:**
        *   **Web Search Tool:** Configure a tool (potentially using ADK's built-in capabilities or a custom function calling Google Search/similar API) to search the web (LinkedIn, startup directories like Crunchbase/Angellist, local tech news sites) for Startups and Freelancers matching the description *within the specified geographic area (Munich)*.
        *   **Contact Info Finder Tool (Attempt):** A tool that attempts to find publicly available contact information (email) for the identified potential members (use with caution regarding scraping policies/ethics).
    *   **Output Generation:** The agent processes the search results, filters/ranks them based on relevance to the request, and compiles a list of suggested candidates.
*   **[AG-03] Agent Results Display:**
    *   Present the agent's findings as a list of potential Startups/Freelancers below the input area.
    *   Each entry should show: Name, Brief Description/Focus, Link to Website/LinkedIn (if found), potentially a relevance score.
*   **[AG-04] Contact Facilitation:**
    *   For each suggestion, provide two options:
        *   "Contact Manually" (Admin handles outreach externally).
        *   "Initiate Contact via ShareYourSpace":
            *   If chosen, trigger a backend process.
            *   The system (acting on behalf of the agent/admin) uses the found contact email (if available).
            *   Send a pre-defined, polite email template: Introduces ShareYourSpace briefly, explains the Corporate Admin (mentioning company name, e.g., Pixida) is interested in connecting regarding potential space/collaboration opportunities, includes the admin's direct email address for the recipient to reply to, and invites them to learn more/schedule a chat.
            *   Log this action for the admin.

**1.8 Monetization (Foundation - Must-Have)**

*   **[MO-01] Subscription Structure Definition:** Define basic subscription tiers in the backend (even if only one paid tier initially besides the pilot).
    *   Freelancer (Fixed price/month).
    *   Startup (Tiered based on members, e.g., 1-3 members, 4-10 members - start with fixed price per member).
    *   Corporate (Custom pricing - handled manually post-signup for MVP, but plan for integration).
*   **[MO-02] Payment Gateway Integration:** Integrate with Stripe (or similar) for handling payments.
*   **[MO-03] Paywall Implementation:** Protect access to core features (dashboard, matching, chat, agent tools) for non-pilot users until a subscription is active.
*   **[MO-04] Pilot Partner Promo Code:** Implement a mechanism for Pixida (and their initial invited startups/freelancers) to bypass the paywall using a specific code during/after onboarding.
*   **[MO-05] Money-Back Guarantee Logic:** Implement tracking for the 1-month guarantee period after subscription start. (Actual refund processing might be manual via SYS Admin dashboard/Stripe interface for MVP). The guarantee conditions need clear display during signup/payment.

**1.9 Growth & Feedback (Must-Have)**

*   **[GF-01] Basic Referral Program Backend:**
    *   Generate unique referral codes/links for active users.
    *   Track sign-ups originating from referrals.
    *   Implement logic to grant a simple, fixed benefit for successful referrals (e.g., 1 month free, small credit - define the MVP benefit). Differentiate benefit for referring Startups/Freelancers vs. Corporates.
*   **[GF-02] Referral Interface (Should-Have):** Basic UI for users to find their referral code/link and track successful referrals.
*   **[GF-03] Prominent Feedback Mechanism:**
    *   Implement a persistent "Feedback" button/widget visible on most pages.
    *   Clicking it opens a simple modal/form allowing users to submit free-text feedback and optionally categorize it (e.g., Bug Report, Feature Suggestion, General Comment).
    *   Store feedback submissions in the database, linked to the user (if logged in).
*   **[GF-04] Feedback Processing (SYS Admin):** Feedback appears in the SYS Admin dashboard, ideally allowing admins to categorize, prioritize, and potentially link to internal task tracking (basic inbox functionality for MVP).

---

## 2. Information Flow Overview

1.  **Unauthenticated User:** Lands on the Landing Page -> Learns about SYS -> Chooses Sign Up path (Corporate or Startup/Freelancer).
2.  **Startup/Freelancer Signup:** Registers (Email/Social) -> Verifies Email -> Completes basic profile info -> Sees "Waitlist/Pool" confirmation page -> Data stored in DB (Status: Waitlisted).
3.  **Corporate Signup:** Registers (Email/Social) -> Verifies Email -> Sees "Contact You Soon" page -> Data stored in DB (Status: Pending Onboarding). *(Manual SYS Admin intervention follows)*.
4.  **SYS Admin Onboarding:** Manually reviews Corporate signups -> Contacts corporate -> Defines space ("Pixida Munich Hub") -> Assigns Corporate Admin role -> Sets Total Workstations -> Marks Corporate as Active.
5.  **Corporate Admin (Post-Onboarding):** Logs in -> Accesses Dashboard -> Configures profile -> Uses Recruiting Agent -> Agent searches Waitlist DB & Web -> Agent suggests candidates -> Admin contacts candidates (manually or via SYS email).
6.  **Candidate Contacted:** Receives email -> Responds to Corporate Admin directly -> (Off-platform interaction) -> If interested & accepted by Corporate Admin -> SYS Admin manually changes candidate status from Waitlisted to Active, assigns them to the Corporate's Space, and allocates workstation count (based on Corporate Admin instruction).
7.  **Active User (Employee, Startup, Freelancer):** Logs in -> Accesses Dashboard -> Completes/Edits detailed profile -> Uses Matching tool -> Algorithm finds matches within the *same space* -> User views matches -> Sends Connection Request -> Target User Accepts/Declines.
8.  **Connected Users:** Initiate Chat -> Exchange messages.
9.  **Startup Admin/Freelancer:** Uses "Contact Space Admin" -> Initiates Chat with Corporate Admin.
10. **Admin Users (Corporate/Startup):** Perform specific management tasks via their dashboards (viewing members, managing workstations - Corp Admin).
11. **All Users:** Can submit Feedback -> Feedback appears in SYS Admin Dashboard.
12. **(Post-Pilot):** Non-pilot users hit Paywall -> Subscribe via Stripe -> Gain full access. Users can access Referral info.

---

## 3. Tech Stack Overview

*   **Frontend:**
    *   **Framework:** Next.js (React framework - provides routing, SSR/SSG, API routes)
    *   **Language:** TypeScript
    *   **Styling:** Tailwind CSS
    *   **UI Components:** Shadcn UI (or similar like Material UI, Chakra UI) - provides accessible, composable components.
    *   **Animations:** Framer Motion
    *   **3D Background (Optional):** React Three Fiber + Drei (if pursuing the complex 3D effect)
    *   **State Management:** Zustand or React Context/Reducer (keep it simple for MVP)
*   **Backend:**
    *   **Framework:** FastAPI (Python - modern, fast, good for APIs, integrates well with Python AI libs) or Flask.
    *   **Language:** Python
    *   **Database ORM:** SQLAlchemy (with Alembic for migrations)
    *   **Authentication:** `python-jose` for JWT handling, direct integration with OAuth providers (Google, LinkedIn, Apple).
    *   **Real-time (Chat):** Socket.IO (Python server library + JS client)
*   **Database:**
    *   **Primary:** PostgreSQL (relational, robust, handles structured data well)
*   **AI & Agents:**
    *   **Core Agent Framework:** Google Agent Development Kit (ADK) (Python SDK)
    *   **LLM Access (via ADK):** Google Gemini API (likely Flash/Pro depending on task complexity/cost)
    *   **Matching Embeddings:** Sentence Transformers library (Python) or direct calls to embedding APIs (e.g., Google's `text-embedding-004`).
    *   **Vector Similarity:** NumPy/SciPy or potentially a vector database later (e.g., Pinecone, Chroma - likely overkill for single-node MVP).
*   **Infrastructure & Deployment:**
    *   **Containerization:** Docker, Docker Compose (for local dev)
    *   **Frontend Hosting:** Vercel (excellent Next.js integration)
    *   **Backend Hosting:** Google Cloud Run (serverless, scalable)
    *   **Agent Hosting:** Google Vertex AI Agent Engine (managed environment for ADK agents) or deploy agent logic as part of the Cloud Run service for MVP simplicity.
    *   **Database Hosting:** Google Cloud SQL (managed PostgreSQL) or Supabase/Neon (Postgres platforms).
    *   **Email Service:** SendGrid, Mailgun, or AWS SES.
    *   **Payment Processing:** Stripe.
*   **Development & Tooling:**
    *   **Version Control:** Git (GitHub, GitLab)
    *   **Code Editor:** VS Code / Cursor AI
    *   **CI/CD:** GitHub Actions

---

## 4. Key Considerations & Next Steps

*   **Prioritize Ruthlessly:** Stick to the defined MVP scope. Features like advanced analytics, multi-node support, complex reputation systems, and the full suite of AI agents from the vision doc are explicitly *out* of this MVP.
*   **Pilot Focus:** Design decisions should primarily serve the Pixida pilot use case initially.
*   **Manual Steps:** Acknowledge that some MVP processes involve manual steps (Corporate onboarding, Waitlist -> Active user transition). Automate these post-MVP.
*   **User Experience:** Even for MVP, invest time in a clean, intuitive, and visually appealing UI. The "wow effect" and quality feel are important for adoption.
*   **ADK Learning Curve:** Allocate time for the team to learn and effectively implement the Google ADK for the recruiting agent. Start simple.
*   **Security & Privacy:** Implement security best practices from day one (input validation, authentication/authorization checks, dependency scanning). Be mindful of GDPR, especially regarding profile data and contact information handling by the agent.
*   **Testing:** Plan for thorough testing, including unit tests, integration tests, and end-to-end testing covering different user roles and the core flows (matching, chat, agent interaction). Use the seeded data extensively.
*   **Feedback Loop:** Actively solicit and review feedback from pilot users (Pixida, initial startups/freelancers) post-launch to guide iteration.
*   **Detailed Mockups:** Create detailed UI/UX wireframes and mockups before starting frontend development to ensure clarity and alignment.

This plan provides a solid foundation for your ShareYourSpace 2.0 MVP. Good luck with the development!