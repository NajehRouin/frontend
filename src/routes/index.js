import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import Login from '../Pages/Login'

import AdminPanel from '../Pages/AdminPanel'
import AllUsers from '../Pages/AllUsers'
import Materiel from '../Pages/Materiel'
import Components from '../Pages/Components'
import Information from  '../Pages/Information'
import Demande from '../Pages/Demande'
const router = createBrowserRouter([
{
    path : "/",
        element : <Login/>,
},

    {
        
        path : "",
        element : <App/>,
        children : [
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "users",
                        element : <AllUsers/>
                    },

                    {
                        path : "liste-demande",
                        element : <Demande/>
                    },
                    {
                        path : "materiel",
                        element : <Materiel/>
                    },

                    {
                        path : "components",
                        element : <Components/>
                    },

                    {
                        path : "information",
                        element : <Information/>
                    },
                
                ]
            
            },

        ]
    }
])


export default router