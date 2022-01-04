import "./App.css"
import AppForm from "./components/AppForm"
import AppClock from "./components/AppClock"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppForm />} />
      <Route path="/clock" element={<AppClock />} />
    </Routes>
  )
}

export default App
