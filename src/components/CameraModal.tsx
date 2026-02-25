import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { X, Camera, Sparkles } from 'lucide-react';

export const CameraModal = ({ onClose }: { onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        setError("Could not access camera. Please allow camera permissions.");
        console.error(err);
      }
    };

    startCamera();

    return () => {
      // Cleanup stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-black rounded-3xl overflow-hidden aspect-[9/16] shadow-2xl border border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur rounded-full text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {error ? (
          <div className="flex flex-col items-center justify-center h-full text-white p-6 text-center">
            <Camera className="w-12 h-12 mb-4 opacity-50" />
            <p>{error}</p>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* AR Overlay Simulation */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute bottom-20 left-0 right-0 text-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-white text-sm font-medium"
                >
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Align your hand with the guide
                </motion.div>
              </div>
              
              {/* Hand Guide Graphic */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-2 border-dashed border-white/30 rounded-[3rem] opacity-50" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
