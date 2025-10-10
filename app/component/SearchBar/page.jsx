import { motion } from "framer-motion";

import { Trash2, Plus, Search, Pill, TestTube } from "lucide-react";
export default function ModernSearchBar({ value, onChange, placeholder }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full max-w-md"
    >
      <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-full border border-purple-300 
                   focus:ring-2 focus:ring-purple-400 focus:outline-none
                   shadow-sm bg-white text-gray-700 placeholder-gray-400 
                   transition duration-200"
      />
    </motion.div>
  );
}
