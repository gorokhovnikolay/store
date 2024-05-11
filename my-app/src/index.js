import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from './store';
import './index.css';
import { store } from './storeRtk/store.ts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Store />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
