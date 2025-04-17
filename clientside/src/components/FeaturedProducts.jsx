import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Percent } from 'lucide-react';
import { useShop } from '../context/useShop';

const products = [
  {
    id: 'fashion-1',
    name: 'Designer Summer Dress',
    originalPrice: 199.99,
    price: 159.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviews: 245,
    endDate: '2024-03-01',
    brand: 'Elegance',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'fashion-2',
    name: 'Premium Leather Jacket',
    originalPrice: 299.99,
    price: 239.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviews: 189,
    endDate: '2024-02-28',
    brand: 'Urban Edge',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'fashion-3',
    name: 'Classic Denim Jeans',
    originalPrice: 89.99,
    price: 69.99,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviews: 312,
    endDate: '2024-02-25',
    brand: 'DenimCo',
    sizes: ['28', '30', '32', '34', '36']
  },
  {
    id: 'fashion-4',
    name: 'Floral Maxi Dress',
    originalPrice: 129.99,
    price: 89.99,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    reviews: 156,
    endDate: '2024-03-05',
    brand: 'Bloom',
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'fashion-5',
    name: 'Wool Blend Coat',
    originalPrice: 249.99,
    price: 189.99,
    discount: 24,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviews: 178,
    endDate: '2024-02-27',
    brand: 'Winter Luxe',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'fashion-6',
    name: 'Silk Evening Gown',
    originalPrice: 399.99,
    price: 299.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1583759136431-9d70db2eb04c?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviews: 134,
    endDate: '2024-03-10',
    brand: 'Haute Couture',
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'fashion-7',
    name: 'Casual Linen Shirt',
    originalPrice: 79.99,
    price: 59.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
    rating: 4.4,
    reviews: 245,
    endDate: '2024-03-03',
    brand: 'Comfort Plus',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'fashion-8',
    name: 'Designer Handbag',
    originalPrice: 199.99,
    price: 149.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviews: 167,
    endDate: '2024-02-29',
    brand: 'Luxe Leather',
    sizes: ['One Size']
  },
  {
    id: 'fashion-9',
    name: 'Athletic Sneakers',
    originalPrice: 129.99,
    price: 99.99,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviews: 289,
    endDate: '2024-03-07',
    brand: 'SportStyle',
    sizes: ['7', '8', '9', '10', '11']
  },
  {
    id: 'fashion-10',
    name: 'Cashmere Sweater',
    originalPrice: 179.99,
    price: 139.99,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviews: 198,
    endDate: '2024-03-15',
    brand: 'Soft Luxe',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  }
];

export default function FeaturedProducts() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const { toggleWishlist, addToCart, wishlist } = useShop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const calculateTimeLeft = (endDate) => {
    const difference = new Date(endDate) - new Date();
    if (difference <= 0) return null;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);

    return { days, hours, minutes };
  };

  return (
    <section className="py-16 bg-teal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Fashion Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-tiny sm:text-lg">
              Discover our latest fashion trends with special offers
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-2 bg-indigo-100 dark:bg-indigo-900/50 px-4 py-2 rounded-lg">
            <Percent className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Limited Time Offers</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-6 lg:gap-8">
          {products.map((product) => {
            const timeLeft = calculateTimeLeft(product.endDate);
            
            return (
              <div
                key={product.id}
                className="group bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md overflow-hidden 
                         transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <Link to={`/product/${product.id}`} className="block relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover transform transition-transform 
                             duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    -{product.discount}%
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product);
                      showToast(`${product.name} ${wishlist.some(item => item.id === product.id) ? 'removed from' : 'added to'} wishlist`);
                    }}
                    className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-white dark:bg-gray-800 
                             shadow-md hover:scale-110 transition-all duration-200 opacity-0 
                             group-hover:opacity-100"
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        wishlist.some(item => item.id === product.id)
                          ? 'text-red-500 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                  {timeLeft && (
                    <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs py-1 
                                 px-2 rounded-full text-center">
                      Ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                    </div>
                  )}
                </Link>
                <div className="p-2 sm:p-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.brand}</div>
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 
                               truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-1 sm:mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2.5 h-2.5 sm:w-4 sm:h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 sm:ml-2 text-xxs sm:text-sm text-gray-500 dark:text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="text-xs sm:text-sm text-red-500 font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.sizes.map((size) => (
                      <span key={size} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {size}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                      showToast(`${product.name} added to cart`);
                    }}
                    className="w-full py-1.5 sm:py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 
                             transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg 
                   transform transition-transform duration-300 ${
                     showNotification ? 'translate-y-0' : 'translate-y-24'
                   }`}
      >
        {notificationMessage}
      </div>
    </section>
  );
}