import React from 'react';
import {Outlet, Link} from "react-router-dom";
import Container from '@mui/material/Container';


function Layout() {
    return (
        <Container maxWidth="md">
            <h2>asd</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">login</Link>
                    </li>

                </ul>
            </nav>
            <Outlet />
        </Container>
    );
}

export default Layout;