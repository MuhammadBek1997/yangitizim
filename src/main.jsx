import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode olib tashlandi — anime.js animatsiyalari bilan muammo qiladi
createRoot(document.getElementById('root')).render(<App />)
