import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailsPage from './pages/NoteDetailsPage'
import Navbar from './components/NavLink'
import toast from 'react-hot-toast'

function App() {
  return (
    <>
      <Navbar />
      <button onClick={() => toast.success('Congrates')}>Click Me</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createPage" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />
      </Routes>
    </>
  )
}

export default App
