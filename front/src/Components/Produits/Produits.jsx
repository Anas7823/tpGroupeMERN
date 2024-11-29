import React from 'react'
import './Produits.css'
import baseProduit from '../../assets/produits/image.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Produits() {
    const [produits, setProduits] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3002/products', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            setProduits(res.data)
        })
    }, [produits])

    const [tri_produits, setTriProduits] = useState('Tous')

    const changeTriProduits = (tri) => {
        setTriProduits(tri)
    }
    
    return (
        <div className='Produits'>
            <div className="title_produits">Nos produits</div>
            <div className="btn_category">
                <button onClick={() => changeTriProduits('Tous')} className='active'>Tous</button>
                <button onClick={() => changeTriProduits('Plats')}>Plats</button>
                <button onClick={() => changeTriProduits('Desserts')}>Desserts</button>
                <button onClick={() => changeTriProduits('Boissons')}>Boissons</button>
            </div>
            <div className='cards_produits_container'>
                
                {produits.map (produit => {
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
        </div>
    )
}

export default Produits
