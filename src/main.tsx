// ⚡ PONTO DE ENTRADA DA APLICAÇÃO REACT
// Este arquivo "inicializa" toda a aplicação React no navegador

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'     // Estilos globais + Tailwind CSS
import App from './App.tsx' // Componente principal da aplicação

// Conecta o React com o elemento HTML de id="root"
// StrictMode = modo de desenvolvimento que detecta problemas
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App /> {/* Toda aplicação começa aqui */}
  </StrictMode>,
)
