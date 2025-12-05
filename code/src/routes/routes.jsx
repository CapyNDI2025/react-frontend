import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PagHome from '../pages/PagHome'
import PagGodot from '../pages/PagGodot'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PagHome />} />
      <Route path="/godot" element={<PagGodot />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  )
}

export default AppRoutes
