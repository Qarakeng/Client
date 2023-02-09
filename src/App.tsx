import React from 'react';
import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/login";

function App() {
    return (
        <div>
            <Routes>
                <Route path="login" element={<Login/>}/>
            </Routes>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>

                </Route>
            </Routes>
        </div>
    );
}

export default App;
