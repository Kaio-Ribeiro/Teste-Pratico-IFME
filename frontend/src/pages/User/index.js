import React, { useEffect, useState } from 'react'
import './style.css'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { FiEdit3, FiDelete,FiX, FiXSquare,FiLogOut } from 'react-icons/fi'

export default function User() {
    const [products, setProducts] = useState([])
    const history = useHistory()

    function navigateToMain() {
        history.push('/')
    }

    async function handleDeleteProduct(id) {
        try{
            if (window.confirm("Deseja mesmo deletar esse produto?")) {
                await api.delete(`products/${id}`)
                alert('Produto deletado com sucesso')
            }
        }catch {
            alert('Erro ao deletar, tente novamente.')
        }
    }

    function navigateToCreateProduct() {
        history.push('/create_products');
    }

    useEffect(() => {
        api.get('products').then(response => {
            setProducts(response.data)
        })
    }, [products])

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand " href="#" style={{marginLeft: 20}}>Teste IFME</a>
                <button type="button" className="btn btn-success offset-8" onClick={navigateToCreateProduct} style={{marginRight: 20}}>Novo Produto</button>
                <div style={{marginRight: 20}} onClick={navigateToMain}>
                    <FiXSquare size={35} color="#cf1515"/>
                </div>
            </nav>

            <div className="card text-center">
                <div className="card-body">
                    <h2 className="card-title">Bem Vindo</h2>
                    <p className="card-text">Nossos produtos mais populares com base nas vendas.</p>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    {products.map(product => (
                        <div className="col-md-4" key={product.id} style={{marginTop: 20}}>
                            <div className="card">
                                <span className="position-icons">
                                    <Link to={{ pathname: '/edit_products', state: product }} style={{marginRight: 10}}><FiEdit3 size={23} color="#157347"/></Link>
                                    <div onClick={() => handleDeleteProduct(product.id)}><FiX size={23} color="#cf1515"/></div>
                            
                                </span>
                                
                                <div className="text-center"> <img src={`http://localhost:3333/uploads/${product.image_url}`} width="250"/> </div>
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
