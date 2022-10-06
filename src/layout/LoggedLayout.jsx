import useAuth from '../hooks/useAuth.jsx';
import {Outlet, Navigate} from 'react-router-dom';

import Header from '../componentes/Header.jsx';
import Footer from '../componentes/Footer.jsx';

const LoggedLayout = () => {
	const Auth = useAuth();
	const {auth, cargando} = Auth;

	if(cargando) return 'cargando...';

	return (
		<>
			<Header />
				{/*{auth.perfil?._id ? (*/}
				{auth?._id ? (
					<main className="container mx-auto mt-10">
						<Outlet />
					</main>
				) : <Navigate to="/" />}
			<Footer />
		</>
	)
}

export default LoggedLayout;

