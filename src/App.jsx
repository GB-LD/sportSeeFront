import { BrowserRouter, Routes, Route, Router } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import LeftPannel from "./components/LeftPannel"


function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <LeftPannel />
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
