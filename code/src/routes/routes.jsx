import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PagHome from '../pages/PagHome'
import PagGodot from '../pages/PagGodot'
import PagAbout from '../pages/PagAbout'
import PagCredits from '../pages/PagCredits'
import DocumentsTableView from '../modules/documentsView/DocumentsTableView'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PagHome />} />
      <Route path="/godot" element={<PagGodot />} />
      <Route path="/about" element={<PagAbout />} />
      <Route path="/credits" element={<PagCredits />} />
      <Route path="*" element={<div>404</div>} />
      <Route path="/resources" element={ <DocumentsTableView />} />
    </Routes>
  )
}

export default AppRoutes
