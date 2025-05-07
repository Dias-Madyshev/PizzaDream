import React from 'react'

import './scss/app.scss'
import Header from './components/Header'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import Cart from './Pages/Cart'

function App() {
  const [searchInput, setSeatchInput] = React.useState('')
  return (
    <div className="wrapper">
      <Header searchInput={searchInput} setSeatchInput={setSeatchInput} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchInput={searchInput} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
