# ShareYourSpace 2.0 - MVP Development Plan

**Version:** 1.2
**Date:** 2025-04-14
**Goal:** Launch the Minimum Viable Product (MVP) of the ShareYourSpace 2.0 platform, focusing on the Munich "Corporate Hub Node" pilot with Pixida. The MVP will validate the core loop of connecting corporate space providers with startups/freelancers, facilitating high-quality matching within the space, enabling comprehensive administration, implementing monetization and referral systems, testing the initial recruiting agent functionality, and ensuring foundational security and usability.

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
*   **[CP-05] Basic Email Service Integration:** Setup service (e.g., SendGrid, Mailgun) for sending transactional emails (registration confirmation, password reset, basic notifications like connection requests, agent outreach initiation).
*   **[NT-01] In-App Notification Center:** Implement a centralized UI element (e.g., bell icon with a dropdown/panel) aggregating key platform notifications such as new connection requests, accepted connections, new chat messages, admin actions relevant to the user, and successful referral activations.

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
    *   Include mandatory acceptance checkbox for Terms of Service and Privacy Policy ([SEC-01]) before registration completion.
*   **[ON-02] Social Login Integration:** Allow users to register/login using Google, LinkedIn, and Apple accounts for convenience (must also include ToS/Privacy acceptance flow).
*   **[ON-03] Email Verification:** Send confirmation email upon registration with a verification link.
*   **[ON-04] Login System:** Secure login form with email/password and social login options. Implement "Forgot Password" functionality.
*   **[ON-05] Startup/Freelancer Waitlist Flow:**
    *   Upon successful sign-up & verification, display a dedicated page explaining they've been added to the talent pool/waitlist.
    *   Inform them that space providers (initially Pixida admin via the recruiting agent) will review profiles and reach out if there's a suitable fit for available space.
    *   Store their profile data in the database, marked as "Waitlisted" or "Pool". They should *not* have full platform access at this stage but should be searchable by the Recruiting Agent.
*   **[ON-06] Corporate Sign-Up Flow:**
    *   Upon successful sign-up & verification, display a dedicated page thanking them for their interest.
    *   State that the ShareYourSpace team will reach out within 24 hours to discuss onboarding, space configuration, and next steps (manual process for MVP).
*   **[ON-07] Simple In-App Onboarding Guidance:** For newly activated users (first login after being moved from waitlist or employee invite), display basic tooltips or a simple checklist highlighting key initial actions (e.g., "Complete your profile," "Check out potential matches," "Find your referral link").

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
*   **[PROF-01] Basic Company/Startup Profile View:** Implement a dedicated, viewable profile page for each Company and Startup entity active on the platform. This page should aggregate key information such as: Company/Startup Name, Logo (uploadable by Admin), Industry Focus, brief description/mission, website link, and potentially a list of currently active members within the space (respecting individual privacy settings). This profile is distinct from individual member profiles.

**1.4 Matching & Connection**

