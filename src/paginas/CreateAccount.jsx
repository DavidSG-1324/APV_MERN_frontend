import {useState} from 'react';
import Aviso from '../componentes/Aviso.jsx';
// import axios from 'axios';
import clienteAxios from '../config/axios.jsx';
import {Link} from 'react-router-dom';

const CreateAccount = () => {
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');

	const [aviso, setAviso] = useState({});

	const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const handleSubmit = async evento => {
		evento.preventDefault();

		if([nombre, email, password, repetirPassword].includes('')) {
			setAviso({msg: 'Todos los campos son obligatorios', error: true});
			return;
		}

		if(!isNaN(nombre)) {
			setAviso({msg: 'Nombre no válido', error: true});
			return;
		}

		if(!regexEmail.test(email)) {
			setAviso({msg: 'El Email no es válido', error: true});
			return;
		}

		if(password.length < 8) {
			setAviso({msg: 'La Contraseña debe ser de al menos 8 caracteres', error: true});
			return;
		}

		if(password !== repetirPassword) {
			setAviso({msg: 'Las Contraseñas no Coinciden', error: true});
			return;
		}

		setAviso({});

		// Crear usuario en la API
		try {
			// const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/create-account`;
			// await axios.post(url, {
			// 	nombre,
			// 	email,
			// 	password
			// });

			const url = '/veterinarios/create-account';
			await clienteAxios.post(url, {
				nombre,
				email,
				password
			});

			setAviso({msg: 'Registro Correcto, Revisa tu Email', error: false});

		} catch(error) {
			setAviso({msg: error.response.data.msg, error: true});
		}
	}

	const {msg} = aviso;

	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-6xl">
					Crea una Cuenta para Administrar tus{" "}<span className="text-black">Pacientes</span>
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
						<label htmlFor="name" className="text-gray-600 font-bold uppercase text-xl block">
							Nombre
						</label>
						<input
							id="name"
							type="text"
							placeholder="Tu Nombre"
							className="border rounded-xl bg-gray-50 w-full p-3 mt-3"
							value={nombre}
							onChange={evento => setNombre(evento.target.value)}
						/>
					</div>

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
							placeholder="Al menos 8 caracteres"
							className="border rounded-xl bg-gray-50 w-full p-3 mt-3"
							onChange={evento => setPassword(evento.target.value)}
						/>
					</div>

					<div className="my-5">
						<label htmlFor="confirma" className="text-gray-600 font-bold uppercase text-xl block">
							Confirmar Contraseña
						</label>
						<input
							id="confirma"
							type="password"
							placeholder="Ingresa nuevamente tu Contraseña"
							className="border rounded-xl bg-gray-50 w-full p-3 mt-3"
							onChange={evento => setRepetirPassword(evento.target.value)}
						/>
					</div>

					<input 
						type="submit"
						value="Crear Cuenta"
						className="rounded-xl bg-indigo-700 w-full px-10 py-3 text-white font-bold uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
					/>
				</form>

				<nav className="mt-10 lg:flex lg:justify-between">
					<Link
						className="block text-center my-5 text-gray-500"
						to="/">
						¿Ya tienes una Cuenta? Inicia Sesión
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

export default CreateAccount;

