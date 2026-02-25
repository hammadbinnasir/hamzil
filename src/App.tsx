import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Star, ArrowRight, Play, Check, Sparkles, User } from 'lucide-react';
import { cn } from './lib/utils';
import { PRODUCTS, REVIEWS } from './lib/data';
import { ProductPage } from './components/ProductPage';
import { BundleBuilder } from './components/BundleBuilder';
import { LoginModal } from './components/LoginModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SizingModal } from './components/SizingModal';

// --- Components ---

const Navbar = ({ onOpenBundle, cartCount, onOpenCart, user, onLogin, onNavClick, onSizingClick }: { onOpenBundle: () => void, cartCount: number, onOpenCart: () => void, user: boolean, onLogin: () => void, onNavClick: (category: 'all' | 'new') => void, onSizingClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.location.reload()}>
            <span className="font-serif text-2xl font-bold tracking-tighter text-brand-dark">Hamzil.</span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => { onNavClick('all'); setIsOpen(false); }} className="text-sm font-medium hover:text-brand-pink transition-colors">Shop All</button>
            <button onClick={() => { onNavClick('new'); setIsOpen(false); }} className="text-sm font-medium hover:text-brand-pink transition-colors">New Drops</button>
            <button onClick={() => { onSizingClick(); setIsOpen(false); }} className="text-sm font-medium hover:text-brand-pink transition-colors">Sizing Guide</button>
            <button onClick={onOpenBundle} className="text-sm font-medium hover:text-brand-pink transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Bundles
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink font-bold text-sm">
                U
              </div>
            ) : (
              <button onClick={onLogin} className="text-sm font-medium hover:text-brand-pink transition-colors hidden md:block">
                Login
              </button>
            )}

            <button onClick={onOpenCart} className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 w-2 h-2 bg-brand-pink rounded-full animate-pulse"></span>
              )}
            </button>
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-cream border-b border-black/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => { onNavClick('all'); setIsOpen(false); }} className="block w-full text-left py-2 text-lg font-serif">Shop All</button>
              <button onClick={() => { onNavClick('new'); setIsOpen(false); }} className="block w-full text-left py-2 text-lg font-serif">New Drops</button>
              <button onClick={() => { onSizingClick(); setIsOpen(false); }} className="block w-full text-left py-2 text-lg font-serif">Sizing Guide</button>
              <button onClick={() => { onOpenBundle(); setIsOpen(false); }} className="block w-full text-left py-2 text-lg font-serif">Bundles</button>
              {!user && (
                <button onClick={onLogin} className="block w-full text-left py-2 text-lg font-serif text-brand-pink">Login</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onShopClick }: { onShopClick: () => void }) => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2560&auto=format&fit=crop"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block py-1 px-4 rounded-full bg-brand-pink/20 backdrop-blur-md border border-brand-pink/30 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
        >
          Specialist Press-On Artistry
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-white mb-6 leading-[0.85] tracking-tighter"
        >
          Magnetic<br />
          <span className="italic font-light text-brand-pink">Cat Eye.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/95 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          The viral velvet finish you've seen on your feed, now available as damage-free press-ons. Salon precision, zero appointment required.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <button
            onClick={onShopClick}
            className="px-10 py-5 bg-white text-brand-dark font-bold rounded-full hover:bg-brand-pink hover:text-white transition-all transform hover:scale-105 shadow-2xl"
          >
            Shop Cat Eye Collection
          </button>
          <button
            onClick={onShopClick}
            className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-brand-pink" />
            Discover Trends
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: typeof PRODUCTS[0], onClick: () => void }> = ({ product, onClick }) => {
  return (
    <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]" onClick={onClick}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-4 transition-shadow duration-300 group-hover:shadow-xl">
        <span className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
          {product.tag}
        </span>
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.hoverImage}
          alt={`${product.name} detail`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button className="w-full bg-white/90 backdrop-blur text-brand-dark py-3 rounded-xl font-medium text-sm hover:bg-white shadow-lg">
            Quick View
          </button>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif text-xl leading-none mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.shape}</p>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} className="w-3 h-3 fill-brand-dark text-brand-dark" />
          ))}
        </div>
      </div>
    </div>
  );
};

