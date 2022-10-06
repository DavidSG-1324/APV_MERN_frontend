import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Aviso from '../componentes/Aviso.jsx';
import clienteAxios from '../config/axios.jsx';

const ConfirmAccount = () => {
	const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
	const [cargando, setCargando] = useState(true);
	const [aviso, setAviso] = useState({});

	const params = useParams();

	let {token} = params;
	token = token.split(':')[1];

	useEffect(() => {
		const confirmarToken = async () => {
			try {
				const url = `/veterinarios/confirm-account:${token}`;

				const resultado = await clienteAxios(url);
				console.log(resultado);

				const {data} = resultado; 
				console.log(data);

				setCuentaConfirmada(true);
				setAviso({msg: data.msg, error: false});

			} catch(error) {
				console.log(error);
				setAviso({msg: error.response.data.msg, error: true});
			}

			setCargando(false);
		}

		confirmarToken();
	}, []);

	return (
		<>
			<div>
				{cuentaConfirmada &&
					<h1 className="text-indigo-600 font-black text-6xl">
						Ahora puedes Administrar tus{" "}<span className="text-black">Pacientes</span>
					</h1>
				}
			</div>
			
			<div className="shadow-lg rounded-xl bg-white px-5 py-10 mt-20 md:mt-5">
				{!cargando &&
					<Aviso
						aviso={aviso}
					/>
				}

				{cuentaConfirmada &&
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

export default ConfirmAccount;

