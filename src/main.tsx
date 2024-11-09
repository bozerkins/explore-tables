import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { helloAnything } from '../';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>{helloAnything("baby")}</div>
  </StrictMode>,
)
