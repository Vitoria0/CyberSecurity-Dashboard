import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/theme.jsx';
import AppWrapper from './app/App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<AppWrapper />
			</ThemeProvider>
	</React.StrictMode>,
);
