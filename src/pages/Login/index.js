import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './style.css';

export default function Login() {

    
    const[usuario, setUsuario] = useState([]);
    const[data, setData] = useState([]);
    const history = useHistory();
    let list = [];
    let login = 0;
    // const usuarioAtual = localStorage.getItem('usuario');

    React.useEffect(() => {
      axios
         .get(`https://pokedex20201.herokuapp.com/users`)
         .then((res) => {
           setData(res.data.data)
           console.log(res.data.data)
          });
   }, []);

   data.map(k => {
     list.push(k.username);
     return list;
   })

   for(let i=0; i<list.length; i++) {
     if(list[i] === usuario) {
        login = 1;
     }

   } 

   console.log(list);

   async function handleLogin(e) {
        e.preventDefault();

        localStorage.setItem('usuario', usuario);
             
        if(login === 1) {

          history.push('/home');
          alert('Login autorizado...');

        }else {
            await axios
              .post('https://pokedex20201.herokuapp.com/users', {
                username: usuario
              })
              .then((res) => {
                console.log(res);
                alert('Novo usuário criado!');
                history.push('/home');                
              })
              .catch(function (error) {
                console.log(error);
                alert('Falha no login, tente novamente.');
              });
        }
    }

    return(
      <div class="box-container">
        <div class="box">
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

