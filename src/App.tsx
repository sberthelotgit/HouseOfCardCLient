import { useState } from 'react'
import { Outlet } from 'react-router'
import './App.scss'
import { Topbar } from './components/Topbar/Topbar'

function App() {
  const [showToolbar] = useState(false)

  return (
    <div className={`app ${showToolbar ? "with-toolbar" : ""}`} >
      <Topbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default App
