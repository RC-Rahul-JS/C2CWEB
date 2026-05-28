import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, CheckCircle2, ArrowRight } from 'lucide-react';
import useApi from '../../functions/api';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const DiagonisticList = () => {
  const navigate = useNavigate();
  const { getapi } = useApi();
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await getapi('/c2c_app/labs/requests');
        let data = response.data;
        let list = [];
        if (Array.isArray(data)) list = data;
        else if (data && Array.isArray(data.requests)) list = data.requests;
        else if (data && Array.isArray(data.data)) list = data.data;
        else if (data && Array.isArray(data.pathologys)) list = data.pathologys;
        else if (data && typeof data === 'object') {
           list = Object.values(data).filter(v => typeof v === 'object');
        }
        
        // Filter approved and map
        const approvedLabs = list.filter(item => (item.status || '').toLowerCase() === 'approved').map(item => {
          const info = item.basicInfo || item.medical || {};
          const addr = item.address || {};
          return {
            id: item._id || item.id,
            customId: item.lab_id || item.pathology_id || item._id,
            name: info.labName || info.medicalName || item.labName || 'N/A',
            address: addr.addressLine1 || info.address || item.address || 'N/A',
            city: addr.city || item.city || '',
            image_url: item.documents?.labLogo ? `${API_BASE_URL}/image/${item.documents.labLogo}` : null,
            // Fallback if full URL provided in demo data
            raw_image: item.documents?.labLogo?.startsWith('http') ? item.documents.labLogo : null
          };
        });
        setLabs(approvedLabs);
      } catch (err) {
        console.error("Failed to fetch labs:", err);
        setLabs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, []);

  return (
    <div style={{ padding: '60px 40px', background: 'linear-gradient(to bottom, #dbeafe, #93c5fd)', minHeight: '100vh', marginTop: '60px'}}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a' }}>
          Pathology Services
        </h1>
        <p style={{ fontSize: '14px', color: '#475569', marginTop: '10px' }}>
          Book verified home sample collections easily with our trusted lab partners.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#4f46e5', fontWeight: 'bold' }}>Loading Lab Partners...</div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {labs.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#fff',
                borderRadius: '24px',
                padding: '20px',
                height: '320px',
                position: 'relative',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              onClick={() => navigate(`/diagonistic_profile/${item.id}`)}
            >
              {/* Verified Badge */}
              <div style={{
                position: 'absolute', top: '15px', right: '15px',
                background: '#fff', border: '1px solid #e2e8f0',
                padding: '4px 8px', borderRadius: '12px',
                display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '10px', fontWeight: 'bold', color: '#10b981',
                boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
              }}>
                <CheckCircle2 size={12} /> VERIFIED
              </div>

              {/* Logo Area */}
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '15px', position: 'relative'
              }}>
                <img 
                  src={item.raw_image || item.image_url || 'https://via.placeholder.com/150'} 
                  alt={item.name}
                  style={{ maxWidth: '70%', maxHeight: '100px', objectFit: 'contain' }}
                />
                
                {/* Floating Flask Icon */}
                <div style={{
                  position: 'absolute', bottom: '-10px', left: '0',
                  background: '#fff', border: '1px solid #f1f5f9',
                  padding: '8px', borderRadius: '10px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                  color: '#6366f1'
                }}>
                  <FlaskConical size={18} />
                </div>
              </div>

              {/* Info Area */}
              <div style={{ marginTop: 'auto' }}>
                <p style={{ fontSize: '10px', fontWeight: '800', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  LAB PARTNER
                </p>
                <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#1e293b', margin: '4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '12px' }}>
                  📍 {item.address} {item.city}
                </p>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#0d9488', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  View Profile <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiagonisticList;
