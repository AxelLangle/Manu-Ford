import { Heart, Share2, ShoppingCart } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { useCart } from '@/Contexts/CartContext';
import { useWishlist } from '@/Contexts/WishListContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image });
    }
  };

  const handleShare = () => {
    // Implementar lógica de compartir
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Mira este producto: ${name}`,
        url: window.location.href,
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      console.log('Compartir:', { name, price, image });
    }
  };

  return (
    <div className="w-full max-w-[260px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative h-[220px] p-3 bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Action Buttons */}
        <div className="absolute bottom-6 right-6 flex items-center gap-1">
          <button
            onClick={handleToggleWishlist}
            className="w-8 h-8 rounded-full bg-[#060357] flex items-center justify-center hover:bg-[#0a0449] transition-colors"
            title={inWishlist ? 'Remover de favoritos' : 'Agregar a favoritos'}
          >
            <Heart
              className={`w-4 h-4 ${
                inWishlist ? 'text-red-500 fill-red-500' : 'text-gray-300'
              }`}
            />
          </button>
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-[#060357] flex items-center justify-center hover:bg-[#0a0449] transition-colors"
            title="Compartir producto"
          >
            <Share2 className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/producto/${id}`}>
          <h3 className="text-[#060357] text-base font-bold mb-2 hover:text-[#0a0449] transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-[#060357] text-base font-semibold mb-4">
          ${price.toFixed(2)}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full h-10 bg-[#060357] hover:bg-[#0a0449] transition-colors rounded-2xl flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5 text-white" />
          <span className="text-white text-base font-semibold">
            Añadir al carrito
          </span>
        </button>
      </div>
    </div>
  );
}
