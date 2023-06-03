import { useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Quiz from "./components/quiz/listQuiz.jsx";

const LayOut = () => {
  return (
    <>
      <div className="container">
        <div className="main-container">
          <div className="home-page">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      errorElement: <>404 err</>,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/quiz",
          element: <Quiz />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