*   **[MA-01] Intra-Space Matching Engine (High-Quality MVP Focus):**
    *   **Core Logic:** Develop an algorithm that operates *only* within the user's assigned space/node to find the most relevant connections.
    *   **Input:** Leverages the detailed user profile information (Skills, Expertise, Industry Focus, Project Interests/Goals, Bio, Collaboration Preferences, Tools & Technologies, etc.).
    *   **Algorithm Concept (State-of-the-Art Embedding-Based):**
        *   Utilize advanced embedding models (e.g., Google's `text-embedding-004`, Sentence-BERT pre-tuned for professional context if feasible) to convert key profile text fields into rich vector representations capturing semantic meaning.
        *   **Vector Storage & Search:** Store these generated vector embeddings in the **PostgreSQL database** using the **`pgvector` extension**, enabling efficient similarity searches. This requires adding a vector column type to the relevant user profile table and ensuring the `pgvector` extension is installed and configured in the database.
        *   **Similarity Search:** Leverage **`pgvector`'s indexed search capabilities** (e.g., using HNSW or IVFFlat indexes created on the vector column) to efficiently find the top N potential matches for a given user based on vector similarity (e.g., cosine distance or inner product) directly **within the database query**. This search is constrained to only consider other *active* users within the *same space*. This avoids manually comparing against all users in the application layer, ensuring scalability.
    *   **Filtering:** Filter out matches with oneself or members of the same company/startup.
    *   **Refinement & Ranking:** Incorporate structured data matches (e.g., shared industry tags, explicit skill overlap) as additional weighted factors in the **final ranking score** applied *after* the initial vector search retrieves the top candidates. This enhances precision. Identify key contributing factors for explainability ([MA-02]).
    *   ***Rationale:*** This approach provides the highest quality semantic matching feasible within MVP performance and cost constraints by leveraging powerful embeddings. Using `pgvector` offers a **scalable foundation** for semantic similarity search directly within the primary database, avoiding the complexity of a separate vector DB for the MVP. While a purely agentic approach analyzing every profile pair might offer nuances, its computational cost and latency make it impractical for real-time suggestions in the MVP. Embedding-based similarity via `pgvector` is the current state-of-the-art for scalable, high-quality matching.
    *   **Output:** Generate a highly relevant, ranked list of potential matches for the user, prioritizing meaningful connections.
*   **[MA-02] Matching Interface:**
    *   Dedicated "Discover Connections" or "Matching" section in the user dashboard.
    *   Display suggested matches in a visually appealing way (e.g., profile cards showing photo, name, role, key skills/interests, and a clear match score).
    *   **Explainable AI (Match Reasons):** For each match, display concise reasons why the match was suggested (e.g., "Shared interest in AI Ethics," "Complementary skills: You list Python, they list Data Visualization," "Both focused on SaaS growth"). These reasons should derive from the key factors identified in [MA-01].
    *   Allow users to browse suggested matches.
*   **[MA-03] Connection Request:**
    *   Implement a "Connect" button on match profiles.
    *   Sends a connection request notification (in-app via [NT-01] and email) to the target user.
*   **[MA-04] Connection Management:**
    *   Users can view pending incoming/outgoing connection requests in their notification center ([NT-01]) and potentially a dedicated connections management page.
    *   Ability to Accept or Decline requests.
    *   Once accepted, users become "Connected".

**1.5 Chat & Communication**

*   **[CH-01] Direct Messaging:** Implement a real-time chat interface for **connected** users and for admin communication channels ([CH-04], [AG-04]).
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
    *   Access to Notification Center ([NT-01]) / Recent Activity.
    *   Access to Chats.
    *   Access to Company/Startup profile ([PROF-01]) if applicable.
*   **[DB-02] Startup/Freelancer Admin Dashboard:**
    *   View/Manage own profile.
    *   **(Startup Only):** View list of own team members within the space.
    *   **(Startup Only):** Button/Mechanism to *request* adding new members (triggers notification/task for Corporate Admin, subject to workstation availability).
    *   Access "Contact Space Admin" chat.
    *   View/Manage subscription details (plan, next billing date, payment method, accumulated referral credits [GF-01]).
    *   View basic usage stats (e.g., own connections made, profile views received).
*   **[DB-03] Corporate Admin Dashboard (e.g., Pixida Admin):**
    *   View/Manage own profile.
    *   **Member Management:**
        *   View list of own company employees participating in the space.
        *   View list of onboarded Startups & Freelancers currently assigned to their space.
        *   View profiles of all users within their space ([UP-01]) and the Company/Startup profiles ([PROF-01]).
    *   **Space & Workstation Management:**
        *   Define **Total Available Workstations** for their space.
        *   View **Currently Occupied Workstations** count.
        *   Assign/Allocate workstations to specific Startups/Freelancers.
        *   Approve/Reject requests from Startups to add members based on workstation availability.
    *   **Recruiting Agent Tool Access (See Section 1.7).**
    *   Access chats initiated by Startup Admins/Freelancers via "Contact Space Admin" and replies from external prospects via [AG-04].
    *   View/Manage company subscription details (plan info, billing contact, accumulated referral credits [GF-01]).
    *   View basic space utilization (occupancy rate) & connection statistics within the space (e.g., total connections formed).
*   **[DB-04] ShareYourSpace (SYS) Admin Dashboard:**
    *   **User Management:** View all users (all types), filter/search, view profiles, manually change roles/status (e.g., onboard waitlisted user, assign space), impersonate user (for debugging). View and manage reported users/content ([SEC-02]).
    *   **Space Management:** Define/Manage Spaces/Nodes (e.g., create "Pixida Munich Hub"). Assign Corporate Admins to spaces.
    *   **Comprehensive Statistics:** View key platform metrics (Total Users, Active Users, Users per Space, Connections Made, Waitlist Size, Conversion Rates, Revenue Metrics, Agent Usage, Referral Rates).
    *   **Feedback Inbox (See Section 1.9):** View, categorize, assign, and track status of submitted user feedback.
    *   **Subscription & Promo Code Management:** View active subscriptions, manage plans, issue/manage promo codes (for pilot partners, marketing), manage referral credits.
    *   **Moderation Queue:** Review reported users/content flagged via [SEC-02] and take appropriate action (warning, suspension, ban).

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
        *   **Contact Info Finder Tool (Attempt):** A tool that attempts to find publicly available contact information (email) for the identified *external* potential members (use with caution regarding scraping policies/ethics).
    *   **Output Generation:** The agent processes the search results (from web and internal waitlist), filters/ranks them based on relevance to the request, and compiles a list of suggested candidates.
*   **[AG-03] Agent Results Display:**
    *   Present the agent's findings as a list of potential Startups/Freelancers below the input area. Clearly distinguish between suggestions from the external web search vs. internal waitlist.
    *   Each entry should show: Name, Brief Description/Focus, Source (Web/Waitlist), Link to Website/LinkedIn/Internal Profile (if applicable), potentially a relevance score.
*   **[AG-04] Contact Facilitation:**
    *   For each suggestion, provide two options:
        *   "Contact Manually" (Admin handles outreach externally).
        *   "Initiate Contact via ShareYourSpace":
            *   **If Internal Waitlist Lead:**
                *   Trigger an **in-platform connection request** directly to the waitlisted user's profile.
                *   This request appears in their Notification Center ([NT-01]) upon activation/login.
                *   Send a standard notification email informing the user of an invitation/interest from a company on ShareYourSpace, prompting them to log in/activate to view details.
            *   **If External Web Lead:**
                *   Trigger a backend process to send an automated email from a ShareYourSpace address (e.g., `invitations@shareyourspace.com`).
                *   The email introduces ShareYourSpace, mentions the interested company (e.g., Pixida) and the opportunity, and includes a **unique, secure link** to a dedicated landing page on the ShareYourSpace domain.
                *   The landing page displays invitation details (without revealing internal platform specifics), info about the inviting company, the SYS value prop, and provides a simple **text box for the prospect to reply directly**.
                *   Submitting the reply captures the message and delivers it into the **Corporate Admin's ShareYourSpace chat interface**, creating a new conversation thread clearly marked as originating from this outreach.
                *   The page encourages sign-up but allows replying without it.
                *   **Crucially, the initial email does NOT contain the Corporate Admin's direct contact details.**
            *   Log all initiation actions for the admin.

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
        *   **Referring a Startup/Freelancer:** Referrer receives a **1-month subscription credit/discount** applicable to their next billing cycle + a **"Community Helper" badge** displayed on their profile ([UP-01]).
        *   **Referring a Corporate Partner:** Referrer receives a **3-month subscription credit/discount** applicable to their next billing cycle(s) + a prestigious **"Community Leader" badge** displayed on their profile ([UP-01]).
*   **[GF-02] Referral Interface:** Dedicated UI section for users to:
    *   Find their unique referral code/link.
    *   Easily share the link (e.g., copy button, social share options).
    *   Track the status of their referrals (pending activation, successfully activated) and earned rewards (badges, credits).
*   **[GF-03] Prominent Feedback Mechanism:**
    *   Implement a persistent "Feedback" button/widget visible on most pages.
    *   Clicking it opens a simple modal/form allowing users to submit free-text feedback and optionally categorize it (e.g., Bug Report, Feature Suggestion, Matching Quality, General Comment).
    *   Store feedback submissions in the database, linked to the user (if logged in).
*   **[GF-04] Feedback Processing (SYS Admin):** Feedback appears in the SYS Admin dashboard, allowing admins to categorize, prioritize, assign to team members (if applicable), mark status (New, In Progress, Resolved), and potentially link to internal task tracking (e.g., Jira, Trello via API later, simple status tracking for MVP).

**1.10 Security & Compliance**

*   **[SEC-01] Terms of Service & Privacy Policy:** Draft comprehensive Terms of Service and a GDPR-compliant Privacy Policy. Ensure these are legally reviewed. Implement clear display and mandatory user acceptance during the sign-up process ([ON-01]). Make documents easily accessible from the platform footer.
*   **[SEC-02] Basic User Blocking & Reporting:** Implement functionality allowing users to:
    *   **Block:** Prevent another user from seeing their profile or contacting them via chat.
    *   **Report:** Flag a user profile or specific chat message for inappropriate behavior or content.
    *   Access these options easily from user profiles and chat interfaces.
    *   Reports should feed into a moderation queue in the SYS Admin dashboard ([DB-04]) for review and action.

---

## 2. Information Flow Overview

1.  **Unauthenticated User:** Lands on the Landing Page -> Learns about SYS -> Chooses Sign Up path -> Accepts ToS/Privacy ([SEC-01]).
2.  **Startup/Freelancer Signup:** Registers (Email/Social) -> Verifies Email -> Completes basic profile -> Sees "Waitlist/Pool" page -> Data stored (Status: Waitlisted).
3.  **Corporate Signup:** Registers (Email/Social) -> Verifies Email -> Sees "Contact You Soon" page -> Data stored (Status: Pending Onboarding). *(Manual SYS Admin intervention follows)*.
4.  **SYS Admin Onboarding:** Manually reviews Corps -> Contacts -> Defines space -> Assigns Corp Admin -> Sets Workstations -> Marks Corp Active.
5.  **Corporate Admin (Post-Onboarding):** Logs in -> Accesses Dashboard -> Uses Recruiting Agent -> Agent searches Waitlist & Web -> Agent suggests candidates.
6.  **Contacting Candidates ([AG-04]):**
    *   **Internal:** Admin triggers in-platform request -> Waitlisted user gets email/notification -> Logs in/activates -> Sees request.
    *   **External:** Admin triggers email -> Prospect gets email with link -> Clicks link -> Views landing page -> Replies via form -> Reply appears in Admin's SYS Chat.
7.  **Candidate Acceptance:** Corp Admin confirms interest -> SYS Admin manually activates user, assigns space/workstations. *Pilot users use promo code. Non-pilot users subscribe ([MO-03])*
8.  **Active User:** Logs in -> Sees Onboarding Guidance ([ON-07]) -> Completes profile ([UP-01]) -> Uses Matching ([MA-02]), sees reasons -> Connects ([MA-03]). Can Block/Report ([SEC-02]). Views Company Profile ([PROF-01]). Checks Notifications ([NT-01]).
9.  **Connected Users:** Initiate Chat ([CH-01]), use full features ([CH-03]).
10. **Startup/Freelancer:** Uses "Contact Space Admin" ([CH-04]).
11. **Admin Users:** Perform management tasks via dashboards ([DB-02], [DB-03]).
12. **All Users:** Submit Feedback ([GF-03]). Use Referral Program ([GF-01], [GF-02]).
13. **SYS Admin:** Monitors platform via [DB-04], handles moderation ([SEC-02]), feedback ([GF-04]).

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
    *   **Real-time (Chat, Notifications):** Socket.IO (Python server + JS client)
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

*   **Prioritize Ruthlessly (Within MVP Scope):** The defined features constitute the MVP. Avoid scope creep. Advanced analytics, multi-node/city expansion, complex reputation systems remain post-MVP.
*   **Pilot Focus:** Design decisions should primarily serve the Pixida pilot use case initially.
*   **Manual Steps:** Acknowledge necessary MVP manual steps (Corporate onboarding, Waitlist -> Active transition). Plan for automation post-MVP.
*   **User Experience:** Maintain high standards for UI/UX quality, clarity, and the "wow effect" throughout the MVP. Ensure explainable AI ([MA-02]) is implemented clearly.
*   **ADK Implementation:** Allocate sufficient time for effective ADK integration for the recruiting agent, focusing on reliable tool usage and the specific contact flows ([AG-04]).
*   **Security & Privacy:** Embed security best practices rigorously. Ensure GDPR compliance ([SEC-01]), especially concerning profile data, consent for matching, agent data handling, and data subject rights (related to blocking [SEC-02]).
*   **Testing:** Implement comprehensive testing strategies: unit, integration, end-to-end tests covering all user roles, core flows (matching, chat, agent, payment, referrals, blocking/reporting), and edge cases. Utilize seeded data extensively.
*   **Feedback Loop:** Establish a process for actively collecting, analyzing, and acting upon feedback from pilot users immediately post-launch via [GF-03] and [GF-04].
*   **Detailed Mockups:** Ensure detailed UI/UX wireframes and high-fidelity mockups are created and approved for all features, including the notification center, blocking/reporting flows, and agent contact landing page, before intensive frontend development.
*   **Future Profile Enrichment:** Plan for future features like automated profile filling from sources like LinkedIn post-MVP to further enhance user convenience.
*   **Post-MVP Matching Enhancements:** Plan future iterations for the matching algorithm ([MA-01]) exploring techniques like:
    *   **Learning to Rank (LTR):** Training models based on implicit user interaction data (e.g., clicks, connection requests/acceptances) to improve ranking relevance.
    *   **Explicit User Feedback Integration:** Allowing users to provide feedback on match quality ("Good match," "Not relevant") and incorporating this into the algorithm.
    *   **Graph-Based Matching Methods:** Exploring graph neural networks or similar techniques to leverage the network structure of connections for improved recommendations.