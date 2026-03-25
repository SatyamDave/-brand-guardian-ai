import { motion } from 'framer-motion'

export default function SuccessMessage() {
  return (
    <motion.div
      className="fixed top-24 right-8 bg-white rounded-xl shadow-canva-xl border-l-4 border-green-500 p-6 max-w-sm z-50"
      initial={{ opacity: 0, y: -20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-lg">✓</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Updated to current brand asset</h4>
          <p className="text-sm text-gray-600 mt-1">
            Your design now uses the latest approved version
          </p>
        </div>
      </div>
    </motion.div>
  )
}
