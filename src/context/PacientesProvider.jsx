import useAuth from '../hooks/useAuth.jsx';
import {useState, useEffect, createContext} from 'react';
import clienteAxios from '../config/axios.jsx';

const PacientesContext = createContext();

export const PacientesProvider = (props) => {
	const {children} = props;

	const Auth = useAuth();
	const {auth} = Auth;

	const [pacientes, setPacientes] = useState([]);
	const [paciente, setPaciente] = useState({});

	useEffect(() => {
		const obtenerPacientes = async () => {
			const jwt = localStorage.getItem('jwt');

			if(!jwt) return;

			const config = {
				headers: {
					"Content-Type": "Application/json",
					Authorization: `Bearer ${jwt}`
				}
			}

			try {
				const url = '/pacientes';

				const resultado = await clienteAxios(url, config);

				const {data} = resultado;

				setPacientes(data);

			} catch(error) {
				console.log(error);
			}
		}

		obtenerPacientes();
	}, [auth]);

	const agregarPaciente = async (paciente) => {
		const jwt = localStorage.getItem('jwt');

		const config = {
			headers: {
				"Content-Type": "Application/json",
				Authorization: `Bearer ${jwt}`
			}
		}

		if(!paciente.id) {
			try {
				const url = '/pacientes';

				const resultado = await clienteAxios.post(url, paciente, config);

				const {data} = resultado;

				const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data;

				setPacientes([pacienteAlmacenado, ...pacientes]);

			} catch(error) {
				console.log(error);
			}

		} else {
			try {
				const url = `/pacientes/${paciente.id}`;

				const resultado = await clienteAxios.put(url, paciente, config);

				const {data} = resultado;

				const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);

				setPacientes(pacientesActualizado);

			} catch(error) {
				// console.log(error);
				return {msg: error.response.data.msg, error: true};
			}

			return;
		}
	}

	const cargarEdicion = (paciente) => {
		setPaciente(paciente)
	}

	// const eliminarPaciente = async (id) => {
	// 	const confirmacion = confirm('¿Quieres eliminar la Cita?');

	// 	if(confirmacion) {
	// 		const jwt = localStorage.getItem('jwt');

	// 		const config = {
	// 			headers: {
	// 				"Content-Type": "Application/json",
	// 				Authorization: `Bearer ${jwt}`
	// 			}
	// 		}

	// 		try {
	// 			const url = `/pacientes/${id}`;

	// 			const resultado = await clienteAxios.delete(url, config);

	// 			const {data} = resultado;

	// 			const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id);

	// 			setPacientes(pacientesActualizado);

	// 		} catch(error) {
	// 			console.log(error);
	// 		}
	// 	}
	// }

	const eliminarPaciente = (id) => {
		Swal.fire({
			icon: 'warning',
			title: '¿Quieres eliminar la cita?',
			text: "Esta acción no se puede revertir",
			confirmButtonColor: '#3085D6',
			confirmButtonText: 'Sí, Eliminar',
			showCancelButton: true,
			cancelButtonColor: '#D33',
			cancelButtonText: 'No, Cancelar'

		}).then((result) => {
		    if(result.isConfirmed) {
		    	const eliminar = async () => {
					const jwt = localStorage.getItem('jwt');

					const config = {
						headers: {
							"Content-Type": "Application/json",
							Authorization: `Bearer ${jwt}`
						}
					}

					try {
						const url = `/pacientes/${id}`;

						const resultado = await clienteAxios.delete(url, config);

						const {data} = resultado;

						const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id);

						setPacientes(pacientesActualizado);

					} catch(error) {
						console.log(error);
					}
		    	}

		    	eliminar();
			}
		})
	}

	return (
		<PacientesContext.Provider
			value = {{
				pacientes,
				agregarPaciente,
				cargarEdicion,
				paciente,
				eliminarPaciente
			}}
		>
			{children}
		</PacientesContext.Provider>
	)
}

export default PacientesContext;

