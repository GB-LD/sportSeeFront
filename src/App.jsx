import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import LeftPannel from "./components/LeftPannel";
import Error404Page from "./pages/Error404Page";


function App() {
  const apiPath = "http://localhost:3000/"
  const mockPath = "../public/mocks/"
  const isConnectedToBack = false;

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex min-h-screen">
        <LeftPannel />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/12" />} />
            <Route path="/dashboard/:id"
              element={
                <Dashboard
                apiPath={apiPath}
                mockPath={mockPath}
                isConnectedToBack={isConnectedToBack}
                />
              }>
            </Route>
            <Route path="*" element={<Error404Page />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
