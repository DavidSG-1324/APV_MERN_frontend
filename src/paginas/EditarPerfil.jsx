import useAuth from '../hooks/useAuth.jsx';
import {useState, useEffect} from 'react';
import Aviso from '../componentes/Aviso.jsx';
import AdminNav from '../componentes/AdminNav.jsx';

const EditarPerfil = () => {
	const Auth = useAuth();
	const {auth, actualizarPerfil} = Auth;

	const [perfil, setPerfil] = useState({});

	const [aviso, setAviso] = useState({});

	const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	// const regexURL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	const regexURL = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

	useEffect(() => {
		setPerfil(auth);

	}, [auth]);

	const handleSubmit = async evento => {
		evento.preventDefault();

		const {nombre, email, telefono, web} = perfil;

		if([nombre, email].includes('')) {
			setAviso({msg: 'Nombre e Email son obligatorios', error: true});
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

		if(telefono) {
			if(telefono !== '') {
				if(isNaN(telefono)) {
					setAviso({msg: 'Número de teléfono no válido', error: true});
					return;
				} else if(telefono.length !== 10) {
					setAviso({msg: 'El número de teléfono debe tener 10 dígitos', error: true});
					return;
				}
			}
		}

		if(web) {
			if(web !== '') {
				if(!regexURL.test(web)) {
					setAviso({msg: 'La dirección Web no es válida', error: true});
					return;
				}
			}
		}

		setAviso({});

		const respuesta = await actualizarPerfil(perfil);

		setAviso(respuesta);

		if(!respuesta.error) {
			setTimeout(() => {
				setAviso({});
			}, 3000);
		}
	}

	const {msg} = aviso;

	return (
		<>
			<AdminNav />

			<h2 className="text-center font-black text-3xl mt-10">Editar Perfil</h2>

			<p className="text-center text-xl mt-5 mb-10">
				Modifica <span className="text-indigo-600 font-bold">aquí</span> tus Datos
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
							<label htmlFor="nombre" className="text-gray-600 font-bold uppercase block">
								Nombre
							</label>
							<input
								id="nombre"
								type="text"
								name="nombre"
								placeholder="Tu Nombre"
								className="border rounded-lg bg-gray-50 w-full p-2 mt-2"
								value={perfil.nombre || ''}
								onChange={evento => setPerfil({
									...perfil,
									[evento.target.name]: evento.target.value
								})}
							/>
						</div>

						<div className="my-5">
							<label htmlFor="email" className="text-gray-600 font-bold uppercase block">
								Email
							</label>
							<input
								id="email"
								type="email"
								name="email"
								placeholder="Tu Correo Electrónico"
								className="border rounded-lg bg-gray-50 w-full p-2 mt-2"
								value={perfil.email || ''}
								onChange={evento => setPerfil({
									...perfil,
									[evento.target.name]: evento.target.value
								})}
							/>
						</div>

						<div className="my-5">
							<label htmlFor="telefono" className="text-gray-600 font-bold uppercase block">
								Teléfono
							</label>
							<input
								id="telefono"
								type="tel"
								name="telefono"
								placeholder="Número Telefónico"
								className="border rounded-lg bg-gray-50 w-full p-2 mt-2"
								value={perfil.telefono || ''}
								onChange={evento => setPerfil({
									...perfil,
									[evento.target.name]: evento.target.value
								})}
							/>
						</div>

						<div className="my-5">
							<label htmlFor="web" className="text-gray-600 font-bold uppercase block">
								Sitio Web
							</label>
							<input
								id="web"
								type="text"
								name="web"
								placeholder="Ej. gatitos.com"
								className="border rounded-lg bg-gray-50 w-full p-2 mt-2"
								value={perfil.web || ''}
								onChange={evento => setPerfil({
									...perfil,
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

export default EditarPerfil;

