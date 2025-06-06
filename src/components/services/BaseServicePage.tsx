import React, { useState } from 'react';
import './BaseServicePage.css';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface Partner {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  price: string;
}

interface BaseServicePageProps {
  title: string;
  description: string;
  heroImage: string;
  partners: Partner[];
}

const BaseServicePage: React.FC<BaseServicePageProps> = ({
  title,
  description,
  heroImage,
  partners,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`service-page`}>
      <Navbar />

      <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Tìm kiếm đối tác..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="partners-grid">
        {filteredPartners.map((partner) => (
          <div key={partner.id} className="partner-card">
            <div className="partner-image">
              <img src={partner.image} alt={partner.name} />
            </div>
            <div className="partner-info">
              <h3>{partner.name}</h3>
              <p>{partner.description}</p>
              <div className="partner-rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`star ${index < partner.rating ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="partner-price">{partner.price}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default BaseServicePage;
