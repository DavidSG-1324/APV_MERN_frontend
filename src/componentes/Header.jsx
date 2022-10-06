import useAuth from '../hooks/useAuth.jsx';
import {Link} from 'react-router-dom';

const Header = () => {
	const Auth = useAuth();
	const {cerrarSesion} = Auth; 

	return (
		<header className="py-10 bg-indigo-600">
			<div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
				<h1 className="text-indigo-200 font-bold text-2xl">
					Administrador de Pacientes de <span className="text-white font-black">Veterinaria</span>
				</h1>

				<nav className="mt-5 lg:mt-0 flex flex-col lg:flex-row gap-4 items-center">
					<Link
						className="text-white font-bold uppercase text-sm"
						to="/admin">
						Pacientes
					</Link>
					<Link
						className="text-white font-bold uppercase text-sm"
						to="/admin/perfil">
						Perfil
					</Link>

					<button
						className="text-white font-bold uppercase text-sm"
						type="button"
						onClick={cerrarSesion}>
						Cerrar Sesión
					</button>
				</nav>
			</div>
		</header>
	)
}

export default Header;

