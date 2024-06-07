import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Root from './_components/Root.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<>
		<Root>
			<App />
		</Root>
	</>,
)
