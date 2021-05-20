import React, { useEffect, useState } from 'react'
import './style.css'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function Main() {
    const [products, setProducts] = useState([])
    const history = useHistory()

    function navigateToLogin() {
        history.push('/login');
    }

    useEffect(() => {
        api.get('products').then(response => {
            setProducts(response.data)
        })
    }, [])

    //{products.map(product => ())}
    //{`http://localhost:3333/uploads/${product.image_url}`}

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="#" style={{marginLeft: 20}}>Teste IFME</a>
                <button type="button" className="btn btn-success" style={{marginRight: 20}} onClick={navigateToLogin}>Login</button>
            </nav>

            <div className="card text-center">
                <div className="card-body">
                    <h2 className="card-title">Navegue por nossa loja</h2>
                    <p className="card-text">Nossos produtos mais populares com base nas vendas.</p>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    {products.map(product => (
                        <div className="col-md-4" key={product.id} style={{marginTop: 20}}>
                            <div className="card">
                                
                                <div className="text-center"> <img src="https://i.imgur.com/TbtwkyW.jpg" width="250"/> </div>
                                <div className="text-center">
                                    <h5>{product.name}</h5>
                                    <p>{product.description}</p>
                                    <span className="text-success">R$ {product.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}