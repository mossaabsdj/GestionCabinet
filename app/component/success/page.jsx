import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

const SuccessDialog = ({
  isOpen,
  onClose,
  title = "Success!",
  description = "Your action was completed successfully.",
  icon: CustomIcon,
  autoClose = true,
  autoCloseDelay = 3000,
  loading = false,
  loadingText = "Processing...",
}) => {
  useEffect(() => {
    if (autoClose && isOpen && !loading) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, isOpen, autoCloseDelay, onClose, loading]);

  const Icon = CustomIcon || CheckCircle2;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={loading ? undefined : onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-purple-100"
      >
        <div className="flex flex-col items-center text-center space-y-5">
          {loading ? (
            // Loading State
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="rounded-full bg-gradient-to-br from-purple-100 to-purple-50 p-4 shadow-lg">
                  <Loader2 className="h-16 w-16 text-purple-600" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-3"
              >
                <h2 className="text-3xl font-bold text-gray-900">
                  {loadingText}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Please wait while we process your request...
                </p>
              </motion.div>
            </>
          ) : (
            // Success State
            <>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
              >
                <div className="rounded-full bg-gradient-to-br from-purple-100 to-purple-50 p-4 shadow-lg">
                  <Icon className="h-16 w-16 text-purple-600" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-3"
              >
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {description}
                </p>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Demo component
export default function Demo({ config, dialogOpen, setDialogOpen, loading }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 p-8">
      <AnimatePresence>
        {dialogOpen && (
          <SuccessDialog
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title={config.title}
            description={config.description}
            loadingText={config.loadingText}
            autoClose={config.autoClose}
            autoCloseDelay={config.autoCloseDelay}
            loading={loading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
