import useAuth from '../hooks/useAuth.jsx';
import {useState} from 'react';
import Aviso from '../componentes/Aviso.jsx';
import AdminNav from '../componentes/AdminNav.jsx';

const CambiarPassword = () => {
	const Auth = useAuth();
	const {actualizarPassword} = Auth;

	const [password, setPassword] = useState({
		actual: '',
		nuevo: '',
		confirma: ''
	});

	const [aviso, setAviso] = useState({});

	const handleSubmit = async evento => {
		evento.preventDefault();

		const {actual, nuevo, confirma} = password;

		if(Object.values(password).some(campo => campo === '')) {
			setAviso({msg: 'Todos los campos son obligatorios', error: true});
			return;
		}

		if(nuevo.length < 8) {
			setAviso({msg: 'La Contraseña debe ser de al menos 8 caracteres', error: true});
			return;
		}

		if(nuevo !== confirma) {
			setAviso({msg: 'Las Contraseñas no Coinciden', error: true});
			return;
		}

		setAviso({});

		// const respuesta = await actualizarPassword(password);
		const respuesta = await actualizarPassword({
			actual,
			nuevo
		});

		setAviso(respuesta);

		if(!respuesta.error) {
			setPassword({
				actual: '',
				nuevo: '',
				confirma: ''
			});

			document.querySelector('#actual').value = '';
			document.querySelector('#nuevo').value = '';
			document.querySelector('#confirma').value = '';

			setTimeout(() => {
				setAviso({});
			}, 3000);
		}
	}

	const {msg} = aviso;

	return (
		<>
			{/*<AdminNav />*/}

			<h2 className="text-center font-black text-3xl mt-10">Cambiar Contraseña</h2>

			<p className="text-center text-xl mt-5 mb-10">
				Ingresa <span className="text-indigo-600 font-bold">aquí</span> tu nueva Contraseña
			</p>

			<div className="flex justify-center">
				<div className="shadow rounded bg-white p-5 w-full md:w-1/2">

					{msg &&
						<Aviso
							aviso={aviso}
						/>
					}
					<form onSubmit={handleSubmit}>
						<div className="my-5">
							<label htmlFor="actual" className="text-gray-600 font-bold uppercase block">
								Contraseña Actual
							</label>
							<input
								id="actual"
								type="password"
								name="actual"
								placeholder="Tu Contraseña"
								className="border rounded-lg bg-gray-50 w-full p-2 mt-2"
								onChange={evento => setPassword({
									...password,
									[evento.target.name]: evento.target.value
								})}
							/>
						</div>

						<div className="my-5">
							<label htmlFor="nuevo" className="text-gray-600 font-bold uppercase block">
								Nueva Contraseña
							</label>
							<input
								id="nuevo"
								type="password"
								name="nuevo"
								placeholder="Al menos 8 caracteres"
								className="border rounded-xl bg-gray-50 w-full p-3 mt-3"
								onChange={evento => setPassword({
									...password,
									[evento.target.name]: evento.target.value
								})}
							/>
						</div>

						<div className="my-5">
							<label htmlFor="confirma" className="text-gray-600 font-bold uppercase block">
								Confirmar Contraseña
							</label>
							<input
								id="confirma"
								type="password"
								name="confirma"
								placeholder="Ingresa nuevamente tu Nueva Contraseña"
								className="border rounded-xl bg-gray-50 w-full p-3 mt-3"
								onChange={evento => setPassword({
									...password,
									[evento.target.name]: evento.target.value
								})}
							/>
						</div>

						<input 
							type="submit"
							value="Guardar Cambios"
							className="rounded-xl bg-indigo-700 w-full px-10 py-3 text-white font-bold uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 transition-colors md:w-auto"
						/>
					</form>
				</div>
			</div>
		</>
	)
}

export default CambiarPassword;


