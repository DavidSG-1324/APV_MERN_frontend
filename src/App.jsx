import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {AuthProvider} from './context/AuthProvider.jsx';
import {PacientesProvider} from './context/PacientesProvider.jsx';

import AuthLayout from './layout/AuthLayout.jsx';
import Login from './paginas/Login.jsx';
import CreateAccount from './paginas/CreateAccount.jsx';
import ConfirmAccount from './paginas/ConfirmAccount.jsx';
import Forgotten from './paginas/Forgotten.jsx';
import Recover from './paginas/Recover.jsx';

import LoggedLayout from './layout/LoggedLayout.jsx';
import AdministrarPacientes from './paginas/AdministrarPacientes.jsx';
import EditarPerfil from './paginas/EditarPerfil.jsx';
import CambiarPassword from './paginas/CambiarPassword.jsx';

function App() {
   return (
        <BrowserRouter>
            <AuthProvider>
                <PacientesProvider>
                    <Routes>
                        <Route path="/" element={<AuthLayout />}>
                            <Route index element={<Login />}/>
                            {/*<Route path="" element={<Login />}/>*/}
                            <Route path="create-account" element={<CreateAccount />}/>
                            <Route path="confirm-account:token" element={<ConfirmAccount />}/>
                            <Route path="forgotten" element={<Forgotten />}/>
                            <Route path="recover:token" element={<Recover />}/>
                        </Route>

                        <Route path='/admin' element={<LoggedLayout />}>
                            <Route index element={<AdministrarPacientes />}/> 
                            <Route path="perfil" element={<EditarPerfil />}/>
                            <Route path="cambiar-password" element={<CambiarPassword />}/>
                        </Route>
                    </Routes>
                </PacientesProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;
