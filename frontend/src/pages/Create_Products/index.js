import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './style.css'
import api from '../../services/api'

export default function Create_Products() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const userID = localStorage.getItem('userID')
    const [image, setImage] = useState()
    const history = useHistory()

    function handleSelectImage(event) {
        if(!event.target.files) {
            return;
        }

        const selectedImage = Array.from(event.target.files)

        setImage(selectedImage[0])
    }

    async function handleCreateProduct() {
        const data = new FormData()
        data.append('name', name)
        data.append('description', description)
        data.append('price', price)
        data.append('image', image)

        if(name, price, description == '' || image == undefined) {
            alert("Preencha todos os campos.")
        }else {
            try {
                await api.post('products', data, {
                    headers: {
                        authorization: userID
                    }
                })

                history.push('/user')
                alert("Produto cadastrado com sucesso.")

            } catch (err) {
                alert(err)
            }
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
                    <h2 className="card-title">Criar Produto</h2>
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
                                placeholder="Descrição"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <input 
                                type="text" 
                                name="" 
                                className="form-control" 
                                placeholder="Preço"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                            
                            <div className="form-group">
                                <input type="file" className="form-control" onChange={handleSelectImage} accept="image/jpeg, image/png" />
                            </div>
                            
                            <div className="center-button">
                                <button className="btn btn-success" id="btn-login" onClick={handleCreateProduct}>Criar</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}