# ShareYourSpace 2.0 - MVP Development Plan

**Version:** 1.1
**Date:** 2025-04-14
**Goal:** Launch the Minimum Viable Product (MVP) of the ShareYourSpace 2.0 platform, focusing on the Munich "Corporate Hub Node" pilot with Pixida. The MVP will validate the core loop of connecting corporate space providers with startups/freelancers, facilitating high-quality matching within the space, enabling comprehensive administration, implementing monetization and referral systems, and testing the initial recruiting agent functionality.

---

## 1. MVP Feature List

All features listed below are considered essential for the MVP launch.

**1.1 Core Platform & UI/UX**

*   **[CP-01] Basic Platform Structure:** Setup project repository, basic configuration, environment variables (`.env`).
*   **[CP-02] Simplistic & Beautiful UI Design:**
    *   Clean, modern aesthetic using a consistent design system/component library (e.g., Shadcn UI, Material UI).
    *   Implement **Dark Mode** as a standard option.
    *   Use English as the primary language.
    *   Incorporate subtle, tasteful animations (e.g., using Framer Motion) for transitions and interactions to enhance user experience without being distracting.
*   **[CP-03] Responsive Design:** Ensure usability across desktop, tablet, and mobile devices.
*   **[CP-04] Database Seeding:** Implement scripts to populate the database with sample data for all user types (SYS Admin, Company Admin, Company Employee, Startup Admin, Startup Member, Freelancer) and space configurations for effective testing.
*   **[CP-05] Basic Email Service Integration:** Setup service (e.g., SendGrid, Mailgun) for sending transactional emails (registration confirmation, password reset, basic notifications like connection requests).

**1.2 Landing Page & Onboarding**

*   **[LP-01] Engaging Landing Page:**
    *   **"Wow Effect":** Create a visually appealing entry point.
        *   High-quality hero section clearly stating the value proposition.
        *   Implement a subtle, non-intrusive 3D animated background effect triggered on scroll (e.g., using React Three Fiber/Drei helpers, potentially starting with a pre-built template).
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

**1.3 User Profiles & Space Association**

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

**1.4 Matching & Connection**

