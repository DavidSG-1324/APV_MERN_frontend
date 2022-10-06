import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Aviso from '../componentes/Aviso.jsx';
import clienteAxios from '../config/axios.jsx';

const Recover = () => {
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');
	const [tokenValido, setTokenValido] = useState(false);
	const [passwordModificado, setPasswordModificado] = useState(false);

	const [aviso, setAviso] = useState({});

	const params = useParams();

	let {token} = params;
	token = token.split(':')[1];

	useEffect(() => {
		const confirmarToken = async () => {
			try {
				const url = `/veterinarios/recover:${token}`;

				const resultado = await clienteAxios(url);

				const {data} = resultado;

				setTokenValido(true);
				setAviso({msg: data.msg, error: false});

			} catch(error) {
				setAviso({msg: error.response.data.msg, error: true});
			}
		}

		confirmarToken();
	}, []);

	const handleSubmit = async evento => {
		evento.preventDefault();

		if([password, repetirPassword].includes('')) {
			setAviso({msg: 'Todos los campos son obligatorios', error: true});
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

		try {
			const url = `/veterinarios/recover:${token}`;

			const resultado = await clienteAxios.post(url, {
				password
			});

			const {data} = resultado;

			setPasswordModificado(true);
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
					Reestablece tu <span className="text-black">Contraseña</span>
				</h1>
			</div>

			<div className="shadow-lg rounded-xl bg-white px-5 py-10 mt-20 md:mt-5">

				{msg &&
					<Aviso
						aviso={aviso}
					/>
				}

				{tokenValido && !passwordModificado &&
					<form onSubmit={handleSubmit}>
						<div className="my-5">
							<label htmlFor="password" className="text-gray-600 font-bold uppercase text-xl block">
								Contraseña
							</label>
							<input
								id="password"
								type="password"
								placeholder="Tu Nueva Contraseña"
								className="border rounded-xl bg-gray-50 w-full p-3 mt-3"
								onChange={evento => setPassword(evento.target.value)}
							/>
						</div>

						<div className="my-5">
							<label htmlFor="confirm" className="text-gray-600 font-bold uppercase text-xl block">
								Confirmar Contraseña
							</label>
							<input
								id="confirm"
								type="password"
								placeholder="Ingresa nuevamente tu Contraseña"
								className="border rounded-xl bg-gray-50 w-full p-3 mt-3"
								onChange={evento => setRepetirPassword(evento.target.value)}
							/>
						</div>

						<input 
							type="submit"
							value="Guardar Contraseña"
							className="rounded-xl bg-indigo-700 w-full px-10 py-3 text-white font-bold uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
						/>
					</form>
				}

				{!passwordModificado &&
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
				}

				{passwordModificado &&
					<Link
						className="block text-center my-5 text-gray-500"
						to="/">
						Inicia Sesión
					</Link>
				}				
			</div>
		</>
	)
}

export default Recover;

