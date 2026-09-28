import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import PerfilPokemon from './pages/PerfilPokemon';

export default function MyRoute() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/pokemon" element={<PerfilPokemon /> } />
            </Routes>
        </BrowserRouter>
    );
}