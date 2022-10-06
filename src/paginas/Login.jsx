import useAuth from '../hooks/useAuth.jsx';
import {useState} from 'react';
import Aviso from '../componentes/Aviso.jsx';
import clienteAxios from '../config/axios.jsx';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
	const Auth = useAuth();
	const {setAuth} = Auth;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [aviso, setAviso] = useState({});

	const navigate = useNavigate();

	const handleSubmit = async evento => {
		evento.preventDefault();

		if([email, password].includes('')) {
			setAviso({msg: 'Todos los campos son obligatorios', error: true});
			return;
		}

		setAviso({});

		try {
			const url = '/veterinarios';

			const resultado = await clienteAxios.post(url, {
				email,
				password
			});

			const {data} = resultado;

			setAuth(data);

			localStorage.setItem('jwt', data.jwt);

			navigate('/admin');

		} catch(error) {
			setAviso({msg: error.response.data.msg, error: true});
		}
	}

	const {msg} = aviso;

	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-6xl">
					Inicia Sesión y Administra tus <span className="text-black">Pacientes</span>
				</h1>
			</div>
			
			<div className="shadow-lg rounded-xl bg-white px-5 py-10 mt-20 md:mt-5">

				{msg &&
					<Aviso
						aviso={aviso}
					/>
				}
				<form onSubmit={handleSubmit}>
					<div className="my-5">
						<label htmlFor="email" className="text-gray-600 font-bold uppercase text-xl block">
							Email
						</label>
						<input
							id="email"
							type="email"
							placeholder="Tu Correo Electrónico"
							className="border rounded-xl bg-gray-50 w-full p-3 mt-3"
							value={email}
							onChange={evento => setEmail(evento.target.value)}
						/>
					</div>

					<div className="my-5">
						<label htmlFor="password" className="text-gray-600 font-bold uppercase text-xl block">
							Contraseña
						</label>
						<input
							id="password"
							type="password"
							placeholder="Tu Contraseña"
							className="border rounded-xl bg-gray-50 w-full p-3 mt-3"
							onChange={evento => setPassword(evento.target.value)}
						/>
					</div>

					<input 
						type="submit"
						className="rounded-xl bg-indigo-700 w-full px-10 py-3 text-white font-bold uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
						value="Iniciar Sesión"
					/>
				</form>

				<nav className="mt-10 lg:flex lg:justify-between">
					<Link
						className="block text-center my-5 text-gray-500"
						to="/create-account">
						¿Aún no tienes una Cuenta? Crea una
					</Link>
					<Link
						className="block text-center my-5 text-gray-500"
						to="/forgotten">
						¿Olvidaste tu Contraseña?
					</Link>
				</nav>
			</div>
		</>
	)
}

export default Login;

