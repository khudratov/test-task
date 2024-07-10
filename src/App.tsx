import { MainRouter } from './routers';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store.ts';

function App() {
	return (
		<div>
			<Provider store={store}>
				<MainRouter />
				<ToastContainer />
			</Provider>
		</div>
	);
}

export default App;
