import {useState, useEffect, createContext} from 'react';
import clienteAxios from '../config/axios.jsx';

const AuthContext = createContext();

const AuthProvider = (props) => {
	const {children} = props;

	const [auth, setAuth] = useState({});
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		const autenticarUsuario = async () => {
			const jwt = localStorage.getItem('jwt');

			if(!jwt) {
				setCargando(false);

				return;
			}

			const config = {
				headers: {
					"Content-Type": "Application/json",
					Authorization: `Bearer ${jwt}`
				}
			}

			try {
				const url = '/veterinarios/perfil';

				const resultado = await clienteAxios(url, config);

				const {data} = resultado;

				setAuth(data);

			} catch(error) {
				// console.log(error.response.data.msg);
				setAuth({});
			}

			setCargando(false);
		}

		autenticarUsuario();
	}, []);

	const cerrarSesion = () => {
		localStorage.removeItem('jwt');
		setAuth({});
	}

	const actualizarPerfil = async (datos) => {
		const jwt = localStorage.getItem('jwt');

		const config = {
			headers: {
				"Content-Type": "Application/json",
				Authorization: `Bearer ${jwt}`
			}
		}

		try {
			const url = `/veterinarios/perfil:${datos._id}`;

			const resultado = await clienteAxios.put(url, datos, config);

			const {data} = resultado;

			setAuth(data);

			return {msg: 'Perfil actualizado correctamente', error: false};

		} catch(error) {
			return {msg: error.response.data.msg, error: true};
		}
	}

	const actualizarPassword =  async (datos) => {
		const jwt = localStorage.getItem('jwt');

		const config = {
			headers: {
				"Content-Type": "Application/json",
				Authorization: `Bearer ${jwt}`
			}
		}

		try {
			const url = '/veterinarios/actualizar-password';

			const resultado = await clienteAxios.put(url, datos, config);

			const {data} = resultado;

			return {msg: data.msg, error: false};

		} catch(error) {
			return {msg: error.response.data.msg, error: true};
		}
	}

	return (
		<AuthContext.Provider
			value = {{
				auth,
				setAuth,
				cargando,
				cerrarSesion,
				actualizarPerfil,
				actualizarPassword
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export {
	AuthProvider
}

export default AuthContext;

