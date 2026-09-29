import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

export default function Login() {

    
    const[usuario, setUsuario] = useState('');
    const navigate = useNavigate();
    let login = 0;

  React.useEffect(() => {
    if(!usuario) return
    api
      .get(`/users/${usuario}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          login = 1;
        }
      })
      .catch((error) => {
        console.log(error);
      })},[usuario]);


   async function handleLogin(e) {
        e.preventDefault();

        localStorage.setItem('usuario', usuario);
             
        if(login === 1) {

          navigate('/home');
          alert('Login autorizado...');

        }else {
            await api
              .post('/users', {
                username: usuario
              })
              .then((res) => {
                console.log(res);
                alert('Novo usuário criado!');
                navigate('/home');                
              })
              .catch(function (error) {
                console.log(error);
                alert('Falha no login, tente novamente.');
              });
        }
    }

    return(
      <div className="box-container">
        <div className="box">
            <form onSubmit={handleLogin}>

                <h1>POKÉDEX</h1>
                <input
                     type="text"
                     placeholder="Usuário" 
                     value={usuario}
                     onChange={e => setUsuario(e.target.value)}
                />
                <br />
                <button type="submit">ENTRAR</button>
            </form>
        </div>
      </div>
    );
}

