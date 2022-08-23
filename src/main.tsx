import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.body.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
