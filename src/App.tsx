import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import EditorDashboardPage from './pages/EditorDashboardPage';
import LoginPage from './pages/LoginPage';
import FinanzasPage from './pages/FinanzasPage';
import JuridicoPage from './pages/JuridicoPage';
import ComunicacionPage from './pages/ComunicacionPage';
import TerritorialPage from './pages/TerritorialPage';
import EstrategiaPage from './pages/EstrategiaPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <>
            <Navbar />
            <DashboardPage />
          </>
        } />
        <Route path="/dashboard/editor" element={
          <>
            <Navbar />
            <EditorDashboardPage />
          </>
        } />
        <Route path="/finanzas" element={
          <>
            <Navbar />
            <FinanzasPage />
          </>
        } />
        <Route path="/juridico" element={
          <>
            <Navbar />
            <JuridicoPage />
          </>
        } />
        <Route path="/comunicacion" element={
          <>
            <Navbar />
            <ComunicacionPage />
          </>
        } />
        <Route path="/territorial" element={
          <>
            <Navbar />
            <TerritorialPage />
          </>
        } />
        <Route path="/estrategia" element={
          <>
            <Navbar />
            <EstrategiaPage />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;