# Intervu.AI MERN

A full-stack AI-powered platform to practice job interviews with instant feedback. Users can generate realistic interview questions, conduct voice-based interviews with an AI recruiter, and receive feedback to improve their performance.

---

## Features

- **AI-Powered Interview Generation:** Generate role-specific, technical, and behavioral interview questions using Google Gemini AI.
- **Voice Interview Simulation:** Conduct interviews with a human-like AI recruiter using Vapi voice technology.
- **Instant Feedback:** Get feedback on your interview performance.
- **User Authentication:** Sign up, sign in, and manage your interview history.
- **Modern UI:** Responsive, user-friendly interface built with React and TailwindCSS.

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS, Vapi AI SDK
- **Backend:** Node.js, Express, MongoDB, Mongoose, Google Generative AI
- **Other:** JWT Auth, Axios, Cookie-based sessions

---

## Project Structure

```
Intervu.AI MERN/
  backend/      # Express API, MongoDB models, controllers, routes
  frontend/     # React app, Vite, TailwindCSS, API integration
```

---

## Environment Variables

### Frontend (`frontend/.env`)
```
VITE_API_URL=         # URL of the backend API (e.g., http://localhost:8007/api/)
VITE_PUBLIC_VAPI_TOKEN=      # Vapi AI public token
VITE_PUBLIC_VAPI_WORKFLOW_ID=# Vapi AI workflow ID
```

### Backend (`backend/.env`)
```
PORT=8007
MONGO_URI=            # MongoDB connection string
SECRET_KEY=           # JWT secret key
GOOGLE_GENERATIVE_AI_API_KEY= # Google Gemini API key
```

---

## Vapi Account & Workflow Setup

### 1. Create a Vapi Account

1. Go to [dashboard.vapi.ai](https://dashboard.vapi.ai) and sign up for a free account.
2. Verify your email address and log in to the dashboard.

### 2. Create a New Workflow

1. In the Vapi dashboard, click **Workflows** in the left sidebar.
2. Click **Create Workflow**.
3. Enter a name for your workflow (e.g., `Interview Voice Agent`).
4. Select the blank template and click **Create Workflow**.

### 3. Configure Workflow Nodes

#### a. Start Node (Greeting)
- Click the start node and set the **First Message** to greet the user (e.g., "Hello! Welcome to your AI-powered interview.").
- Set the **Prompt** to introduce the interview and ask the first question.

#### b. Add Question Nodes
- Click the **+** button to add a new **Conversation Node** for each interview question.
- In each node, set the prompt to ask a specific interview question.
- (Optional) Use **Extract Variables** to capture user responses if you want to store or use them later.

#### c. Add Feedback or Dynamic Response Node
- Add a **Conversation Node** after the questions to provide feedback or a closing message.
- Use variables (e.g., `{{first_name}}`) in your prompt for personalization.

#### d. Add End Call Node
- Add an **End Call Node** at the end of your workflow.
- Set the message to thank the user and end the call (e.g., "Thank you for participating! Goodbye.").

#### e. (Optional) Add Global Escalation Node
- Add a **Global Node** for escalation (e.g., transfer to a human) if needed.
- Configure the prompt and transfer settings as required.

### 4. Save and Test Your Workflow

- Click **Save** to store your workflow.
- Use the **Call** button in the top right to test your workflow live.

### 5. Get Your Workflow ID and API Token

- In the workflow details, copy the **Workflow ID**.
- Go to your account settings or dashboard to find your **Public Vapi Token**.
- Add these values to your `frontend/.env` file as `VITE_PUBLIC_VAPI_WORKFLOW_ID` and `VITE_PUBLIC_VAPI_TOKEN`.

**For more details and advanced configuration, see the [Vapi Workflows Documentation](https://docs.vapi.ai/workflows).**

---

## Installation & Running the Project

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### 1. Clone the repository

```bash
git clone <repo-url>
cd Intervu.AI\ MERN
```

### 2. Setup Backend

```bash
cd backend
npm install
# Create a .env file and fill in the required variables
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
# Create a .env file and fill in the required variables
npm run dev
```

- The frontend will run on [http://localhost:5173](http://localhost:5173) by default.
- The backend will run on [http://localhost:8007](http://localhost:8007) by default.

---

## Scripts

### Backend

- `npm run dev` — Start backend with nodemon (auto-reloads on changes)
- `npm start` — Start backend

### Frontend

- `npm run dev` — Start frontend in development mode
- `npm run build` — Build frontend for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code

---

## License

This project is licensed under the ISC License. 