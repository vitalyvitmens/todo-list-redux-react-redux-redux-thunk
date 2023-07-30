import React from 'react'
import ReactDOM from 'react-dom/client'
// import { TodoProvider } from './hooks/useTodos'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import { App } from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		{/* <TodoProvider> */}
			<Provider store={store}>
				<App />
			</Provider>
		{/* </TodoProvider> */}
	</React.StrictMode>
)
