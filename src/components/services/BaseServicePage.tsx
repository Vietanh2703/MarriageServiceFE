import React, { useState } from 'react';
import './BaseServicePage.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { motion } from 'framer-motion';

interface Partner {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  price: string;
  features?: string[];
  contact?: string;
  website?: string;
}

interface BaseServicePageProps {
  title: string;
  description: string;
  heroImage: string;
  introduction: {
    title: string;
    content: string;
    image?: string;
  };
  benefits: {
    title: string;
    items: {
      title: string;
      description: string;
      icon?: string;
    }[];
  };
  partners: Partner[];
  policies: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };
}

const BaseServicePage: React.FC<BaseServicePageProps> = ({
  title,
  description,
  heroImage,
  introduction,
  benefits,
  partners,
  policies,
}) => {
  const [searchTerm] = useState('');

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    },
    hover: { 
      y: -15, 
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    }
  };

  const heroTextVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <div className={`service-page`}>
      <Navbar />

      <motion.div 
        className="hero-service-section" 
        style={{ backgroundImage: `url(${heroImage})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={`hero-service-content`}>
          <motion.div className="hero-text-container">
            <motion.h1
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              className=""
            >
              {title}
            </motion.h1>
            <motion.p
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className=""
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="cta-container"
            >
              <button className={`cta-button `}>Đăng ký ngay</button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <section className="introduction-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="section-title">{introduction.title}</h2>
          </motion.div>
          <motion.div
            className="introduction-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="introduction-text">
              <p>{introduction.content}</p>
            </div>
            {introduction.image && (
              <div className="introduction-image">
                <img src={introduction.image} alt={introduction.title} />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">{benefits.title}</h2>
          </motion.div>
          <motion.div
            className="benefits-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {benefits.items.map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-card"
                variants={cardVariants}
                whileHover={{ scale: 1.06, boxShadow: '0 16px 48px 0 rgba(60,60,120,0.18), 0 4px 24px rgba(60,60,120,0.12)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
              >
                <motion.div
                  className="benefit-icon"
                  initial={{ scale: 0.7, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.1 * index }}
                >
                  {benefit.icon}
                </motion.div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="partners-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Đối tác nổi bật</h2>
          </motion.div>

          <motion.div
            className="partners-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            layout
          >
            {filteredPartners.map((partner, idx) => (
              <motion.div
                key={partner.id}
                className="partner-card"
                variants={cardVariants}
                whileHover={{ scale: 1.04, boxShadow: '0 16px 48px 0 rgba(60,60,120,0.18), 0 4px 24px rgba(60,60,120,0.12)' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.05 * idx }}
                layout
              >
                <motion.div
                  className="partner-image"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.1 * idx }}
                >
                  <img src={partner.image} alt={partner.name} />
                  <motion.div
                    className="partner-badge"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + 0.05 * idx, duration: 0.4 }}
                  >
                    Đối tác tin cậy
                  </motion.div>
                </motion.div>
                <div className="partner-info">
                  <h3>{partner.name}</h3>
                  <p className="partner-description">{partner.description}</p>
                  <div className="partner-rating">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className={`star ${index < partner.rating ? 'filled' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="rating-text">({partner.rating}/5)</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="policies-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">{policies.title}</h2>
          </motion.div>
          <motion.div
            className="policies-list-wrapper"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <table className="policies-table">
              <thead>
                <tr>
                  <th>Chính sách</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {policies.items.map((policy, index) => (
                  <tr key={index}>
                    <td>{policy.title}</td>
                    <td>{policy.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BaseServicePage;
