import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './style.css'
import api from '../../services/api'

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    async function handleLogin() {

        const data = {login, password}

        if(login == '' || password == '') {
            alert("Preencha todos os campos.")

        }else {
            try {
                const response = await api.post('sessions', data)

                localStorage.setItem('userID', response.data.id)

                history.push('/user')

            } catch (err) {
                alert("Falha no login, tente novamente.")
            }

        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-5" >
            <div className="card-login pt-4">
                <span className="arrow-left">
                <Link to="/">
                    <FiArrowLeft size={23} color="#157347"/>
                </Link>
                </span>
                
                <div className="login-title">
                    <h2 className="card-title">Login</h2>
                </div>
                
                <div className="tab-content" id="pills-tabContent">
                    
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="form px-4 pt-5">
                            <input 
                                type="email" 
                                name="" 
                                className="form-control" 
                                placeholder="Email"
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                            /> 
                            <input 
                                type="password" 
                                name="" 
                                className="form-control" 
                                placeholder="Senha"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            /> 
                            <div className="center-button">
                                <button className="btn btn-success" id="btn-login" onClick={handleLogin}>Entar</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>     
    )
} 