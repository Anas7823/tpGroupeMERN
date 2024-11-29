import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardImage,
  CButton
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import tiramisu from "../../assets/produits/tiramisu.png";
const products = [
  {
    id: 1,
    name: "Tartare de Saumon",
    description: "Saumon frais coupé au couteau, avocat et agrumes",
    price: 16.90,
    image: tiramisu,
  },
  {
    id: 2,
    name: "Boeuf Bourguignon",
    description: "Mijoté de boeuf aux légumes et vin rouge",
    price: 24.90,
    image: tiramisu,
  },
  {
    id: 3,
    name: "Tarte au Citron Meringuée",
    description: "Crème de citron et meringue italienne",
    price: 8.90,
    image: tiramisu,
  },
];
const Home = () => {
  const navigate = useNavigate();
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.4)',
    zIndex: 10
  };
  const textStyle = {
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center'
  };
  return (
    <div>
      {/* Section Carousel avec Overlay */}
      <div className="relative">
        <CCarousel controls indicators>
          <CCarouselItem>
            <CImage
              className="d-block w-100"
              src={tiramisu}
              alt="Plat gastronomique 1"
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <div style={overlayStyle}>
              <p style={textStyle}>Découvrez nos plats magnifiques !</p>
              <CButton 
                color="light"
                className="px-4 py-2 hover:bg-dark hover:text-white transition-all"
                onClick={() => navigate('/produits')}
              >
                Voir nos produits
              </CButton>
            </div>
          </CCarouselItem>
          <CCarouselItem>
            <CImage
              className="d-block w-100"
              src={tiramisu}
              alt="Plat gastronomique 2"
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <div style={overlayStyle}>
              <p style={textStyle}>Découvrez nos plats magnifiques !</p>
              <CButton 
                color="light"
                className="px-4 py-2 hover:bg-dark hover:text-white transition-all"
                onClick={() => navigate('/produits')}
              >
                Voir nos produits
              </CButton>
            </div>
          </CCarouselItem>
          <CCarouselItem>
            <CImage
              className="d-block w-100"
              src={tiramisu}
              alt="Plat gastronomique 3"
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <div style={overlayStyle}>
              <p style={textStyle}>Découvrez nos plats magnifiques !</p>
              <CButton 
                color="light"
                className="px-4 py-2 hover:bg-dark hover:text-white transition-all"
                onClick={() => navigate('/produits')}
              >
                Voir nos produits
              </CButton>
            </div>
          </CCarouselItem>
        </CCarousel>
      </div>
      {/* Section Meilleurs Plats */}
      <div className="bg-white py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meilleurs plats de la semaine
        </h2>
        <div className="max-w-6xl mx-auto space-y-6">
          {products.map((product) => (
            <CCard 
              key={product.id} 
              className="shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              style={{ display: 'flex', flexDirection: 'row', height: '250px' }}
            >
              <div style={{ width: '40%', position: 'relative' }}>
                <CCardImage 
                  src={product.image} 
                  alt={product.name} 
                  style={{ 
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover'
                  }} 
                />
              </div>
              <CCardBody 
                style={{ 
                  width: '60%', 
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <CCardTitle className="text-2xl font-bold mb-4">
                  {product.name}
                </CCardTitle>
                <CCardText className="text-gray-600 mb-4">
                  {product.description}
                </CCardText>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-primary">
                    {product.price.toFixed(2)} €
                  </p>
                  <CButton 
                    color="primary"
                    onClick={() => navigate('/produits')}
                  >
                    Voir le détail
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
 
