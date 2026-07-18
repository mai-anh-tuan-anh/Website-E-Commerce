# Website E-Commerce

A modern, full-featured e-commerce application built with React.js, featuring a responsive design, comprehensive shopping functionality, and AI-powered chatbot integration.

Link demo: https://website-e-commerce-lyart.vercel.app/

## Features

### Core Functionality

- **Product Catalog**: Browse products with advanced filtering, sorting, and search capabilities
- **Shopping Cart**: Full cart management with add, update quantity, and remove operations
- **Checkout System**: Multi-step checkout with form validation and multiple payment methods (Card, PayPal, COD)
- **User Authentication**: JWT-based authentication with token refresh mechanism
- **Wishlist & Compare**: Save products to wishlist and compare up to 4 products side-by-side
- **Order Management**: Order confirmation and tracking

### User Experience

- **Responsive Design**: Mobile-first approach with adaptive layouts for all screen sizes
- **Smart Header**: Auto-hide on scroll down, show on scroll up for better content visibility
- **Lazy Loading**: Code splitting with React.lazy for optimal performance
- **Loading States**: Comprehensive loading spinners and error handling
- **Toast Notifications**: Real-time feedback for user actions
- **Smooth Animations**: AOS (Animate On Scroll) for engaging visual effects

### AI Integration

- **Multi-Chatbot System**: Integrated with Webot, BotLibre, and Tawk.to for customer support
- **AI Response Engine**: Custom AI chatbot with persona-based responses and context management
- **Intent Detection**: Advanced natural language processing for understanding user queries
- **Product Data Integration**: AI can access and recommend products based on user preferences

## 🛠️ Tech Stack

### Frontend Framework

- **React 19.2.0**: Latest React with concurrent features
- **Vite 7.3.1**: Fast build tool and dev server
- **React Router DOM 7.13.1**: Client-side routing with lazy loading

### State Management

- **Context API**: Global state management with custom providers
    - `SideBarProvider`: Cart, wishlist, compare management
    - `StoreProvider`: Application-wide state
    - `ToastProvider`: Notification system
    - `OurShopProvider`: Shop page state and filtering

### Styling

- **TailwindCSS 4.2.2**: Utility-first CSS framework
- **SCSS Modules**: Component-scoped styling
- **Normalize.css**: CSS reset for cross-browser consistency

### Form Handling & Validation

- **React Hook Form 7.72.0**: Performant form management
- **Zod 4.3.6**: Schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### UI Components & Libraries

- **React Icons 5.6.0**: Comprehensive icon library
- **React Slick 0.31.0**: Carousel/slider component
- **AOS 2.3.4**: Scroll animation library
- **Simple Image Magnifier 1.1.5**: Product image zoom functionality
- **React Toastify 11.0.5**: Toast notification system

### HTTP Client & Authentication

- **Axios 1.13.6**: HTTP client with interceptors
- **js-cookie 3.0.5**: Cookie management for authentication tokens
- **Lodash 4.18.1**: Utility functions (debounce, etc.)

### Testing

- **Vitest 4.1.2**: Unit testing framework
- **@testing-library/react 16.3.2**: React component testing
- **@testing-library/user-event 14.6.1**: User interaction simulation
- **jsdom 29.0.1**: DOM implementation for testing

## 📁 Project Structure

```
src/
├── apis/                    # API service layer
│   ├── axiosClient.js      # Axios configuration with interceptors
│   ├── authService.js      # Authentication API
│   ├── cartService.js      # Cart management API
│   └── productsService.js  # Products API
├── assets/                 # Static assets
│   ├── icons/             # Icon files
│   ├── images/            # Image files
│   ├── reviewImages/      # Review/testimonial images
│   └── styles/            # Global styles
├── components/             # Reusable components
│   ├── AdvanceHeading/    # Advanced heading component
│   ├── AuthEventHandler/  # Authentication event handler
│   ├── Banner/           # Hero banner
│   ├── Blog/             # Blog-related components
│   ├── Button/           # Custom button component
│   ├── Chatbot/          # AI chatbot components
│   ├── ContentSideBar/   # Sidebar content components
│   ├── CountdownBanner/  # Countdown banner
│   ├── CountdownTimer/   # Timer component
│   ├── ErrorBoundary/    # Error boundary for error handling
│   ├── Footer/           # Footer component
│   ├── Header/           # Header with navigation
│   ├── HomePage/         # Home page components
│   ├── Info/             # Information components
│   ├── InputCommon/      # Common input components
│   ├── Layout/           # Layout components
│   ├── LoadingSpinner/   # Loading indicator
│   ├── PopularProduct/   # Popular products display
│   ├── ProductItem/      # Product card component
│   ├── SaleHomepage/     # Sale/promotion components
│   ├── Shared/           # Shared utilities
│   ├── SideBar/          # Sidebar drawer
│   └── SliderCommon/     # Common slider
├── contexts/              # React Context providers
│   ├── OurShopProvider.jsx    # Shop page state
│   ├── SideBarProvider.jsx   # Cart, wishlist, compare state
│   ├── storeProvider.jsx     # Global store
│   └── ToastProvider.jsx     # Toast notifications
├── hooks/                 # Custom React hooks
│   ├── useProducts.js    # Products data fetching
│   └── useScroll.js      # Scroll behavior
├── pages/                 # Page components
│   ├── AboutUs/          # About us page
│   ├── Blog/             # Blog page
│   ├── Checkout/         # Checkout page
│   ├── Contact/          # Contact page
│   ├── DetailProduct/    # Product detail page
│   ├── Elements/         # UI elements showcase
│   ├── OrderConfirmation/ # Order confirmation
│   ├── OurShop/          # Shop page
│   └── ViewCart/         # Cart page
├── routers/               # Route configuration
│   └── routers.js        # Route definitions with lazy loading
├── utils/                 # Utility functions
│   └── aiResponseSystem/ # AI chatbot system
│       ├── aiChatbotEngine.js      # Core AI engine
│       ├── aiPersonas.js           # AI personalities
│       ├── chatbotMapping.js       # Chatbot routing
│       ├── contextManager.js       # Context management
│       ├── conversationFlow.js     # Conversation logic
│       ├── exampleConversations.js # Example dialogs
│       ├── intentDetector.js       # Intent recognition
│       ├── productDataIntegration.js # Product data access
│       └── responseGenerator.js    # Response generation
├── constants/             # Application constants
│   └── appConstants.js   # Constants for app-wide use
├── App.jsx               # Main app component
├── main.jsx              # Application entry point
└── setupTests.js         # Test configuration
```

