import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51TELwTLJQAjcjQyyfPNO0ZMGLk6cWdgDfvU7TUvXkt9DCMDGxAnoZmXcXiwv1pF25051dIP3EyNDoQSgBsVeDTQN003uMiqa1E");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < Elements stripe={stripePromise}>
    <App />
    </Elements>
  </StrictMode> ,
)