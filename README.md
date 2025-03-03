# ShareYourSpace MVP

A showcase MVP for ShareYourSpace - The Enterprise-Grade Office Sharing Platform connecting corporate innovation teams with B2B SaaS startups.

## Getting Started

Follow these instructions to set up and run the ShareYourSpace MVP locally on your machine.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Create a new React application using Create React App:

```bash
npx create-react-app shareyourspace-mvp
cd shareyourspace-mvp
```

2. Install the required dependencies:

```bash
npm install react-router-dom tailwindcss @headlessui/react @heroicons/react
```

3. Initialize Tailwind CSS:

```bash
npx tailwindcss init
```

4. Replace or create the following files with the provided code:

- `tailwind.config.js`: Configuration for Tailwind CSS
- `src/index.css`: Global styles and Tailwind imports
- `src/App.js`: Main application component with routing
- Components:
  - `src/components/Navbar.js`: Navigation bar component
  - `src/components/Footer.js`: Footer component
  - `src/components/SpaceCard.js`: Card component for displaying workspace listings
  - `src/components/ProfileCard.js`: Card component for displaying user profiles
- Pages:
  - `src/pages/HomePage.js`: Landing page
  - `src/pages/ExplorePage.js`: Page for browsing available workspaces
  - `src/pages/SpaceDetailPage.js`: Detailed view of a specific workspace
  - `src/pages/MatchPage.js`: InnovationMatch feature for connecting people
  - `src/pages/DashboardPage.js`: User dashboard for managing bookings and connections
  - `src/pages/ProfilePage.js`: User profile management
- Data:
  - `src/data/spaces.js`: Mock data for workspaces
  - `src/data/profiles.js`: Mock data for user profiles

5. Start the development server:

```bash
npm start
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Features

This MVP demonstrates the following key features of ShareYourSpace:

- **Workspace Browsing**: Search and filter available spaces by location, amenities, and compliance features
- **Booking System**: Select dates and time slots to book workspace
- **InnovationMatch**: Connect corporate innovation teams with B2B SaaS founders
- **Dark Mode**: Toggle between light and dark themes with the new pink-themed dark mode
- **User Dashboard**: Manage bookings and business connections

## Project Structure

```
shareyourspace-mvp/
├── public/
├── src/
│   ├── components/        # Reusable UI components
│   ├── data/              # Mock data files
│   ├── pages/             # Page components
│   ├── App.js             # Main application with routing
│   ├── index.css          # Global styles
│   └── index.js           # Application entry point
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Project dependencies
```

## Next Steps

After validating the concept with this MVP, consider:

1. Implementing actual backend functionality with Node.js/Express or similar
2. Adding authentication and user management
3. Developing a database schema for spaces, users, and bookings
4. Building admin tools for managing spaces and users
5. Implementing payment processing for bookings

## Customization

- Colors can be customized in the `tailwind.config.js` file
- Replace placeholder images with your own
- Modify the mock data to reflect your target market