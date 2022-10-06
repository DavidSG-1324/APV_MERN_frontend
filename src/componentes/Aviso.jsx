const Aviso = ({aviso}) => {
	return (
		<div className={`${aviso.error ? 'from-red-400 to-red-600' : 'correcto from-indigo-400 to-indigo-600'} bg-gradient-to-r rounded-xl text-white text-center font-bold uppercase text-sm p-3 mb-10`}>
			{aviso.msg}			
		</div>
	)
}

export default Aviso;

