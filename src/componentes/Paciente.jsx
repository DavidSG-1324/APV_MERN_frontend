import usePacientes from '../hooks/usePacientes.jsx';

const Paciente = (props) => {
	const {paciente} = props;
	const {nombre, propietario, email, fecha, sintomas, _id} = paciente;

	const Pacientes = usePacientes();
	const {cargarEdicion, eliminarPaciente} = Pacientes;

	const formatearFecha = fecha => {
		const fechaObj = new Date(fecha);

		const dia = fechaObj.getDate() + 2;
		const mes = fechaObj.getMonth();
		const year = fechaObj.getFullYear();

		const fechaCorrecta = new Date(Date.UTC(year, mes, dia));

		return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(fechaCorrecta);
	}

	return (
		<div className="shadow-md rounded-xl bg-white px-5 py-10 mx-5 my-10">
			<p className="text-indigo-700 font-bold uppercase my-2">
				Nombre: <span className="text-black font-normal normal-case">{nombre}</span>
			</p>

			<p className="text-indigo-700 font-bold uppercase my-2">
				Propietario: <span className="text-black font-normal normal-case">{propietario}</span>
			</p>

			<p className="text-indigo-700 font-bold uppercase my-2">
				Email: <span className="text-black font-normal normal-case">{email}</span>
			</p>

			<p className="text-indigo-700 font-bold uppercase my-2">
				Fecha Alta: <span className="text-black font-normal normal-case">{formatearFecha(fecha)}</span>
			</p>

			<p className="text-indigo-700 font-bold uppercase my-2">
				Síntomas: <span className="text-black font-normal normal-case">{sintomas}</span>
			</p>

			<div className="flex justify-between my-5">
				<button
					className="rounded-lg bg-indigo-600 text-white font-bold uppercase px-10 py-2 hover:bg-indigo-700"
					type="button"
					onClick={() => (cargarEdicion(paciente))}>
					Editar
				</button>

				<button
					className="rounded-lg bg-red-600 text-white font-bold uppercase px-10 py-2 hover:bg-red-700"
					type="button"
					onClick={() => (eliminarPaciente(_id))}>
					Eliminar
				</button>
			</div>
		</div>
	)
}

export default Paciente;

