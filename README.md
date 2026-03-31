# Nexcart - Modern E-Commerce Platform

A full-stack e-commerce application built with the MERN stack, featuring a professional black, white, and gray design aesthetic.

## 🚀 Features

- **Modern UI/UX**: Professional black, white, and gray color scheme
- **Product Management**: Create, read, update, and delete products
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Toast Notifications**: User-friendly feedback system
- **Newsletter Subscription**: Functional email capture
- **Smooth Animations**: Professional micro-interactions

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **Lucide React** - Modern icon library
- **React Hot Toast** - Beautiful toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **MongoDB Atlas** - Cloud database hosting

## 📦 Project Structure

```
store-mern/
├── backend/
│   ├── config/
│   │   └── db.js          # Database connection
│   ├── models/
│   │   └── Product.js     # Product schema
│   ├── routes/
│   │   └── product.router.js # API routes
│   └── server.js          # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreatePage.jsx
│   │   │   └── UpdatePage.jsx
│   │   └── main.jsx
│   ├── public/
│   │   └── favicon.svg
│   └── index.html
├── .env                  # Environment variables
└── package.json           # Root package.json
```

## 🚀 Deployment

### Environment Variables
Create a `.env` file with:
```env
PORT=2000
MONGO_URI=your_mongodb_connection_string
```

### Frontend Build
```bash
cd frontend
npm run build
```

### Backend Start
```bash
npm start
```

## 🎨 Design System

- **Primary Colors**: Black, White, Gray
- **Typography**: Clean, modern sans-serif
- **Animations**: Smooth transitions (300-500ms)
- **Layout**: Responsive grid system
- **Components**: Reusable and modular

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
cd frontend && npm run build
```

## 📄 License

ISC License
