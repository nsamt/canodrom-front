import { AuthLayout } from "@/components/AuthLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import { Form } from "@/pages/form/Form";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/form", element: <Form /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
