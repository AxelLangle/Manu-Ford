import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link, Head } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import { useCart } from '@/Contexts/CartContext';
import { useState } from 'react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleApplyDiscount = () => {
    // Lógica de descuento (ejemplo simple)
    if (discountCode.trim()) {
      setDiscountApplied(true);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      clearCart();
    }
  };

  // Calcular descuento (ejemplo: 10% si hay código)
  const discountAmount = discountApplied ? total * 0.1 : 0;
  const finalTotal = total - discountAmount;

  return (
    <BaseLayout>
      <Head title="Mi Carrito - Manu Ford" />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#060357] hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="text-2xl font-semibold">Volver</span>
          </Link>

          {/* Title */}
          <h1 className="text-4xl font-bold text-[#060357] mb-8">Mi Carrito</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              {items.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#060357] shadow-md">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <p className="text-xl text-[#060357]/60 mb-4">Tu carrito está vacío</p>
                  <Link
                    href="/categoria/aceites"
                    className="inline-block px-6 py-2 bg-[#060357] text-white rounded-lg hover:bg-[#0a0449] transition-colors"
                  >
                    Continuar comprando
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Clear Cart Button */}
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={handleClearCart}
                      className="text-red-600 hover:text-red-800 text-sm font-semibold transition-colors"
                    >
                      Vaciar carrito
                    </button>
                  </div>

                  {/* Cart Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-[#060357] p-4 relative shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="w-32 h-32 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-[#060357] mb-1 line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 mb-2 text-sm">
                              Precio unitario: ${item.price.toFixed(2)}
                            </p>
                            <p className="text-[#060357] font-semibold mb-4">
                              Subtotal: ${(item.price * item.quantity).toFixed(2)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-7 h-7 rounded-full bg-[#060357] flex items-center justify-center hover:bg-[#0a0449] transition-colors"
                                title="Disminuir cantidad"
                              >
                                <Minus className="w-3 h-3 text-white" />
                              </button>
                              <div className="w-10 h-7 rounded border border-[#060357] flex items-center justify-center bg-white">
                                <span className="text-[#060357] font-bold text-sm">
                                  {item.quantity}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-7 h-7 rounded-full bg-[#060357] flex items-center justify-center hover:bg-[#0a0449] transition-colors"
                                title="Aumentar cantidad"
                              >
                                <Plus className="w-3 h-3 text-white" />
                              </button>
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="absolute top-4 right-4 flex flex-col items-center gap-1"
                            title="Eliminar del carrito"
                          >
                            <div className="w-9 h-9 rounded-full bg-[#060357] flex items-center justify-center hover:bg-red-600 transition-colors">
                              <Trash2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs text-[#060357] font-medium">
                              Eliminar
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {items.length > 0 && (
              <div className="lg:w-[357px]">
                <div className="bg-white rounded-2xl border-2 border-[#060357] p-6 sticky top-24 shadow-md">
                  <h2 className="text-2xl font-bold text-[#060357] mb-6">
                    Resumen del pedido
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm font-semibold text-[#060357]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Envío</span>
                      <span className="text-sm font-semibold text-[#060357]">
                        Gratis
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Impuestos</span>
                      <span className="text-sm font-semibold text-[#060357]">
                        $0.00
                      </span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between items-center text-green-600">
                        <span className="text-sm font-semibold">Descuento (10%)</span>
                        <span className="text-sm font-semibold">
                          -${discountAmount.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#060357] pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[#060357]">Total</span>
                      <span className="text-xl font-bold text-[#060357]">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Discount Code Input */}
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Código de descuento"
                        value={discountCode}
                        onChange={(e) => {
                          setDiscountCode(e.target.value);
                          setDiscountApplied(false);
                        }}
                        className="flex-1 h-10 px-4 rounded-lg border border-[#060357] bg-white text-[#060357] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#060357]"
                      />
                      <button
                        onClick={handleApplyDiscount}
                        className="px-4 h-10 bg-[#060357] text-white rounded-lg hover:bg-[#0a0449] transition-colors font-semibold text-sm"
                      >
                        Aplicar
                      </button>
                    </div>
                    {discountApplied && (
                      <p className="text-green-600 text-xs mt-2">
                        ✓ Código aplicado correctamente
                      </p>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className="w-full h-10 bg-[#060357] hover:bg-[#0a0449] transition-colors rounded-lg text-white font-bold flex items-center justify-center"
                  >
                    Proceder al pago
                  </Link>

                  {/* Continue Shopping */}
                  <Link
                    href="/categoria/aceites"
                    className="w-full h-10 mt-3 bg-white border border-[#060357] text-[#060357] hover:bg-gray-50 transition-colors rounded-lg font-bold flex items-center justify-center"
                  >
                    Continuar comprando
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
