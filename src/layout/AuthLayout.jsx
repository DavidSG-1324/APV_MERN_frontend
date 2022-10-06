// rafce(tab), crea la estructura básica de un componente

import {Outlet} from 'react-router-dom';

const AuthLayout = () => {
	return (
		<>	{/*Fragment*/}
			<main className="container mx-auto md:grid md:grid-cols-2 p-5 mt-12 gap-10 items-center">
				<Outlet />
			</main>
		</>
	)
}

export default AuthLayout;

