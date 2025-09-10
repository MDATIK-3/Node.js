import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailsPage from './pages/NoteDetailsPage'
import toast from 'react-hot-toast'

function App() {
  return (
    <div data-theme='forest'>
      {/* <button onClick={() => toast.success('Congrates')}>Click Me</button> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
