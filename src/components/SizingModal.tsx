import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler, Check, Info } from 'lucide-react';

interface SizingModalProps {
    onClose: () => void;
}

export const SizingModal: React.FC<SizingModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
                onClick={onClose}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                <div className="p-8 border-b flex justify-between items-center bg-brand-cream/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center">
                            <Ruler className="w-5 h-5 text-brand-pink" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-bold italic">Sizing Guide</h2>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Find your perfect fit</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto space-y-8">
                    <section>
                        <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-brand-pink" />
                            How to Measure
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <span className="text-brand-pink font-bold text-lg mb-2 block">Step 1</span>
                                <p className="text-sm text-gray-600">Place a piece of clear tape across the widest part of your nail bed.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <span className="text-brand-pink font-bold text-lg mb-2 block">Step 2</span>
                                <p className="text-sm text-gray-600">Mark the edges of your nail with a pen, then remove the tape.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <span className="text-brand-pink font-bold text-lg mb-2 block">Step 3</span>
                                <p className="text-sm text-gray-600">Measure the distance between the marks using a millimeter (mm) ruler.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <span className="text-brand-pink font-bold text-lg mb-2 block">Step 4</span>
                                <p className="text-sm text-gray-600">Repeat for all 10 fingers and compare with our size chart below.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-serif mb-4">Standard Size Chart</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="bg-brand-dark text-white font-serif">
                                        <th className="p-3 text-left border border-white/10 rounded-tl-xl">Size</th>
                                        <th className="p-3 text-left border border-white/10">Thumb</th>
                                        <th className="p-3 text-left border border-white/10">Index</th>
                                        <th className="p-3 text-left border border-white/10">Middle</th>
                                        <th className="p-3 text-left border border-white/10">Ring</th>
                                        <th className="p-3 text-left border border-white/10 rounded-tr-xl">Pinky</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr className="border-b">
                                        <td className="p-3 font-bold bg-gray-50">XS</td>
                                        <td className="p-3">14mm</td>
                                        <td className="p-3">10mm</td>
                                        <td className="p-3">11mm</td>
                                        <td className="p-3">10mm</td>
                                        <td className="p-3">7mm</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-3 font-bold bg-gray-50">S</td>
                                        <td className="p-3">15mm</td>
                                        <td className="p-3">11mm</td>
                                        <td className="p-3">12mm</td>
                                        <td className="p-3">11mm</td>
                                        <td className="p-3">8mm</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-3 font-bold bg-gray-50">M</td>
                                        <td className="p-3">16mm</td>
                                        <td className="p-3">12mm</td>
                                        <td className="p-3">13mm</td>
                                        <td className="p-3">12mm</td>
                                        <td className="p-3">9mm</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-3 font-bold bg-gray-50">L</td>
                                        <td className="p-3">18mm</td>
                                        <td className="p-3">13mm</td>
                                        <td className="p-3">14mm</td>
                                        <td className="p-3">13mm</td>
                                        <td className="p-3">10mm</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="bg-brand-pink/5 p-6 rounded-3xl border border-brand-pink/10">
                        <h4 className="font-bold text-brand-dark flex items-center gap-2 mb-2">
                            <Check className="w-4 h-4 text-brand-pink" />
                            Between Sizes?
                        </h4>
                        <p className="text-sm text-gray-600">
                            We always recommend choosing the larger size. You can easily file the sides of your Hamzil press-ons for a perfect customized fit.
                        </p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};
