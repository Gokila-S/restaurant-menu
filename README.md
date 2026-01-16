# 🍽️ The Gourmet - Restaurant Menu App

A modern, responsive restaurant menu application built with **React.js**. This project demonstrates best practices in React development including component-based architecture, state management, and modern CSS styling.

## 📋 Project Overview

**The Gourmet** is a full-featured restaurant menu web application that allows users to:
- Browse a curated menu of dishes
- Filter dishes by category, dietary preferences, and preparation time
- Search for specific dishes
- View detailed dish information in a modal
- Bookmark favorite dishes

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared/utility components
│   │   └── Icon.js      # SVG icon component
│   ├── layout/          # Layout components
│   │   ├── Header.js    # Navigation header
│   │   └── Sidebar.js   # Filter sidebar
│   ├── DishCard.js      # Individual dish card
│   ├── DishDetailModal.js # Dish detail popup
│   ├── Hero.js          # Hero banner section
│   └── index.js         # Barrel export file
├── data/                # Data layer
│   ├── dishes.js        # Menu data & filter options
│   └── index.js         # Data exports
├── pages/               # Page components
│   └── MenuPage.js      # Main menu page
├── styles/              # CSS stylesheets
│   └── App.css          # Global styles
├── App.js               # Root component
└── index.js             # Application entry point
```

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI/UX**: Smooth animations and transitions
- **Filter System**: Multi-category filtering with sidebar
- **Search Functionality**: Real-time search across dishes
- **Modal Views**: Detailed dish information in elegant modals
- **Bookmarking**: Save favorite dishes (local state)

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **CSS3** - Styling with CSS variables and flexbox/grid
- **Google Fonts** - Poppins font family

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd restaurant-menu-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Component Architecture

### Components Overview

| Component | Description |
|-----------|-------------|
| `Header` | Navigation bar with logo, menu links, and user actions |
| `HeroSection` | Main banner with call-to-action buttons |
| `Sidebar` | Filter panel with collapsible filter groups |
| `DishCard` | Individual dish display with image, details, and bookmark |
| `DishDetailModal` | Full dish details in a modal popup |
| `Icon` | Reusable SVG icon component |

### Data Flow

```
App.js
  └── MenuPage.js (State Management)
        ├── Header
        ├── HeroSection
        ├── Sidebar (Filter State)
        ├── DishCard[] (Filtered Dishes)
        └── DishDetailModal (Selected Dish)
```

## 🎨 Styling Approach

- **CSS Variables**: Centralized color and spacing management
- **BEM-like Naming**: Organized class naming convention
- **Responsive Design**: Mobile-first approach with media queries
- **Animations**: Smooth transitions and hover effects

## 👨‍💻 Author

Developed as a college project demonstrating React.js fundamentals and modern web development practices.

## 📄 License

This project is for educational purposes.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
