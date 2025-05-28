import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p><strong>${product.price}</strong></p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail; 