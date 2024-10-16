import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import LeftPannel from "./components/LeftPannel"


function App() {
  const apiPath = "http://localhost:3000/"
  const mockPath = "../public/mocks/"
  const isConnectedToBack = false;
  const userId=12;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex">
        <LeftPannel />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard"
              element={
                <Dashboard
                apiPath={apiPath}
                mockPath={mockPath}
                isConnectedToBack={isConnectedToBack}
                userId={userId}
                />
              }>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
