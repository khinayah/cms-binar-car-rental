import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SearchProvider } from './context/SearchProvider.jsx'
import { SidebarProvider } from './context/SidebarProvider.jsx'
import { LayoutProvider } from './context/LayoutProvider.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
    <LayoutProvider>
      <SidebarProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </SidebarProvider>
    </LayoutProvider>
    </Provider>
  </BrowserRouter>
)