const NailBar = ({ onProductClick, filter }: { onProductClick: (p: typeof PRODUCTS[0]) => void, filter: 'all' | 'new' }) => {
  const filteredProducts = filter === 'new'
    ? PRODUCTS.filter(p => p.tag === 'New Drop')
    : PRODUCTS;

  return (
    <section id="shop-section" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">
            {filter === 'new' ? 'The New Arrivals' : 'The Trend Report'}
          </h2>
          <p className="text-gray-500 max-w-md text-sm sm:text-base">
            {filter === 'new'
              ? 'Be the first to wear our latest specialist textures and limited edition magnetic shifts.'
              : 'Our monthly drops of the most viral manicures. Hand-painted designs and specialist textures, delivered to your door.'}
          </p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-sm font-semibold border-b border-black pb-1 hover:text-brand-pink hover:border-brand-pink transition-colors">
          View All {filter === 'new' ? 'New' : 'Collections'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
        ))}
      </div>

      <div className="mt-12 text-center md:hidden">
        <button className="px-8 py-3 border border-black rounded-full font-medium">View All Styles</button>
      </div>
    </section>
  );
};

const BundleSection = ({ onOpenBundle }: { onOpenBundle: () => void }) => {
  return (
    <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2560&auto=format&fit=crop" className="w-full h-full object-cover" alt="Background" />
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <span className="text-brand-pink font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 block">Limited Time Offer</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-6">Curate Your<br />Rotation</h2>
          <p className="text-white/80 text-lg mb-8 max-w-md">
            Mix and match any 3 viral styles and save 20%. The specialist's way to maintain a flawless manicure all month long.
          </p>
          <button
            onClick={onOpenBundle}
            className="bg-white text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-pink hover:text-white transition-all shadow-xl flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Start Building
          </button>
        </div>
        <div className="md:w-1/2 relative">
          {/* Visual representation of a bundle */}
          <div className="grid grid-cols-2 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="bg-white p-2 rounded-xl shadow-lg transform translate-y-8">
              <img src={PRODUCTS[0].image} className="rounded-lg aspect-square object-cover" alt="Bundle item 1" />
            </div>
            <div className="bg-white p-2 rounded-xl shadow-lg">
              <img src={PRODUCTS[1].image} className="rounded-lg aspect-square object-cover" alt="Bundle item 2" />
            </div>
            <div className="bg-white p-2 rounded-xl shadow-lg transform -translate-y-8">
              <img src={PRODUCTS[2].image} className="rounded-lg aspect-square object-cover" alt="Bundle item 3" />
            </div>
            <div className="flex items-center justify-center text-brand-pink">
              <div className="text-center">
                <span className="block text-4xl font-bold">-20%</span>
                <span className="text-sm uppercase tracking-wider">OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const QuizSection = () => {
  const [step, setStep] = useState(0);

  return (
    <section className="py-24 bg-brand-pink/5 border-y border-brand-pink/10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-brand-pink mb-4 block">Artistry in Every Detail</span>
        <h2 className="text-4xl md:text-6xl font-serif mb-8">Guided Fitting</h2>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
            <motion.div
              className="h-full bg-brand-pink"
              initial={{ width: "0%" }}
              animate={{ width: `${(step + 1) * 33}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-left"
              >
                <h3 className="text-2xl font-serif mb-6">What's your usual vibe?</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setStep(1)} className="p-4 border rounded-xl hover:border-brand-pink hover:bg-brand-pink/5 transition-all text-left group">
                    <span className="block text-lg font-medium mb-1">Clean Girl</span>
                    <span className="text-sm text-gray-500 group-hover:text-brand-pink">Short, neutral, polished.</span>
                  </button>
                  <button onClick={() => setStep(1)} className="p-4 border rounded-xl hover:border-brand-pink hover:bg-brand-pink/5 transition-all text-left group">
                    <span className="block text-lg font-medium mb-1">Drama Queen</span>
                    <span className="text-sm text-gray-500 group-hover:text-brand-pink">Long, bold, sparkly.</span>
                  </button>
                </div>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-left"
              >
                <h3 className="text-2xl font-serif mb-6">How wide is your thumb nail?</h3>
                <div className="space-y-3">
                  <button onClick={() => setStep(2)} className="w-full p-4 border rounded-xl hover:border-brand-pink hover:bg-brand-pink/5 transition-all flex justify-between items-center">
                    <span>Petite (Under 14mm)</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                  </button>
                  <button onClick={() => setStep(2)} className="w-full p-4 border rounded-xl hover:border-brand-pink hover:bg-brand-pink/5 transition-all flex justify-between items-center">
                    <span>Average (15mm - 17mm)</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                  </button>
                  <button onClick={() => setStep(2)} className="w-full p-4 border rounded-xl hover:border-brand-pink hover:bg-brand-pink/5 transition-all flex justify-between items-center">
                    <span>Wide (Over 18mm)</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                  </button>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-serif mb-2">We found your match!</h3>
                <p className="text-gray-500 mb-8">Based on your answers, we recommend the <strong>Short Almond</strong> shape in Size <strong>M</strong>.</p>
                <button className="px-8 py-4 bg-brand-dark text-white rounded-full font-semibold hover:bg-black/80 transition-all">
                  Shop Your Match
                </button>
                <button onClick={() => setStep(0)} className="block mx-auto mt-4 text-sm text-gray-400 hover:text-black">
                  Retake Quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif mb-4">Seen on the 'Gram</h2>
        <p className="text-gray-500">Tag @Hamzil to be featured</p>
      </div>

      {/* Marquee Effect */}
      <div className="relative flex overflow-x-hidden">
        <div className="py-12 animate-marquee whitespace-nowrap flex gap-8">
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div key={i} className="inline-block w-80 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 whitespace-normal">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star
                      key={s}
                      className={cn(
                        "w-3.5 h-3.5",
                        s <= review.rating ? "fill-brand-pink text-brand-pink" : "fill-gray-100 text-gray-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-300 font-medium uppercase tracking-tighter">{review.date}</span>
              </div>
              <p className="text-lg font-serif italic mb-4">"{review.text}"</p>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{review.user}</p>
            </div>
          ))}
        </div>

        <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex gap-8">
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div key={i} className="inline-block w-80 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 whitespace-normal">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star
                      key={s}
                      className={cn(
                        "w-3.5 h-3.5",
                        s <= review.rating ? "fill-brand-pink text-brand-pink" : "fill-gray-100 text-gray-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-300 font-medium uppercase tracking-tighter">{review.date}</span>
              </div>
              <p className="text-lg font-serif italic mb-4">"{review.text}"</p>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{review.user}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-serif mb-6">Hamzil.</h2>
          <p className="text-white/60 max-w-sm mb-8">
            The destination for specialist press-on artistry. Premium materials, magnetic technology, and viral designs for the modern muse.
          </p>
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white w-full max-w-xs"
            />
            <button className="bg-white text-brand-dark px-6 py-3 rounded-full font-semibold hover:bg-brand-cream transition-colors">
              Join
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white/40">Shop</h4>
          <ul className="space-y-4 text-white/80">
            <li><a href="#" className="hover:text-white">Best Sellers</a></li>
            <li><a href="#" className="hover:text-white">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white">Solid Colors</a></li>
            <li><a href="#" className="hover:text-white">Bundles</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white/40">Help</h4>
          <ul className="space-y-4 text-white/80">
            <li><a href="#" className="hover:text-white">Sizing Guide</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
        © 2026 Hamzil Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default function App() {
  const [activeProduct, setActiveProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [showBundleBuilder, setShowBundleBuilder] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSizing, setShowSizing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [productFilter, setProductFilter] = useState<'all' | 'new'>('all');

  // Mock function to simulate adding to cart
  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    // In a real app, we'd add the item to a cart array
  };

  const handleNavClick = (category: 'all' | 'new') => {
    setActiveProduct(null); // Return to home if viewing a product
    setProductFilter(category);
    setTimeout(() => {
      document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCheckoutClick = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
    } else {
      setShowCheckout(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    // If they were trying to checkout, proceed
    if (cartCount > 0) {
      setShowCheckout(true);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-pink selection:text-white">
      <Navbar
        onOpenBundle={() => setShowBundleBuilder(true)}
        cartCount={cartCount}
        onOpenCart={handleCheckoutClick}
        user={isLoggedIn}
        onLogin={() => setShowLogin(true)}
        onNavClick={handleNavClick}
        onSizingClick={() => setShowSizing(true)}
      />

      <AnimatePresence mode="wait">
        {activeProduct ? (
          <ProductPage
            key="product"
            product={activeProduct}
            onBack={() => setActiveProduct(null)}
            onOpenBundle={() => setShowBundleBuilder(true)}
            onOpenSizing={() => setShowSizing(true)}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onShopClick={() => handleNavClick('all')} />
            <NailBar onProductClick={setActiveProduct} filter={productFilter} />
            <BundleSection onOpenBundle={() => setShowBundleBuilder(true)} />
            <QuizSection />
            <SocialProof />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />

      <AnimatePresence>
        {showBundleBuilder && (
          <BundleBuilder
            onClose={() => setShowBundleBuilder(false)}
            onAddBundleToCart={() => {
              handleAddToCart();
              setShowBundleBuilder(false);
            }}
          />
        )}
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {showCheckout && (
          <CheckoutModal
            onClose={() => setShowCheckout(false)}
            cartTotal={cartCount * 899}
          />
        )}
        {showSizing && (
          <SizingModal
            onClose={() => setShowSizing(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
