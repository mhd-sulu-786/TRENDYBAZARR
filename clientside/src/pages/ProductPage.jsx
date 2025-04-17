import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Share2, Truck, Package, Shield } from 'lucide-react';
import { useShop } from '../context/useShop';
import { products } from '../utils/productData';

function ProductPage() {
const { id } = useParams();
const navigate = useNavigate();
const product = products[id];
const [selectedImage, setSelectedImage] = useState(0);
const [quantity, setQuantity] = useState(1);
const [showNotification, setShowNotification] = useState(false);
const [notificationMessage, setNotificationMessage] = useState('');
const [showShareMenu, setShowShareMenu] = useState(false);
const { addToCart, toggleWishlist, wishlist } = useShop();

useEffect(() => {
window.scrollTo(0, 0);
}, [id]);

if (!product) {
return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
<div className="text-center">
<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h2>
<Link to="/products" className="mt-4 text-indigo-600 hover:text-indigo-500">
Browse all products
</Link>
</div>
</div>
);
}

// Ensure product.images exists and is an array, otherwise use empty array
const productImages = Array.isArray(product.images) ? product.images : [];

const similarProducts = Object.values(products)
.filter(p => p.category === product.category && p.id !== product.id)
.slice(0, 4);

const handleAddToCart = () => {
addToCart({ ...product, quantity });
showToast(`${product.name} added to cart`);
};

const handleBuyNow = () => {
navigate('/buy-now', { state: { product, quantity } });
};

const showToast = (message) => {
setNotificationMessage(message);
setShowNotification(true);
setTimeout(() => setShowNotification(false), 2000);
};

const handleShare = (platform) => {
const url = window.location.href;
const title = `Check out ${product.name}!`;

const shareUrls = {
facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`
};

window.open(shareUrls[platform], '_blank');
setShowShareMenu(false);
};

return (
<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
<div className="space-y-4">
<div className="relative bg-gray-100 rounded-lg overflow-hidden">
<button
onClick={() => toggleWishlist(product)}
className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:scale-110
transition-transform duration-200 z-10"
>
<Heart
className={`w-5 h-5 ${
wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
}`}
/>
</button>
<img
src={productImages[selectedImage] || 'https://via.placeholder.com/500x500?text=No+Image'}
alt={product.name}
className="w-full h-[500px] object-cover"
/>
</div>
<div className="grid grid-cols-4 gap-4">
{productImages.map((image, index) => (
<button
key={index}
onClick={() => setSelectedImage(index)}
className={`relative rounded-lg overflow-hidden ${
selectedImage === index ? 'ring-2 ring-indigo-500' : ''
}`}
>
<img
src={image}
alt={`${product.name} ${index + 1}`}
className="w-full h-24 object-cover"
/>
</button>
))}
</div>
</div>

<div className="space-y-6">
<div>
<h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
<p className="text-lg text-gray-500 dark:text-gray-400 mt-2">{product.category}</p>
</div>

<div className="flex items-center space-x-4">
<div className="flex items-center">
{[...Array(5)].map((_, i) => (
<Star
key={i}
className={`w-5 h-5 ${
i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
}`}
/>
))}
</div>
<span className="text-gray-500 dark:text-gray-400">
{product.reviews} verified reviews
</span>
</div>

<div className="border-t border-b py-4">
<div className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</div>
<div className="mt-4 flex items-center space-x-4">
<div className="flex items-center">
<label htmlFor="quantity" className="mr-2 text-gray-700 dark:text-gray-300">
Quantity
</label>
<select
id="quantity"
value={quantity}
onChange={(e) => setQuantity(parseInt(e.target.value))}
className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
>
{[1, 2, 3, 4, 5].map((num) => (
<option key={num} value={num}>
{num}
</option>
))}
</select>
</div>
<button
onClick={() => setShowShareMenu(!showShareMenu)}
className="p-2 text-gray-500 hover:text-gray-700 relative"
>
<Share2 className="w-5 h-5" />
{showShareMenu && (
<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
{['facebook', 'twitter', 'linkedin', 'whatsapp'].map((platform) => (
<button
key={platform}
onClick={() => handleShare(platform)}
className="block w-full text-left px-4 py-2 hover:bg-gray-100 capitalize"
>
Share on {platform}
</button>
))}
</div>
)}
</button>
</div>
</div>

<div className="space-y-4">
<button
onClick={handleAddToCart}
className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700
transition-colors duration-200"
>
Add to Cart
</button>
<button
onClick={handleBuyNow}
className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-lg
hover:bg-indigo-50 transition-colors duration-200"
>
Buy Now
</button>
</div>

<div className="grid grid-cols-3 gap-4">
<div className="text-center">
<Truck className="w-6 h-6 mx-auto text-indigo-600" />
<p className="mt-2 text-sm">Free Delivery</p>
</div>
<div className="text-center">
<Package className="w-6 h-6 mx-auto text-indigo-600" />
<p className="mt-2 text-sm">30-Day Returns</p>
</div>
<div className="text-center">
<Shield className="w-6 h-6 mx-auto text-indigo-600" />
<p className="mt-2 text-sm">2 Year Warranty</p>
</div>
</div>

<div className="prose dark:prose-invert">
<h3 className="text-lg font-semibold">Description</h3>
<p>{product.description}</p>

<h3 className="text-lg font-semibold mt-6">Features</h3>
<ul>
{Array.isArray(product.features) && product.features.map((feature, index) => (
<li key={index}>{feature}</li>
))}
</ul>
</div>
</div>
</div>

{similarProducts.length > 0 && (
<div className="mt-16">
<h2 className="text-2xl font-bold mb-8">Similar Products</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{similarProducts.map((similarProduct) => (
<Link
key={similarProduct.id}
to={`/product/${similarProduct.id}`}
className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden
hover:-translate-y-1 transition-all duration-300"
>
<div className="relative">
<img
src={Array.isArray(similarProduct.images) && similarProduct.images.length > 0
? similarProduct.images[0]
: 'https://via.placeholder.com/500x500?text=No+Image'}
alt={similarProduct.name}
className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
/>
{!similarProduct.inStock && (
<div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
Out of Stock
</div>
)}
</div>
<div className="p-4">
<h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600
transition-colors duration-200">
{similarProduct.name}
</h3>
<div className="flex items-center mt-2">
<div className="flex items-center">
{[...Array(5)].map((_, i) => (
<Star
key={i}
className={`w-4 h-4 ${
i < Math.floor(similarProduct.rating)
? 'text-yellow-400 fill-current'
: 'text-gray-300'
}`}
/>
))}
</div>
<span className="ml-2 text-sm text-gray-500">({similarProduct.reviews})</span>
</div>
<div className="mt-2 font-bold text-gray-900 dark:text-white">
${similarProduct.price}
</div>
</div>
</Link>
))}
</div>
</div>
)}

{/* Toast Notification */}
<div
className={`fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg
transform transition-transform duration-300 ${
showNotification ? 'translate-y-0' : 'translate-y-24'
}`}
>
{notificationMessage}
{notificationMessage.includes('cart') && (
<Link
to="/cart"
className="ml-4 text-indigo-400 hover:text-indigo-300 font-medium"
>
View Cart
</Link>
)}
</div>
</div>
);
}

export default ProductPage;