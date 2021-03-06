import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './style.css'
import api from '../../services/api'

export default function Edit_Products() {
    const location = useLocation()
    const product = location.state
    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [image, setImage] = useState()
    const userID = localStorage.getItem('userID')
    const history = useHistory()

    console.log(image)

    function handleSelectImage(event) {
        if(!event.target.files) {
            return;
        }

        const selectedImage = Array.from(event.target.files)

        setImage(selectedImage[0])
    }

    async function handleCreateProduct(e) {
        e.preventDefault();

        const data = new FormData()
        data.append('name', name)
        data.append('description', description)
        data.append('price', price)
        data.append('image', image)

        try {
            await api.put(`products/${product.id}`, data)

            history.push('/user')
            alert("Produto editado com sucesso.")

        } catch (err) {
            alert("Falha ao editar, tente novamente.")
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-5" >
            <div className="card-login pt-4">
                <span className="arrow-left">
                <Link to='/user'>
                    <FiArrowLeft size={23} color="#157347"/>
                </Link>
                </span>
                
                <div className="login-title">
                    <h2 className="card-title">Editar Produto</h2>
                </div>
                
                <div className="tab-content" id="pills-tabContent">
                    
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="form px-4 pt-5" style={{height: 400}}>
                            <input 
                                type="text" 
                                name="" 
                                className="form-control" 
                                placeholder="Nome"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            /> 
                            <input 
                                type="text" 
                                name="" 
                                className="form-control" 
                                placeholder="Descri????o"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <input 
                                type="text" 
                                name="" 
                                className="form-control" 
                                placeholder="Pre??o"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                            
                            <div className="form-group">
                                <input type="file" className="form-control" onChange={handleSelectImage} accept="image/jpeg, image/png" />
                            </div>
                            
                            <div className="center-button">
                                <button className="btn btn-success" id="btn-login" onClick={handleCreateProduct}>Editar</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}