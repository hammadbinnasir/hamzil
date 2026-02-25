import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Minus, Plus, ChevronDown, Ruler, ShoppingBag, ArrowLeft, Camera, Sparkles, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { PRODUCTS } from '../lib/data';
import { CameraModal } from './CameraModal';

interface ProductPageProps {
  product: typeof PRODUCTS[0];
  onBack: () => void;
  onOpenBundle: () => void;
  onOpenSizing: () => void;
  onAddToCart: (quantity: number, size: string | null) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product, onBack, onOpenBundle, onOpenSizing, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = [
    { type: 'image', src: product.image, alt: product.name },
    { type: 'image', src: product.hoverImage, alt: 'Detail view' },
    { type: 'video', src: '/cateye_1.jpg', alt: 'Process Video' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="min-h-screen bg-white pt-20 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 relative group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={images[activeImageIndex].src}
                  alt={images[activeImageIndex].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {images[activeImageIndex].type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-black border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              )}

              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm z-10">
                {product.tag}
              </span>

              {/* Try On Button Overlay */}
              <button
                onClick={() => setShowCamera(true)}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-brand-dark px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 hover:bg-white transition-all transform hover:scale-105 z-10"
              >
                <Camera className="w-4 h-4" />
                Virtual Try-On
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={cn(
                    "aspect-square rounded-xl overflow-hidden bg-gray-100 relative transition-all",
                    activeImageIndex === idx ? "ring-2 ring-brand-dark ring-offset-2" : "hover:opacity-80"
                  )}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  {img.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                        <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-black border-b-[4px] border-b-transparent ml-0.5"></div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info - Sticky on Desktop */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="mb-8">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-4xl md:text-5xl font-serif">{product.name}</h1>
                <div className="text-2xl font-serif">Rs. {product.price}</div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-brand-pink">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm text-gray-500">(128 Reviews)</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description || "Premium press-on nails featuring salon-grade materials. Includes 24 nails in 12 sizes, professional glue, adhesive tabs, and a prep kit for a flawless 10-minute application."}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-brand-dark font-medium">
                  <div className="w-8 h-8 rounded-full bg-brand-pink/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-brand-pink" />
                  </div>
                  Reusable up to 5 times with proper care
                </div>
                <div className="flex items-center gap-3 text-sm text-brand-dark font-medium">
                  <div className="w-8 h-8 rounded-full bg-brand-pink/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-brand-pink" />
                  </div>
                  Safe on natural nails — No UV light required
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Select Size</span>
                <button
                  onClick={onOpenSizing}
                  className="text-xs underline text-gray-500 flex items-center gap-1 hover:text-brand-pink"
                >
                  <Ruler className="w-3 h-3" /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {product.variants?.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-3 border rounded-xl text-sm font-medium transition-all text-center px-2",
                      selectedSize === size
                        ? "border-brand-dark bg-brand-dark text-white"
                        : "border-gray-200 hover:border-brand-dark"
                    )}
                  >
                    {size}
                  </button>
                )) || ['XS', 'S', 'M', 'L'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-3 border rounded-xl text-sm font-medium transition-all text-center",
                      selectedSize === size
                        ? "border-brand-dark bg-brand-dark text-white"
                        : "border-gray-200 hover:border-brand-dark"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Bundle Trigger */}
            <div
              className="p-4 rounded-xl border-2 border-gray-100 hover:border-brand-pink mb-8 cursor-pointer transition-all bg-gray-50 hover:bg-brand-pink/5 group"
              onClick={onOpenBundle}
            >
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mt-0.5 group-hover:border-brand-pink">
                  <Plus className="w-3 h-3 text-gray-400 group-hover:text-brand-pink" />
                </div>
                <div>
                  <span className="font-bold block text-brand-dark group-hover:text-brand-pink transition-colors">Bundle & Save 20%</span>
                  <p className="text-sm text-gray-500">Add this + 2 more sets to unlock the discount.</p>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-full px-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-brand-pink">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-brand-pink">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => onAddToCart(quantity, selectedSize)}
                className="flex-1 bg-brand-dark text-white py-4 rounded-full font-bold text-lg hover:bg-black/90 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart — Rs. {(product.price * quantity).toFixed(2)}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-500 border-t pt-6">
              <div>
                <span className="block font-bold text-brand-dark mb-1">Free Shipping</span>
                On orders over Rs. 2000
              </div>
              <div>
                <span className="block font-bold text-brand-dark mb-1">Reusable</span>
                Up to 5 times
              </div>
              <div>
                <span className="block font-bold text-brand-dark mb-1">Damage Free</span>
                Safe removal
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 lg:hidden z-40 pb-safe">
        <button
          onClick={() => onAddToCart(quantity, selectedSize)}
          className="w-full bg-brand-dark text-white py-4 rounded-full font-bold text-lg shadow-xl"
        >
          Add to Cart — Rs. {(product.price * quantity).toFixed(2)}
        </button>
      </div>

      {showCamera && <CameraModal onClose={() => setShowCamera(false)} />}
    </motion.div>
  );
};
