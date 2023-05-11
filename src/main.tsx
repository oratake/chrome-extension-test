import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ListApp from './ListApp.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ListApp />
  </React.StrictMode>,
)
