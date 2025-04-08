import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./pages/LandingPg/style/flexboxgrid.min.css";
import './pages/LandingPg/style/index.css';
import { ChakraProvider } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    
    
      <ChakraProvider  resetCss={false}>
        
            <App />
          
      </ChakraProvider>
    

    
)
