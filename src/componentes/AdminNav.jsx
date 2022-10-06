import {Link} from 'react-router-dom';

const AdminNav = () => {
	return (
		<nav className="flex gap-3 mx-5">
{/*			<Link
				className="text-gray-500 font-bold uppercase"
				to="/admin/perfil">
				Perfil
			</Link>*/}
			<Link
				className="text-gray-500 font-bold uppercase"
				to="/admin/cambiar-password">
				Cambiar Contraseña
			</Link>
		</nav>
	)
}

export default AdminNav;

