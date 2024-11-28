'use client';

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingBag, Heart, Eye, Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card
      className="group relative h-[400px] flex flex-col bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
          Sale {product.discount}%
        </div>
      )}
      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="outline" size="icon" className="h-8 w-8 bg-white">
          <Heart className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 bg-white">
          <Eye className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative aspect-square w-full overflow-hidden p-4">
        <img
          src={product.images[0]?.url || '/placeholder.svg'}
          alt={product.title}
          fill
          className="object-contain transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-medium text-lg mb-1 line-clamp-1">
          {product.title}
        </h3>
        <div className="flex items-center mb-2">{renderStars(4)}</div>
        <div className="flex items-center gap-2 mt-auto">
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="font-bold text-lg">
            ₹{product.price.toLocaleString()}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userToken =
          localStorage.getItem('userToken') ||
          localStorage.getItem('adminToken');
        const response = await axios.get(
          'https://mission-shakti-419920.el.r.appspot.com/api/product/getAllProduct',
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setProducts(response.data.data.Product);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const userToken =
        localStorage.getItem('userToken') || localStorage.getItem('adminToken');
      await axios.post(
        'https://mission-shakti-419920.el.r.appspot.com/api/user/cart',
        { cart: [{ _id: product._id, count: 1 }] },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.success('Product added to cart');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product to cart');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <Skeleton key={index} className="h-[400px] rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductGrid;
