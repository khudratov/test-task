import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { MainRouter } from './routers';
import { store } from './app/store.ts';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Provider store={store}>
				<CssBaseline />

				<MainRouter />

				<ToastContainer />
			</Provider>
		</LocalizationProvider>
	);
}

export default App;
