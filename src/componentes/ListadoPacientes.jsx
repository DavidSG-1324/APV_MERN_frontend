import usePacientes from '../hooks/usePacientes.jsx';
import Paciente from './Paciente.jsx';

const ListadoPacientes = () => {
	const Pacientes = usePacientes();
	const {pacientes} = Pacientes;

	return (
		<>
			{pacientes.length ? (
				<>
					<h2 className="text-center font-black text-3xl">Pacientes registrados</h2>

					<p className="text-center text-xl mt-5 mb-10">
						Puedes administrar las <span className="text-indigo-600 font-bold">Citas</span> de los Pacientes
					</p>

					{pacientes.map(paciente => (
						<Paciente 
							key = {paciente._id}
							paciente = {paciente}
						/>
					))}
				</>
			) : (
				<>
					<h2 className="text-center font-black text-3xl">Aún no hay Pacientes en el registro</h2>

					<p className="text-center text-xl mt-5 mb-10">
						Al agregar Pacientes aparecerán <span className="text-indigo-600 font-bold">aquí</span>
					</p>
				</>
			)}
		</>
	)
}

export default ListadoPacientes;

