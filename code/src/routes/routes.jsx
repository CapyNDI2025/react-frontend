import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PagHome from '../pages/PagHome'
import PagGodot from '../pages/PagGodot'
import DocumentsTableView from '../modules/documentsView/DocumentsTableView'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PagHome />} />
      <Route path="/godot" element={<PagGodot />} />
      <Route path="*" element={<div>404</div>} />
      <Route path="/resources" element={ <DocumentsTableView />} />
    </Routes>
  )
}

export default AppRoutes
