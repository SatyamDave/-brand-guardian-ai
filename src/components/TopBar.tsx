import { motion } from 'framer-motion'

type TopBarProps = {
  compliance: number
}

export default function TopBar({ compliance }: TopBarProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-canva">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-canva-purple rounded-lg flex items-center justify-center text-white font-bold text-lg">
          C
        </div>
        <span className="text-lg font-semibold text-gray-800">Brand Guardian AI</span>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Demo</span>
      </div>

      <motion.div
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
          compliance === 100
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
        animate={{ scale: compliance === 100 ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        Brand Compliance: {compliance}%
      </motion.div>
    </div>
  )
}
