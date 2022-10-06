import {useState} from 'react';

import Formulario from '../componentes/Formulario.jsx';
import ListadoPacientes from '../componentes/ListadoPacientes.jsx';

const AdministrarPacientes = () => {
	const [mostrarFormulario, setMostrarFormulario] = useState(false);

	return (
		<div className="flex flex-col md:flex-row">
			<button
				className="rounded-md bg-indigo-600 text-white font-bold uppercase p-3 mx-10 mb-10 md:hidden"
				type="button"
				onClick={() => setMostrarFormulario(!mostrarFormulario)}>
				{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
			</button>

			<div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
				<Formulario />
			</div>

			<div className="md:w-1/2 lg:w-3/5">
				<ListadoPacientes />
			</div>
		</div>
	)
}

export default AdministrarPacientes;