*   **[MA-01] Intra-Space Matching Engine (High-Quality MVP Focus):**
    *   **Core Logic:** Develop an algorithm that operates *only* within the user's assigned space/node to find the most relevant connections.
    *   **Input:** Leverages the detailed user profile information (Skills, Industry, Interests, Goals, Bio, etc.).
    *   **Algorithm Concept (State-of-the-Art Embedding-Based):**
        *   Utilize advanced embedding models (e.g., Google's `text-embedding-004`, Sentence-BERT fine-tuned for professional context if feasible) to convert key profile text fields into rich vector representations capturing semantic meaning.
        *   Calculate semantic similarity scores (cosine similarity) between a user's vector representation and those of all other *active* users within the *same space*. This identifies users with genuinely similar goals, skills, and interests, going beyond simple keyword matching.
        *   Filter out matches with oneself or members of the same company/startup.
        *   Incorporate structured data matches (e.g., shared industry tags, explicit skill overlap) as additional weighted factors in the final ranking score to enhance precision.
        *   *Rationale:* This approach provides the highest quality semantic matching feasible within MVP performance and cost constraints. While a pure agentic approach analyzing every profile pair might offer nuanced reasoning, its computational cost and latency make it impractical for real-time suggestions in the MVP. Embedding-based similarity is the current state-of-the-art for scalable, high-quality semantic matching.
    *   **Output:** Generate a highly relevant, ranked list of potential matches for the user, prioritizing meaningful connections.
*   **[MA-02] Matching Interface:**
    *   Dedicated "Discover Connections" or "Matching" section in the user dashboard.
    *   Display suggested matches in a visually appealing way (e.g., profile cards showing photo, name, role, key skills/interests, and a clear match score/reasoning summary).
    *   Allow users to browse suggested matches.
*   **[MA-03] Connection Request:**
    *   Implement a "Connect" button on match profiles.
    *   Sends a connection request notification (in-app and email) to the target user.
*   **[MA-04] Connection Management:**
    *   Users can view pending incoming/outgoing connection requests.
    *   Ability to Accept or Decline requests.
    *   Once accepted, users become "Connected".

**1.5 Chat & Communication**

*   **[CH-01] Direct Messaging:** Implement a real-time chat interface for **connected** users.
*   **[CH-02] High-Quality Chat UI:**
    *   Aim for a modern, WhatsApp-like experience.
    *   Features: Chat bubbles, timestamps, read receipts, user online status.
*   **[CH-03] Full Chat Features:**
    *   Emoji reactions to messages.
    *   Ability to attach/share documents (e.g., PDF, images, common office formats).
    *   Editing/Deleting own messages within a reasonable timeframe.
*   **[CH-04] Admin Contact Chat:** Implement the "Contact Space Admin" button for Startup Admins/Freelancers to initiate a chat directly with their assigned Corporate Space Admin (e.g., Pixida's designated contact). This uses the same chat infrastructure.

**1.6 Dashboards & Administration**

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
    *   View/Manage subscription details (plan, next billing date, payment method).
    *   View basic usage stats (e.g., own connections made, profile views received).
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
    *   View/Manage company subscription details (plan info, billing contact).
    *   View basic space utilization (occupancy rate) & connection statistics within the space (e.g., total connections formed).
*   **[DB-04] ShareYourSpace (SYS) Admin Dashboard:**
    *   **User Management:** View all users (all types), filter/search, view profiles, manually change roles/status (e.g., onboard waitlisted user, assign space), impersonate user (for debugging).
    *   **Space Management:** Define/Manage Spaces/Nodes (e.g., create "Pixida Munich Hub"). Assign Corporate Admins to spaces.
    *   **Comprehensive Statistics:** View key platform metrics (Total Users, Active Users, Users per Space, Connections Made, Waitlist Size, Conversion Rates, Revenue Metrics, Agent Usage).
    *   **Feedback Inbox (See Section 1.9):** View, categorize, assign, and track status of submitted user feedback.
    *   **Subscription & Promo Code Management:** View active subscriptions, manage plans, issue/manage promo codes (for pilot partners, marketing).

**1.7 Agentic Features (Recruiting Agent)**

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
        *   **Internal Waitlist Search Tool:** A tool for the agent to search the ShareYourSpace database for profiles currently on the waitlist that match the criteria.
        *   **Contact Info Finder Tool (Attempt):** A tool that attempts to find publicly available contact information (email) for the identified potential members (use with caution regarding scraping policies/ethics).
    *   **Output Generation:** The agent processes the search results (from web and internal waitlist), filters/ranks them based on relevance to the request, and compiles a list of suggested candidates.
*   **[AG-03] Agent Results Display:**
    *   Present the agent's findings as a list of potential Startups/Freelancers below the input area. Clearly distinguish between suggestions from the external web search vs. internal waitlist.
    *   Each entry should show: Name, Brief Description/Focus, Source (Web/Waitlist), Link to Website/LinkedIn/Internal Profile (if applicable), potentially a relevance score.
*   **[AG-04] Contact Facilitation:**
    *   For each suggestion, provide two options:
        *   "Contact Manually" (Admin handles outreach externally).
        *   "Initiate Contact via ShareYourSpace":
            *   If chosen, trigger a backend process.
            *   The system (acting on behalf of the agent/admin) uses the found contact email (if available and external) or internal notification system (if from waitlist).
            *   Send a pre-defined, polite email/message template: Introduces ShareYourSpace briefly, explains the Corporate Admin (mentioning company name, e.g., Pixida) is interested in connecting regarding potential space/collaboration opportunities, includes the admin's direct email address for the recipient to reply to, and invites them to learn more/schedule a chat.
            *   Log this action for the admin.

**1.8 Monetization**

*   **[MO-01] Subscription Structure Definition:** Define subscription tiers in the backend.
    *   Freelancer (Fixed price/month).
    *   Startup (Fixed price per active member/month).
    *   Corporate (Custom pricing - handled manually post-signup for MVP based on space size/needs, but backend support for tracking).
*   **[MO-02] Payment Gateway Integration:** Integrate with Stripe (or similar) for handling subscription payments and invoicing.
*   **[MO-03] Paywall Implementation:** Protect access to core features (dashboard, matching, chat, agent tools) for non-pilot users until a subscription is active. Display clear information about subscription benefits.
*   **[MO-04] Pilot Partner Promo Code:** Implement a mechanism for Pixida (and their initial invited startups/freelancers) to bypass the paywall using a specific code during/after onboarding.
*   **[MO-05] Money-Back Guarantee Logic:** Implement tracking for the 1-month guarantee period after subscription start. Display guarantee terms clearly during signup/payment. Implement automated notification to SYS Admin near end of guarantee period for potential manual refund processing if needed.

**1.9 Growth & Feedback**

*   **[GF-01] Referral Program Backend & Benefits:**
    *   Generate unique referral codes/links for active users.
    *   Track sign-ups and successful activations (i.e., user becomes active in a space or subscribes) originating from referrals.
    *   Implement logic to grant defined **in-platform benefits** upon successful referral activation:
        *   **Referring a Startup/Freelancer:** Referrer receives **1 month of "Priority Matching Visibility"** (their profile gets a slight boost in visibility within matching results) + a **"Community Helper" badge** on their profile.
        *   **Referring a Corporate Partner:** Referrer receives **3 months of "Priority Matching Visibility"** + a prestigious **"Community Leader" badge** on their profile.
*   **[GF-02] Referral Interface:** Dedicated UI section for users to:
    *   Find their unique referral code/link.
    *   Easily share the link (e.g., copy button, social share options).
    *   Track the status of their referrals (pending activation, successfully activated) and earned rewards.
*   **[GF-03] Prominent Feedback Mechanism:**
    *   Implement a persistent "Feedback" button/widget visible on most pages.
    *   Clicking it opens a simple modal/form allowing users to submit free-text feedback and optionally categorize it (e.g., Bug Report, Feature Suggestion, Matching Quality, General Comment).
    *   Store feedback submissions in the database, linked to the user (if logged in).
*   **[GF-04] Feedback Processing (SYS Admin):** Feedback appears in the SYS Admin dashboard, allowing admins to categorize, prioritize, assign to team members (if applicable), mark status (New, In Progress, Resolved), and potentially link to internal task tracking (e.g., Jira, Trello via API later, simple status tracking for MVP).

---

## 2. Information Flow Overview

1.  **Unauthenticated User:** Lands on the Landing Page -> Learns about SYS -> Chooses Sign Up path (Corporate or Startup/Freelancer).
2.  **Startup/Freelancer Signup:** Registers (Email/Social) -> Verifies Email -> Completes basic profile info -> Sees "Waitlist/Pool" confirmation page -> Data stored in DB (Status: Waitlisted).
3.  **Corporate Signup:** Registers (Email/Social) -> Verifies Email -> Sees "Contact You Soon" page -> Data stored in DB (Status: Pending Onboarding). *(Manual SYS Admin intervention follows)*.
4.  **SYS Admin Onboarding:** Manually reviews Corporate signups -> Contacts corporate -> Defines space ("Pixida Munich Hub") -> Assigns Corporate Admin role -> Sets Total Workstations -> Marks Corporate as Active.
5.  **Corporate Admin (Post-Onboarding):** Logs in -> Accesses Dashboard -> Configures profile -> Uses Recruiting Agent -> Agent searches Waitlist DB & Web -> Agent suggests candidates -> Admin contacts candidates (manually or via SYS email/message).
6.  **Candidate Contacted:** Receives email/message -> Responds to Corporate Admin directly -> (Off-platform interaction) -> If interested & accepted by Corporate Admin -> SYS Admin manually changes candidate status from Waitlisted to Active, assigns them to the Corporate's Space, and allocates workstation count (based on Corporate Admin instruction). *Pilot users bypass payment with promo code. Non-pilot users prompted to subscribe.*
7.  **Active User (Employee, Startup, Freelancer):** Logs in (potentially after subscribing) -> Accesses Dashboard -> Completes/Edits detailed profile -> Uses Matching tool -> Algorithm finds high-quality matches within the *same space* -> User views matches -> Sends Connection Request -> Target User Accepts/Declines.
8.  **Connected Users:** Initiate Chat -> Exchange messages, files, use reactions.
9.  **Startup Admin/Freelancer:** Uses "Contact Space Admin" -> Initiates Chat with Corporate Admin.
10. **Admin Users (Corporate/Startup):** Perform specific management tasks via their dashboards (viewing members, managing workstations - Corp Admin, viewing subscription - all Admins).
11. **All Users:** Can submit Feedback -> Feedback appears in SYS Admin Dashboard. Can access Referral section to share link and track rewards.
12. **Non-Pilot Users:** Hit Paywall -> Subscribe via Stripe -> Gain full access.

---

## 3. Tech Stack Overview

*   **Frontend:**
    *   **Framework:** Next.js (React framework)
    *   **Language:** TypeScript
    *   **Styling:** Tailwind CSS
    *   **UI Components:** Shadcn UI (or similar)
    *   **Animations:** Framer Motion
    *   **3D Background:** React Three Fiber + Drei
    *   **State Management:** Zustand or React Context/Reducer
*   **Backend:**
    *   **Framework:** FastAPI (Python)
    *   **Language:** Python
    *   **Database ORM:** SQLAlchemy (with Alembic for migrations)
    *   **Authentication:** `python-jose` for JWT, OAuth integrations
    *   **Real-time (Chat):** Socket.IO (Python server + JS client)
*   **Database:**
    *   **Primary:** PostgreSQL
*   **AI & Agents:**
    *   **Core Agent Framework:** Google Agent Development Kit (ADK) (Python SDK)
    *   **LLM Access (via ADK):** Google Gemini API (Flash/Pro)
    *   **Matching Embeddings:** Google `text-embedding-004` API or Sentence Transformers library (Python)
    *   **Vector Similarity:** NumPy/SciPy
*   **Infrastructure & Deployment:**
    *   **Containerization:** Docker, Docker Compose
    *   **Frontend Hosting:** Vercel
    *   **Backend Hosting:** Google Cloud Run
    *   **Agent Hosting:** Google Vertex AI Agent Engine (or as part of Cloud Run service)
    *   **Database Hosting:** Google Cloud SQL (or Supabase/Neon)
    *   **Email Service:** SendGrid / Mailgun / AWS SES
    *   **Payment Processing:** Stripe
*   **Development & Tooling:**
    *   **Version Control:** Git (GitHub/GitLab)
    *   **Code Editor:** VS Code / Cursor AI
    *   **CI/CD:** GitHub Actions

---

## 4. Key Considerations & Next Steps

*   **Prioritize Ruthlessly (Within MVP Scope):** While expanded, the MVP scope is now fixed. Avoid scope creep beyond these defined features. Advanced analytics, multi-node/city expansion, complex reputation systems remain post-MVP.
*   **Pilot Focus:** Design decisions should primarily serve the Pixida pilot use case initially.
*   **Manual Steps:** Acknowledge necessary MVP manual steps (Corporate onboarding, Waitlist -> Active transition). Plan for automation post-MVP.
*   **User Experience:** Maintain high standards for UI/UX quality, clarity, and the "wow effect" throughout the MVP.
*   **ADK Implementation:** Allocate sufficient time for effective ADK integration for the recruiting agent. Start with core functionality and reliable tool usage.
*   **Security & Privacy:** Embed security best practices rigorously. Ensure GDPR compliance, especially concerning profile data, consent for matching, and agent data handling.
*   **Testing:** Implement comprehensive testing strategies: unit, integration, end-to-end tests covering all user roles, core flows (matching, chat, agent, payment, referrals), and edge cases. Utilize seeded data extensively.
*   **Feedback Loop:** Establish a process for actively collecting, analyzing, and acting upon feedback from pilot users immediately post-launch.
*   **Detailed Mockups:** Ensure detailed UI/UX wireframes and high-fidelity mockups are created and approved before intensive frontend development.
*   **Future Profile Enrichment:** Plan for future features like automated profile filling from sources like LinkedIn post-MVP to further enhance user convenience.

This revised plan fully incorporates your requirements for the MVP, aiming for a high-quality initial launch focused on core value delivery, user experience, and essential functionalities.