import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Patient from './components/Patient'
import About from './components/About'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <>
      <nav>
        <Link to="/homepage">Home</Link> | <Link to="/about">About</Link> |{' '}
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/homepage" element={<Patient />}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/homepage" replace />} />
      </Routes>
    </>
  )
}

export default App