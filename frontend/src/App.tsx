import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import RegistrationPage from './pages/RegistrationPage.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import Home from './pages/Home.tsx'
import { AppLayout } from './AppLayout.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InterviewPage from './pages/InterviewPage.tsx';
import FeedbackPage from './pages/FeedbackPage.tsx';

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <RegistrationPage/>
  },
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "interview",
        element: <InterviewPage type='generate'/>,
      },
      {
        path: "interview/:id",
        element: <InterviewPage type='conduct'/>
      },
      {
        path: "interview/:id/feedback",
        element: <FeedbackPage />
      }
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </>
  );
}

export default App
