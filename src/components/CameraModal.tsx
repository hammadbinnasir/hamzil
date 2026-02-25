import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, Sparkles, RefreshCw, ShoppingBag, CheckCircle2 } from 'lucide-react';

export const CameraModal = ({ onClose }: { onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFlash, setIsFlash] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!capturedImage) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' }
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          setError("Please enable camera access for the Virtual Try-On experience.");
          console.error(err);
        }
      };
      startCamera();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturedImage]);

  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Use video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw the current video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to data URL
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);

        // Trigger flash
        setIsFlash(true);
        setTimeout(() => setIsFlash(false), 150);

        // Start simulated AI analysis
        setIsAnalyzing(true);
        setTimeout(() => setIsAnalyzing(false), 2000);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-0 sm:p-4">
      <div className="relative w-full h-full sm:h-auto sm:max-w-md bg-black sm:rounded-[3rem] overflow-hidden aspect-square sm:aspect-[9/16] shadow-2xl border border-white/10">

        {/* Hidden Canvas for Capturing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Flash Effect */}
        <AnimatePresence>
          {isFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-[60]"
            />
          )}
        </AnimatePresence>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[70] p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-black/60 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {error ? (
          <div className="flex flex-col items-center justify-center h-full text-white p-8 text-center bg-zinc-900">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Camera className="w-8 h-8 text-white/40" />
            </div>
            <h3 className="text-xl font-serif mb-2">Camera Access Required</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8">{error}</p>
            <button onClick={onClose} className="px-8 py-3 bg-white text-black rounded-full font-bold">Return to Product</button>
          </div>
        ) : capturedImage ? (
          <div className="relative h-full flex flex-col">
            <img src={capturedImage} className="absolute inset-0 w-full h-full object-cover" alt="Captured" />

            {/* Analysis Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-end pb-24 px-6 text-center text-white">
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 mb-8"
                  >
                    <RefreshCw className="w-12 h-12 text-brand-pink animate-spin mx-auto" />
                    <h3 className="text-xl font-serif">Analyzing Hand Proportions...</h3>
                    <p className="text-white/60 text-sm">Calculating curvature & nail plate width</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 mb-8"
                  >
                    <div className="flex items-center justify-center gap-2 text-brand-pink mb-4">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Analysis Complete</span>
                    </div>
                    <h3 className="text-2xl font-serif mb-6">Perfect Fit Found</h3>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <span className="block text-[8px] uppercase tracking-widest text-white/40 mb-1">Recommended Size</span>
                        <span className="text-2xl font-bold">M</span>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <span className="block text-[8px] uppercase tracking-widest text-white/40 mb-1">Shape Compatibility</span>
                        <span className="text-2xl font-bold">Almond</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={onClose}
                        className="w-full bg-white text-brand-dark py-4 rounded-full font-bold shadow-xl hover:bg-brand-pink hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Shop This Look
                      </button>
                      <button
                        onClick={() => setCapturedImage(null)}
                        className="w-full py-3 text-white/60 hover:text-white text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Retake Photo
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-[1.1]"
            />

            {/* AR Overlay - Nail Alignment Guide */}
            <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center">
              <div className="relative w-72 h-96">
                {/* Simulated Hand Outline */}
                <svg className="absolute inset-0 w-full h-full text-brand-pink/30" viewBox="0 0 100 100" fill="none">
                  <path d="M20,80 Q30,40 50,40 Q70,40 80,80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  {/* Simulated Nail Tips with Cat Eye Effect */}
                  {[25, 38, 50, 62, 75].map((x, i) => (
                    <g key={i} transform={`translate(${x}, ${35 - (i === 2 ? 5 : 0)})`}>
                      <ellipse cx="0" cy="0" rx="3.5" ry="6" className="fill-brand-pink/40" />
                      <ellipse cx="0" cy="0" rx="1" ry="5" className="fill-white/60 blur-[1px] animate-pulse" />
                    </g>
                  ))}
                </svg>

                {/* Instructions */}
                <div className="absolute bottom-10 left-0 right-0 text-center px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase tracking-widest"
                  >
                    <Sparkles className="w-3 h-3 mr-2 text-brand-pink" />
                    Align nails with guide
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-10 left-0 right-0 z-50 px-8 flex justify-center items-center">
              <button
                onClick={takeSnapshot}
                className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center group active:scale-95 transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-full group-hover:scale-90 transition-transform" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
