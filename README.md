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
## Challenges Faced

While developing the quiz application using **NestJS** and **Django**, I encountered the following challenges:
- Parsing and handling AI responses effectively  
- Understanding component-to-component communication  
- Lack of clarity on standard practices for folder structure and file organization  

## Planned Improvements

There are several features I planned to implement but haven’t yet:
- **Authentication Guard** to secure routes  
- **Automatic logout on token expiry**  
- **Table filters** for easier data management  
- **Toast notifications** for user feedback  
- **Pagination** for handling large datasets  
- **Global error handling** for consistent error responses  
- Restricting navigation so that users can proceed to the next question only after answering the current one.
  
---
