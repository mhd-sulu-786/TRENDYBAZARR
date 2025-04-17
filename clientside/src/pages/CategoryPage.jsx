import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/useShop';
import { products } from '../utils/productData';

function CategoryPage() {
  const { category } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const [showFilters, setShowFilters] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    priceRanges: [],
    priceRange: {
      min: 0,
      max: 2000
    },
    brands: [],
    ratings: [],
    inStock: false
  });

  const categoryProducts = Object.values(products).filter(
    product => product.category.toLowerCase() === category.toLowerCase()
  );

  const [initialPriceRange] = useState({
    min: Math.min(...categoryProducts.map(p => p.price)),
    max: Math.max(...categoryProducts.map(p => p.price))
  });

  const itemsPerPage = 12;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter and sort products
  const filteredProducts = categoryProducts.filter(product => {
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
    if (filters.inStock && !product.inStock) return false;
    if (filters.ratings.length > 0 && !filters.ratings.some(r => product.rating >= parseInt(r))) return false;
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;
    
    if (filters.priceRanges.length > 0) {
      return filters.priceRanges.some(range => {
        const [min, max] = range.split('-').map(Number);
        return max ? (product.price >= min && product.price <= max) : product.price >= min;
      });
    }
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  // Get unique brands for filter
  const brands = [...new Set(categoryProducts.map(product => product.brand))];

  const handlePriceRangeChange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRanges: prev.priceRanges.includes(range)
        ? prev.priceRanges.filter(r => r !== range)
        : [...prev.priceRanges, range]
    }));
  };

  const handleBrandChange = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => ({
      ...prev,
      ratings: prev.ratings.includes(rating)
        ? prev.ratings.filter(r => r !== rating)
        : [...prev.ratings, rating]
    }));
  };

  const handlePriceRangeInput = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
          {category.replace('-', ' ')}
        </h1>
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div className="flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-48 p-2 border rounded-lg"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white
                     rounded-lg hover:bg-indigo-700 transition-colors 
                     duration-200 md:hidden"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`fixed md:relative inset-0 z-40 bg-white dark:bg-gray-800 w-72 
                      transform transition-transform duration-300 ease-in-out 
                      ${showFilters ? 'translate-x-0' : '-translate-x-full'} 
                      md:translate-x-0 overflow-y-auto`}>
          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceRangeInput('min', Number(e.target.value))}
                    className="w-24 p-1 border rounded"
                    min={initialPriceRange.min}
                    max={filters.priceRange.max}
                  />
                  <span>to</span>
                  <input
                    type="number"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceRangeInput('max', Number(e.target.value))}
                    className="w-24 p-1 border rounded"
                    min={filters.priceRange.min}
                    max={initialPriceRange.max}
                  />
                </div>
                <div className="space-y-2">
                  {[
                    { value: '0-50', label: 'Under $50' },
                    { value: '50-100', label: '$50 - $100' },
                    { value: '100-200', label: '$100 - $200' },
                    { value: '200', label: '$200 and above' }
                  ].map(range => (
                    <label key={range.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.priceRanges.includes(range.value)}
                        onChange={() => handlePriceRangeChange(range.value)}
                        className="rounded text-indigo-600 mr-2"
                      />
                      {range.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {brands.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Brand</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="rounded text-indigo-600 mr-2"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-2">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2].map(rating => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.ratings.includes(rating.toString())}
                      onChange={() => handleRatingChange(rating.toString())}
                      className="rounded text-indigo-600 mr-2"
                    />
                    {rating}+ Stars
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                  className="rounded text-indigo-600 mr-2"
                />
                In Stock Only
              </label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                         group hover:-translate-y-1 transition-all duration-300"
              >
                <Link to={`/product/${product.id}`} className="block relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full aspect-square object-cover transform transition-transform 
                             duration-500 group-hover:scale-110"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product);
                      showToast(`${product.name} ${wishlist.includes(product.id) ? 'removed from' : 'added to'} wishlist`);
                    }}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 
                             hover:bg-white transition-colors duration-200"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.includes(product.id)
                          ? 'text-red-500 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                  {!product.inStock && (
                    <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 
                                 text-xs rounded">
                      Out of Stock
                    </div>
                  )}
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 hover:text-indigo-600">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => {
                        if (product.inStock) {
                          addToCart(product);
                          showToast(`${product.name} added to cart`);
                        }
                      }}
                      disabled={!product.inStock}
                      className={`p-2 rounded-full ${
                        product.inStock
                          ? 'bg-indigo-600 hover:bg-indigo-700'
                          : 'bg-gray-400 cursor-not-allowed'
                      } text-white transition-colors duration-200`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 
                           disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === i + 1
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 
                           disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg 
                   shadow-lg transform transition-transform duration-300 ${
                     showNotification ? 'translate-y-0' : 'translate-y-24'
                   }`}
      >
        {notificationMessage}
      </div>
    </div>
  );
}

export default CategoryPage;