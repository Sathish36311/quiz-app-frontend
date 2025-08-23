# AI-Powered Quiz Application (Frontend)

This is the **Next.js frontend** for the AI-Powered Quiz Application.  
It provides a responsive UI where users can register/login, generate quizzes using AI, take them, and review their results.

---

## 🚀 Tech Stack
- [Next.js](https://nextjs.org/)
- Plain **CSS Modules** for styling
- [Axios](https://axios-http.com/) for API calls

---

## 📂 Project Structure
```
quiz-app-frontend/
│── public/ # Static assets (favicon, images, etc.)
│── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Next.js pages
│ │ ├── index.tsx # Homepage
│ │ ├── auth.tsx # Login/Register page
│ │ ├── quiz.tsx # Quiz creation page
│ │ ├── history.tsx # Quiz history page
│ │ └── api/ # API integration layer
│ ├── styles/ # CSS files (module.css)
│ ├── types/ # TypeScript types/interfaces
│ └── utils/ # Helper functions
│── package.json
│── .env.local # Environment variables
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quiz-frontend.git
   cd quiz-frontend
   ```
2. **Install dependencies**
   ```
   npm install
   # or
   yarn install
   ``` 
4. **Setup environment variables in .env.local**
   ```
   NEXT_PUBLIC_BASE_URL=http://localhost:8000/api
   ```
5. **Open http://localhost:3000**

---

## Features
- User authentication (login/register)
- Quiz creation (topic, difficulty, number of questions)
- AI-generated questions
- Quiz-taking with progress tracking
- Review past quiz results

---

## Build for Production
```
   npm run build
   npm start
```
---
## I faced a few challenges while building a quiz application using NestJS and Django:

- Difficulty in parsing and handling AI responses effectively
- Limited understanding of how different components communicate with each other
- Lack of clarity on the standard practices to follow for folder structure and file organization
