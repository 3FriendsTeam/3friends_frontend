import { Route, Routes } from "react-router-dom";
import CustomerRegister from "./pages/customer/caseCustomer/CustomerRegister";
import './App.css'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<CustomerRegister />} />
    </Routes>
    </>
  )
}

export default App
