import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';
import { useHistory } from 'react-router'
import { Modal } from '@mui/material';

// This is Function Component. Since we did not have a lot of things to write,
// we use Function component so that the code is shorter.
const PrivateRoute = ({ children, ...rest }) => {
    let [modalIsOpen, setModalIsOpen] = useState(false);
    const history = useHistory()

    const handleOnIdle = (event) => {
        // SHOW YOUR MODAL HERE AND LAGOUT
        setModalIsOpen(true);
        console.log('user is idle')
        console.log('last active', getLastActiveTime())
        sessionStorage.clear();
        history.push("/login");
    }

    const { getLastActiveTime } = useIdleTimer({
        timeout: 1000 * 60 * 2,
        onIdle: handleOnIdle,
        debounce: 500,
    })

    return (
        // 'rest' is just a way to display other components within the route
        <Route {...rest} render={(props) => (
            // We use the 'children' argument to change and control Routes navigation.
            // Can see inside the App.js file.
            sessionStorage.getItem('UserData') ?
                children
                :
                <Redirect to='/login' />
            )
        }
        />
    )
}

export default PrivateRoute;