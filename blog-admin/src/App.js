import React from 'react';
import {
    BrowserRouter, 
    Route, 
    Redirect 
} from 'react-router-dom'

import routes from './Route'
import loginCheck from './loginCheck'
import Login from './pages/admin/login'

function App() {
    return (
        <BrowserRouter>
            <div>
                <Route exact path='/' render={() => <Redirect to="/web/index" push />} />
                <Route path='/login' component={Login}/>
                {routes.map((route, i) => (
                    <Route
                        key={i}
                        path={route.path}
                        component={
                            route.path.includes('/admin')
                            ? loginCheck(route.component)
                            : route.component
                        }
                    />
                ))}
            </div>
        </BrowserRouter>
    )
}

export default App;
