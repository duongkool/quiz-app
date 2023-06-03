import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Quiz from "./components/quiz/listQuiz.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
