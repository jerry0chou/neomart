import React from 'react'
import NeoRouter from './router'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <NeoRouter />
    </Provider>
  )
}

export default App
