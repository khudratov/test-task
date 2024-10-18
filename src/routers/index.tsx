import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Todos from '../pages/Todos.tsx';
import AuthLayout from '../layouts/AuthLayout.tsx';

export const MainRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<AuthLayout />}>
					<Route path="" element={<Navigate to={'todos'} />} />
					<Route path="todos" element={<Todos />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default MainRouter;
