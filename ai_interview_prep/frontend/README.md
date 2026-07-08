# AI Multi-Agent Interview Preparation Platform

## Overview

AI Multi-Agent Interview Preparation Platform is a full-stack AI application that helps users prepare for technical interviews through personalized interview simulations. Users upload their resumes, receive AI-generated interview questions, answer them, and obtain detailed feedback along with personalized study recommendations.

---

## Features

- Resume Upload and Parsing
- AI-generated Interview Questions
- Multi-Agent Answer Evaluation
- Personalized Feedback
- Study Plan Generation
- Semantic Resume Search using ChromaDB
- RESTful API Architecture
- Responsive React Frontend

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- FastAPI
- Python
- REST APIs

### AI & NLP
- LangChain
- Google Gemini / OpenAI
- Retrieval-Augmented Generation (RAG)
- PDF Parsing (PyPDF)

### Databases
- MongoDB
- ChromaDB (Vector Database)

---

## Project Architecture

Frontend (React)
        │
        ▼
FastAPI Backend
        │
 ┌──────┴─────────┐
 │                │
 ▼                ▼
MongoDB      ChromaDB
 │                │
 └──────┬─────────┘
        ▼
 LangChain Agents
        │
        ▼
 Gemini / OpenAI LLM

---

## Workflow

1. User uploads a resume.
2. Resume text is extracted from the PDF.
3. Embeddings are generated and stored in ChromaDB.
4. AI generates interview questions based on the resume.
5. User submits answers.
6. Multiple AI agents evaluate the responses.
7. Personalized feedback and scores are generated.
8. A customized study plan is recommended.

---

## API Modules

- Resume Upload API
- Interview Question API
- Feedback API

---

## AI Agents

- Resume Agent
- Question Generation Agent
- Evaluation Agent
- Feedback Agent
- Study Plan Agent
- Job Recommendation Agent

---

## Folder Structure

backend/
│
├── app/
│   ├── agents/
│   ├── api/
│   ├── database/
│   ├── models/
│   ├── services/
│   └── main.py
│
frontend/
│
├── src/
├── components/
├── pages/
└── App.jsx

---

## Installation

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Future Improvements

- JWT Authentication
- Voice-based Interviews
- Real-time Coding Assessments
- Docker Deployment
- AWS Hosting
- GitHub Actions CI/CD
- Interview Analytics Dashboard
- Interview History
- Role-Based Access Control

---

## Skills Demonstrated

- Full Stack Development
- REST API Design
- React Development
- FastAPI Development
- AI Application Development
- LangChain Integration
- Vector Databases
- MongoDB
- Prompt Engineering
- Retrieval-Augmented Generation (RAG)
- System Integration

---

## License

MIT License