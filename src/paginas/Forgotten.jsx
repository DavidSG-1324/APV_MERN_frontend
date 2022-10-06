import {useState} from 'react';
import Aviso from '../componentes/Aviso.jsx';
import clienteAxios from '../config/axios.jsx';
import {Link} from 'react-router-dom';

const Forgotten = () => {
	const [email, setEmail] = useState('');
	const [aviso, setAviso] = useState({});

	const handleSubmit = async evento => {
		evento.preventDefault();

		if(email === '') {
			setAviso({msg: 'Es necesario agregar un Email', error: true});
			return;
		}

		setAviso({});

		try {
			const url = '/veterinarios/forgotten';

			const resultado = await clienteAxios.post(url, {
				email
			});

			const {data} = resultado;

			setAviso({msg: data.msg, error: false});

		} catch(error) {
			setAviso({msg: error.response.data.msg, error: true});
		}
	}

	const {msg} = aviso;	

	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-6xl">
					Recupera tu Acceso y no pierdas tus <span className="text-black">Pacientes</span>
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

					<input 
						type="submit"
						value="Recuperar Cuenta"
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
						to="/create-account">
						¿Aún no tienes una Cuenta? Crea una
					</Link>
				</nav>
			</div>
		</>
	)
}

export default Forgotten;

