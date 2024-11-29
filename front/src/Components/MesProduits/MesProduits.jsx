import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './MesProduits.css'
import { Link } from 'react-router-dom'

function MesProduits() {
    const [myUser, setmyUser] = useState([])
    const [MesProduits, setMesProduits] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3002/user/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            setmyUser(res.data)
            console.log(myUser)
        })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3002/product/user/${myUser._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {            
            setMesProduits(res.data)
            console.log(res.data)
        })
    }, [MesProduits])


    return (
        <div className='Produit'>
                {MesProduits.map (produit => {
                    return (
                        <div className="card">
                            <div className="img_card">
                                <img src={produit.image} alt="" />
                            </div>
                            <div className="infos_card">
                                <div className="title_product">
                                    {produit.name}
                                </div>
                                <div className="description_product">
                                    {produit.description}
                                </div>
                                <div className="prix_product">
                                    {produit.price} €
                                </div>
                                <Link to={`/produit/${produit._id}`}>
                                    Voir le produit
                                </Link>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default MesProduits
