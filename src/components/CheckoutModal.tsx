import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Loader2, CreditCard, MapPin, Mail, User, Phone, ChevronRight, ShoppingBag, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface CheckoutModalProps {
  onClose: () => void;
  cartTotal: number;
}

type CheckoutStep = 'information' | 'shipping' | 'payment' | 'success';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, cartTotal }) => {
  const [step, setStep] = useState<CheckoutStep>('information');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'Pakistan',
    postalCode: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'information') setStep('shipping');
    else if (step === 'shipping') setStep('payment');
  };

  const prevStep = () => {
    if (step === 'shipping') setStep('information');
    else if (step === 'payment') setStep('shipping');
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          cartTotal,
          shippingCost,
          finalTotal
        }),
      });

      if (!response.ok) throw new Error('Failed to send order notification');

      setLoading(false);
      setStep('success');
    } catch (error) {
      console.error(error);
      alert('There was an issue processing your order. Please try again.');
      setLoading(false);
    }
  };

  const shippingCost = cartTotal > 2000 ? 0 : 200;
  const finalTotal = cartTotal + shippingCost;

  const breadcrumbs = [
    { id: 'information', label: 'Information' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' }
  ];

  const OrderSummary = ({ className }: { className?: string }) => (
    <div className={cn("space-y-6", className)}>
      <div className="bg-gray-50/50 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-brand-pink" />
          Order Summary
        </h3>
        <div className="space-y-3 pb-4 border-b border-gray-100">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">Rs. {cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            <span className={cn("font-medium", cartTotal > 2000 ? "text-green-600" : "text-brand-dark")}>
              {cartTotal > 2000 ? 'Free' : `Rs. ${shippingCost.toFixed(2)}`}
            </span>
          </div>
        </div>
        <div className="flex justify-between pt-4 text-xl font-bold font-serif">
          <span>Total</span>
          <span className="text-brand-pink">Rs. {finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {step === 'information' && (
        <div className="p-4 bg-brand-pink/5 rounded-2xl border border-brand-pink/10 text-xs text-brand-pink leading-relaxed">
          <p className="font-bold mb-1">💡 Special Offer</p>
          Add more items worth Rs. {Math.max(0, 2001 - cartTotal).toFixed(0)} to unlock <strong>FREE SHIPPING</strong>.
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="relative bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] border border-white/20"
      >
        {/* Main Content Areas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header & Breadcrumbs */}
          <div className="px-8 pt-8 pb-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-serif font-bold tracking-tighter">Hamzil.</h1>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden">
                <X className="w-5 h-5" />
              </button>
            </div>

            {step !== 'success' && (
              <nav className="flex items-center gap-2 text-xs font-medium mb-8">
                {breadcrumbs.map((b, i) => (
                  <React.Fragment key={b.id}>
                    <button
                      onClick={() => {
                        const steps = ['information', 'shipping', 'payment'];
                        if (steps.indexOf(b.id as any) < steps.indexOf(step)) setStep(b.id as any);
                      }}
                      className={cn(
                        "transition-colors",
                        step === b.id ? "text-brand-pink" : "text-gray-400 hover:text-gray-600"
                      )}
                    >
                      {b.label}
                    </button>
                    {i < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3 text-gray-300" />}
                  </React.Fragment>
                ))}
              </nav>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-8 pb-8">
            <AnimatePresence mode="wait">
              {step === 'information' && (
                <motion.form
                  key="info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={nextStep}
                  className="space-y-8"
                >
                  <section>
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" /> Contact Information
                    </h3>
                    <div className="space-y-2">
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email for order updates"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 rounded-2xl border border-gray-200 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5 outline-none transition-all placeholder:text-gray-400"
                      />
                      <span className="text-[10px] text-gray-400">* Required for order tracking</span>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" /> Shipping Address
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        required
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="px-4 py-4 rounded-2xl border border-gray-200 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5 outline-none transition-all"
                      />
                      <input
                        required
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="px-4 py-4 rounded-2xl border border-gray-200 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5 outline-none transition-all"
                      />
                      <input
                        required
                        className="col-span-2 px-4 py-4 rounded-2xl border border-gray-200 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5 outline-none transition-all"
                        name="address"
                        placeholder="Suite, House No, Street Name *"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                      <input
                        className="col-span-2 px-4 py-4 rounded-2xl border border-gray-200 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5 outline-none transition-all"
                        name="apartment"
                        placeholder="Apartment, Studio, or floor (Optional)"
                        value={formData.apartment}
                        onChange={handleInputChange}
                      />
                      <input
                        required
                        className="px-4 py-4 rounded-2xl border border-gray-200 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5 outline-none transition-all"
                        name="city"
                        placeholder="City *"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                      <input
                        required
                        className="px-4 py-4 rounded-2xl border border-gray-200 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5 outline-none transition-all"
                        name="postalCode"
                        placeholder="Postal Code *"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                      <div className="col-span-2 relative">
                        <input
                          required
                          type="tel"
                          name="phone"
                          placeholder="Phone Number for courier *"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-12 py-4 rounded-2xl border border-gray-200 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5 outline-none transition-all"
                        />
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </section>

                  <div className="pt-6 border-t flex items-center justify-between">
                    <span className="text-xs text-gray-400">Secure 256-bit SSL encrypted checkout</span>
                    <button
                      type="submit"
                      className="bg-brand-dark text-white px-10 py-4 rounded-full font-bold hover:bg-brand-pink transition-all shadow-xl hover:shadow-brand-pink/20"
                    >
                      Continue to Shipping
                    </button>
                  </div>
                </motion.form>
              )}

              {step === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="border border-gray-100 rounded-3xl overflow-hidden divide-y divide-gray-100">
                    <div className="p-4 flex gap-4 text-sm">
                      <span className="text-gray-400 w-16">Contact</span>
                      <span className="flex-1 truncate">{formData.email}</span>
                      <button onClick={prevStep} className="text-brand-pink font-medium hover:underline">Change</button>
                    </div>
                    <div className="p-4 flex gap-4 text-sm">
                      <span className="text-gray-400 w-16">Ship to</span>
                      <span className="flex-1 truncate">{formData.address}, {formData.city}</span>
                      <button onClick={prevStep} className="text-brand-pink font-medium hover:underline">Change</button>
                    </div>
                  </div>

                  <section>
                    <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
                    <div className="p-6 border-2 border-brand-pink bg-brand-pink/5 rounded-[2rem] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border-4 border-brand-pink bg-white" />
                        <div>
                          <p className="font-bold">Standard Courier Delivery</p>
                          <p className="text-sm text-gray-500">Arrives in 2-4 business days</p>
                        </div>
                      </div>
                      <span className="font-bold">{shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost}`}</span>
                    </div>
                  </section>

                  <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button onClick={prevStep} className="text-sm text-gray-400 hover:text-black font-medium transition-colors">
                      Return to information
                    </button>
                    <button
                      onClick={() => setStep('payment')}
                      className="w-full sm:w-auto bg-brand-dark text-white px-10 py-4 rounded-full font-bold hover:bg-brand-pink transition-all shadow-xl shadow-brand-dark/10"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="border border-gray-100 rounded-3xl overflow-hidden divide-y divide-gray-100 bg-gray-50/50 backdrop-blur-sm">
                    <div className="p-4 flex gap-4 text-sm">
                      <span className="text-gray-400 w-16">Contact</span>
                      <span className="flex-1 truncate">{formData.email}</span>
                      <button onClick={() => setStep('information')} className="text-brand-pink font-medium hover:underline">Change</button>
                    </div>
                    <div className="p-4 flex gap-4 text-sm">
                      <span className="text-gray-400 w-16">Ship to</span>
                      <span className="flex-1 truncate">{formData.address}, {formData.city}</span>
                      <button onClick={() => setStep('information')} className="text-brand-pink font-medium hover:underline">Change</button>
                    </div>
                    <div className="p-4 flex gap-4 text-sm">
                      <span className="text-gray-400 w-16">Method</span>
                      <span className="flex-1">Standard Delivery • {shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost}`}</span>
                      <button onClick={() => setStep('shipping')} className="text-brand-pink font-medium hover:underline">Change</button>
                    </div>
                  </div>

                  <section className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gray-400" /> Payment
                    </h3>
                    <p className="text-sm text-gray-400">All transactions are secure and encrypted.</p>
                    <div className="p-6 border-2 border-brand-pink bg-brand-pink/5 rounded-3xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border-4 border-brand-pink bg-white" />
                        <span className="font-bold uppercase tracking-wide">Cash on Delivery (COD)</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-gray-200 rounded opacity-50" />
                        <div className="w-8 h-5 bg-gray-200 rounded opacity-50" />
                      </div>
                    </div>
                  </section>

                  <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button onClick={() => setStep('shipping')} className="text-sm text-gray-400 hover:text-black font-medium transition-colors">
                      Return to shipping
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="w-full sm:w-auto bg-brand-dark text-white px-12 py-5 rounded-full font-bold hover:bg-brand-pink transition-all shadow-2xl flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Order'}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 px-4"
                >
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <Check className="w-12 h-12" />
                  </div>
                  <h3 className="text-5xl font-serif mb-4 leading-tight">Order Confirmed!</h3>
                  <p className="text-gray-500 mb-12 max-w-md mx-auto text-lg leading-relaxed">
                    Thank you for your purchase, {formData.firstName}! We've started prepping your <strong className="text-brand-dark">Cat Eye</strong> collection. Your order number is <strong className="text-brand-dark">#HAM-{Math.floor(Math.random() * 9000) + 1000}</strong>.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-brand-dark text-white px-12 py-5 rounded-full font-bold hover:bg-brand-pink transition-all shadow-xl hover:scale-105"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar Summary Area */}
        {step !== 'success' && (
          <aside className="w-full md:w-[350px] lg:w-[400px] bg-gray-50/80 backdrop-blur-md border-l border-gray-100 p-8 hidden md:block overflow-y-auto">
            <OrderSummary />
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
                  <ShoppingBag className="w-6 h-6 text-brand-pink" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Selected Item</p>
                  <p className="font-serif text-lg">Your Cat Eye Collection</p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4 mb-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 text-brand-pink" /> Guaranteed Safety
                </div>
                <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-brand-pink/20 pl-4">
                  "Every set is sterilized and hand-inspected by our specialist team before being packed in our luxury keepsake boxes."
                </p>
              </div>
            </div>
          </aside>
        )}
      </motion.div>
    </div>
  );
};
