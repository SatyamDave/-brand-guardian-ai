import { motion } from 'framer-motion'

type WarningTooltipProps = {
  onSwitch: () => void
  onDismiss: () => void
  position: { x: number; y: number }
}

export default function WarningTooltip({ onSwitch, onDismiss, position }: WarningTooltipProps) {
  // Position tooltip to the right of the asset
  const tooltipLeft = position.x + 120
  const tooltipTop = position.y - 50

  return (
    <motion.div
      className="absolute z-50 bg-white rounded-xl shadow-canva-xl border-l-4 border-orange-500"
      style={{
        left: `${tooltipLeft}px`,
        top: `${tooltipTop}px`,
        width: '380px'
      }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Older version detected</h4>
            <p className="text-sm text-gray-600 mt-1">
              This asset was deprecated in Feb 2024
            </p>
          </div>
        </div>

        {/* Visual Diff */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Old Version */}
            <div className="flex-1 text-center">
              <div className="text-xs font-semibold text-gray-500 mb-2">OLD (v2.3)</div>
              <div className="bg-white rounded-lg p-3 mb-2 shadow-sm border border-gray-200">
                <span className="text-4xl">🏢</span>
              </div>
              <div className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded line-through">
                INNOVATION
              </div>
            </div>

            {/* Arrow */}
            <div className="text-canva-purple text-2xl">→</div>

            {/* New Version */}
            <div className="flex-1 text-center">
              <div className="text-xs font-semibold text-gray-500 mb-2">CURRENT (v3.1)</div>
              <div className="bg-white rounded-lg p-3 mb-2 shadow-sm border border-canva-purple">
                <span className="text-4xl">🏛️</span>
              </div>
              <div className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                EXCELLENCE
              </div>
            </div>
          </div>

          {/* Changes List */}
          <div className="mt-4 space-y-2 text-xs text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-red-500">●</span>
              <span><strong>Tagline:</strong> "Innovation" → "Excellence"</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">●</span>
              <span><strong>Icon style:</strong> Geometric → Classical</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">●</span>
              <span><strong>Color:</strong> #2C5AA0 → #8B3DFF</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <motion.button
            onClick={onSwitch}
            className="w-full bg-canva-purple text-white py-3 px-4 rounded-lg font-semibold hover:bg-canva-purple-dark transition-colors shadow-md"
            whileHover={{ y: -1, boxShadow: '0 4px 12px rgba(139, 61, 255, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            Switch to Current Version
          </motion.button>

          <button
            onClick={onDismiss}
            className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm font-medium transition-colors"
          >
            Use Anyway
          </button>
        </div>
      </div>
    </motion.div>
  )
}
