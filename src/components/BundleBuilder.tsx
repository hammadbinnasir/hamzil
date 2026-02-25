import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, X, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../lib/data';
import { cn } from '../lib/utils';

export const BundleBuilder: React.FC<{ onClose: () => void, onAddBundleToCart: () => void }> = ({ onClose, onAddBundleToCart }) => {
  const [slots, setSlots] = useState<(typeof PRODUCTS[0] | null)[]>([null, null, null]);

  const addToSlot = (product: typeof PRODUCTS[0]) => {
    const firstEmptyIndex = slots.findIndex(s => s === null);
    if (firstEmptyIndex !== -1) {
      const newSlots = [...slots];
      newSlots[firstEmptyIndex] = product;
      setSlots(newSlots);
    }
  };

  const removeFromSlot = (index: number) => {
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
  };

  const filledCount = slots.filter(s => s !== null).length;
  const totalPrice = slots.reduce((acc, curr) => acc + (curr?.price || 0), 0);
  const discount = filledCount === 3 ? 0.2 : 0;
  const finalPrice = totalPrice * (1 - discount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-brand-cream">
          <div>
            <h2 className="text-2xl font-serif font-bold">Build Your Bundle</h2>
            <p className="text-sm text-gray-500">Select 3 sets for 20% off</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Product Selection */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <h3 className="font-medium mb-4 text-gray-500 uppercase text-xs tracking-wider">Choose your styles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRODUCTS.map(product => (
                <div
                  key={product.id}
                  className="bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-brand-pink transition-all group"
                  onClick={() => addToSlot(product)}
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <Plus className="text-white opacity-0 group-hover:opacity-100 w-8 h-8 drop-shadow-md" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-medium">{product.name}</span>
                    <span className="text-sm text-gray-500">Rs. {product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bundle State */}
          <div className="w-full md:w-80 bg-white border-l p-6 flex flex-col">
            <h3 className="font-medium mb-4 text-gray-500 uppercase text-xs tracking-wider">Your Bundle</h3>

            <div className="space-y-4 flex-1">
              {slots.map((slot, i) => (
                <div key={i} className="aspect-[3/1] rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center relative overflow-hidden group">
                  {slot ? (
                    <>
                      <img src={slot.image} alt={slot.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                      <div className="relative z-10 flex items-center gap-2">
                        <span className="font-serif font-bold">{slot.name}</span>
                      </div>
                      <button
                        onClick={() => removeFromSlot(i)}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-red-50 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-300 font-medium">Slot {i + 1}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>Rs. {totalPrice.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-brand-pink font-medium">
                  <span>Bundle Discount</span>
                  <span>-20%</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-serif font-bold mt-2">
                <span>Total</span>
                <span>Rs. {finalPrice.toFixed(2)}</span>
              </div>

              <button
                disabled={filledCount < 3}
                onClick={onAddBundleToCart}
                className="w-full mt-4 bg-brand-dark text-white py-4 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/90 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {filledCount < 3 ? `Add ${3 - filledCount} more` : 'Add Bundle to Cart'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