## 🌐 Pages & Routes

| Route                 | Component         | Description                                                 |
| --------------------- | ----------------- | ----------------------------------------------------------- |
| `/`                   | HomePage          | Landing page with banners, popular products, and promotions |
| `/shop`               | OurShop           | Product catalog with filters, sorting, and pagination       |
| `/blog`               | Blog              | Blog posts and articles                                     |
| `/about`              | AboutUs           | Company information and about page                          |
| `/contact`            | Contact           | Contact form and information                                |
| `/elements`           | Elements          | UI elements showcase                                        |
| `/view-cart`          | ViewCart          | Shopping cart page                                          |
| `/checkout`           | Checkout          | Multi-step checkout process                                 |
| `/order-confirmation` | OrderConfirmation | Order success page                                          |
| `/product/:id`        | DetailProduct     | Individual product detail page                              |

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Website-E-Commerce
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview production build:

```bash
npm run preview
```

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests with UI

```bash
npm run test:ui
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

## 🔑 Environment Variables

The application uses the following API endpoint:

- **API Base URL**: `https://be-project-reactjs.onrender.com/api/v1`

For production, configure environment variables in a `.env` file:

```
VITE_API_BASE_URL=https://your-api-url.com/api/v1
```

## 🔐 Authentication

The application uses JWT-based authentication stored in cookies:

- `token`: Access token for API requests
- `refreshToken`: Token for refreshing access tokens
- `userId`: User identifier

Token refresh is handled automatically by axios interceptors when a 401 error is encountered.

## 🛒 Shopping Features

### Cart Management

- Add products with size selection
- Update quantities
- Remove items
- Real-time cart updates
- Persistent cart across sessions (for logged-in users)

### Wishlist

- Add/remove products from wishlist
- Persistent storage using localStorage
- Add all wishlist items to cart

### Product Comparison

- Compare up to 4 products side-by-side
- Persistent storage using localStorage
- Visual indicators for comparison status

### Product Filtering & Sorting

- **Sort Options**: Default, Popularity, Rating, Latest, Price (Low-High), Price (High-Low)
- **Display Options**: Show 8, 12, or all products
- **Search**: Real-time search with debouncing (500ms)
- **Pagination**: Navigate through product pages

## 🤖 AI Chatbot Integration

The application features a sophisticated AI chatbot system with:

### Supported Platforms

- **Webot**: Custom chatbot widget
- **BotLibre**: AI-powered customer support
- **Tawk.to**: Live chat integration

### AI Features

- **Intent Detection**: Understands user queries and intents
- **Context Management**: Maintains conversation context
- **Persona-Based Responses**: Different AI personalities for various scenarios
- **Product Recommendations**: AI can suggest products based on user preferences
- **Natural Language Processing**: Advanced conversation flow management

### AI System Architecture

```
aiResponseSystem/
├── aiChatbotEngine.js      # Core AI processing engine
├── aiPersonas.js           # AI personality definitions
├── chatbotMapping.js       # Route queries to appropriate chatbot
├── contextManager.js       # Manage conversation context
├── conversationFlow.js     # Handle conversation logic
├── intentDetector.js       # Detect user intents
├── productDataIntegration.js # Access product data
└── responseGenerator.js    # Generate AI responses
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations

- Touch-friendly interface
- Simplified navigation with hamburger menu
- Optimized button sizes
- Readable typography scaling
- Swipe gestures for carousels

## 🎨 Styling Approach

- **TailwindCSS**: Utility-first CSS for快速 development
- **SCSS Modules**: Component-scoped styles for complex components
- **Responsive Design**: Mobile-first approach
- **Custom Animations**: AOS for scroll animations
- **Theme**: Modern, clean e-commerce aesthetic

## 🔧 Code Quality

### Linting

```bash
npm run lint
```

### Code Formatting

The project uses Prettier for consistent code formatting. Configuration is in `.prettierrc`.

### ESLint

ESLint configuration with React-specific rules for code quality and consistency.

## 🚀 Deployment

### Vercel

The project includes `vercel.json` for Vercel deployment. Simply connect your repository to Vercel for automatic deployments.

### Manual Deployment

1. Build the project:

```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service.

## 📄 API Documentation

### Authentication Endpoints

- `POST /api/v1/login`: User login
- `POST /api/v1/register`: User registration
- `POST /api/v1/refresh-token`: Refresh access token

### Product Endpoints

- `GET /api/v1/product`: Get products with query parameters
    - `sortType`: Sort option (0-5)
    - `page`: Page number
    - `limit`: Items per page
    - `search`: Search term
- `GET /api/v1/product/:id`: Get product by ID

### Cart Endpoints

- `POST /api/v1/cart`: Add product to cart
- `GET /api/v1/cart/:userId`: Get user's cart
- `DELETE /api/v1/cart/deleteItem`: Remove item from cart

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is private and proprietary.
