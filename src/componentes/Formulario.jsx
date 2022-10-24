import usePacientes from '../hooks/usePacientes.jsx';
import {useState, useEffect} from 'react';
import Aviso from './Aviso.jsx';
import {Navigate} from 'react-router-dom';

const Formulario = () => {
	const Pacientes = usePacientes();
	const {agregarPaciente, paciente} = Pacientes;

	const [nombre, setNombre] = useState('');
	const [propietario, setPropietario] = useState('');
	const [email, setEmail] = useState('');
	const [fecha, setFecha] = useState('');
	const [sintomas, setSintomas] = useState('');
	const [id, setId] = useState(null);

	const [aviso, setAviso] = useState({});

	const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	useEffect(() => {
		if(paciente?._id) {
			setNombre(paciente.nombre);
			setPropietario(paciente.propietario);
			setEmail(paciente.email);
			setFecha(paciente.fecha.substring(0, 10));
			setSintomas(paciente.sintomas);
			setId(paciente._id);
		}
	}, [paciente]);

	const handleSubmit = async evento => {
		evento.preventDefault();

		if([nombre, propietario, email, sintomas].includes('')) {
			setAviso({msg: 'Todos los campos son obligatorios', error: true});
			return;
		}

		if(!isNaN(propietario)) {
			setAviso({msg: 'Nombre de propietario no válido', error: true});
			return;
		}

		if(!regexEmail.test(email)) {
			setAviso({msg: 'El Email no es válido', error: true});
			return;
		}

		setAviso({});

		if(!id) {
			agregarPaciente({
				nombre,
				propietario,
				email,
				fecha,
				sintomas
			});

			setAviso({msg:'Paciente agregado correctamente', error: false});

		} else {
			const respuesta = await agregarPaciente({
				nombre,
				propietario,
				email,
				fecha,
				sintomas,
				id
			});


			setAviso(respuesta);
		}

		setNombre('');
		setPropietario('');
		setEmail('');
		setFecha('');
		setSintomas('');
		setId(null);

		setTimeout(() => {
			setAviso({});
		}, 3000);
	}

	// const quitarAviso = () => {
	// 	setTimeout(() => {
	// 		const avisoCorrecto = document.querySelector('.correcto');
	// 		if(avisoCorrecto) {
	// 			setAviso({});
	// 		}
	// 	}, 3000);
	// }

	useEffect(() => {
		const deshabilitarFechaAnterior = () => {
			const fechaActual = new Date();

			const year = fechaActual.getFullYear();
			const month = fechaActual.getMonth() + 1;
			const day = fechaActual.getDate() + 1;

			let fechaHabil;

			if(month < 10) {
				fechaHabil = `${year}-0${month}-${day}`;
			} else {
				fechaHabil = `${year}-${month}-${day}`;
			}

			const fechaInput = document.querySelector('.fecha');
			fechaInput.min = fechaHabil;
		}

		deshabilitarFechaAnterior();
	}, []);

	const {msg} = aviso;

	return (
		<>
			<h2 className="text-center font-black text-3xl">Formulario</h2>

			<p className="text-center text-xl mt-5 mb-10">
				Registra a tus <span className="text-indigo-600 font-bold">Pacientes</span>
			</p>

			{msg &&
				<Aviso
					aviso={aviso}
				/>
			}{/*{msg && quitarAviso()}*/}
			<form onSubmit={handleSubmit} className="shadow-md rounded-md bg-white px-5 py-10 mb-10 lg:mb-0">
				<div className="mb-5">
					<label htmlFor="nombre" className="text-gray-700 font-bold uppercase">
						Nombre
					</label>
					<input
						id="nombre"
						type="text"
						placeholder="Nombre de la Mascota"
						className="border-2 rounded-md bg-gray-50 w-full p-2 mt-2 placeholder-gray-400"
						value={nombre}
						onChange={evento => setNombre(evento.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="propietario" className="text-gray-700 font-bold uppercase">
						Propietario
					</label>
					<input
						id="propietario"
						type="text"
						placeholder="Dueño de la Mascota"
						className="border-2 rounded-md bg-gray-50 w-full p-2 mt-2 placeholder-gray-400"
						value={propietario}
						onChange={evento => setPropietario(evento.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="email" className="text-gray-700 font-bold uppercase">
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Correo Electrónico"
						className="border-2 rounded-md bg-gray-50 w-full p-2 mt-2 placeholder-gray-400"
						value={email}
						onChange={evento => setEmail(evento.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="fecha" className="text-gray-700 font-bold uppercase">
						Fecha Cita
					</label>
					<input
						id="fecha"
						type="date"
						className="fecha border-2 rounded-md bg-gray-50 w-full p-2 mt-2 placeholder-gray-400"
						value={fecha}
						onChange={evento => setFecha(evento.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="sintomas" className="text-gray-700 font-bold uppercase">
						Síntomas
					</label>
					<textarea
						id="sintomas"
						placeholder="Describe el estado del paciente"
						className="border-2 rounded-md bg-gray-50 w-full p-2 mt-2 placeholder-gray-400"
						value={sintomas}
						onChange={evento => setSintomas(evento.target.value)}
					/>
				</div>

				<input 
					type="submit"
					value={!id ? 'Crear Cita' : 'Guardar Cambios'}
					className="rounded-xl bg-indigo-600 w-full px-10 py-3 text-white font-bold uppercase mt-5 hover:cursor-pointer hover:bg-indigo-700 transition-colors md:w-auto"
				/>
			</form>
		</>		
	)
}

export default Formulario;

