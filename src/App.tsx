import { useState } from 'react'
import './App.scss'
import { Toolbar } from './components/Toolbar/Toolbar'
import { Topbar } from './components/Topbar/Topbar'
import { CardPage } from './Pages/CardPage/CardPage'

function App() {
  const [showToolbar] = useState(false)

  return (
    <div className={`app ${showToolbar ? "with-toolbar" : ""}`} >
      <Topbar />
      <Toolbar />
      <div className="content">
        <CardPage />
      </div>
    </div>

  )
}

export default App
