import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button, ConfigProvider } from 'antd';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#00b96b',
				},
			}}>
			<App />
		</ConfigProvider>
	</React.StrictMode>,
);
