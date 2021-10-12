import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// This is Function Component. Since we did not have a lot of things to write,
// we use Function component so that the code is shorter.
const PrivateRoute = ({ children, ...rest }) => {
    return (
        // 'rest' is just a way to display other components within the route
        <Route {...rest} render={(props) => (
            // We use the 'children' argument to change and control Routes navigation.
            // Can see inside the App.js file.
            sessionStorage.getItem('UserData') ? children
                : <Redirect to='/login' />
        )}
        />
    )
}

export default PrivateRoute;