import axios from "axios"
import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import {
  AuthProvider,
  ErrorBoundary,
  Loading,
} from "@platforms/react-components"

import App from "./app"
import "./index.css"

axios.interceptors.request.use((config) => config)

axios.interceptors.response.use(
  ({ data }) => data,
  ({ response: { status, data } }) => {
    // TODO: handle web errors
    if (status === 401) {
      // Handle unauthorized access
    } else if (status === 400) {
      // Handle business validation
    } else if (status === 404) {
      // Handle not found errors
    } else {
      // Handle other errors
    }

    throw data
  }
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <AuthProvider>
            <ToastContainer
              autoClose={3500}
              closeOnClick={true}
              position="top-center"
              hideProgressBar
            />
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
)
