import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// This is Function Component. Since we did not have a lot of things to write,
// we use Function component so that the code is shorter
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            sessionStorage.getItem('UserData') ? <Component {...props} />
                : <Redirect to='/login' />
        )}
        />
    )
}

export default PrivateRoute;