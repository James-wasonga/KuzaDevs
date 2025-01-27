import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <Router>
    <StrictMode>
      <App />
    </StrictMode>
    </Router>
  </ThirdwebProvider>
)
