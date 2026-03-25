import { motion } from 'framer-motion'
import type { Asset } from '../App'

type AssetLibraryProps = {
  assets: Asset[]
}

export default function AssetLibrary({ assets }: AssetLibraryProps) {
  const handleDragStart = (e: React.DragEvent, asset: Asset) => {
    e.dataTransfer.setData('asset', JSON.stringify(asset))
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-canva">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Brand Assets</h2>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-sm text-gray-500">Drag assets onto the canvas</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {assets.map((asset, index) => (
          <motion.div
            key={asset.id}
            draggable
            onDragStart={(e) => handleDragStart(e as any, asset)}
            className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 cursor-grab active:cursor-grabbing transition-all hover:border-canva-purple hover:shadow-md"
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-center h-20 mb-3 text-5xl">
              {asset.type === 'color' ? (
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-canva-purple to-canva-purple-dark shadow-md" />
              ) : asset.type === 'font' ? (
                <span className="font-bold text-6xl text-gray-800">{asset.icon}</span>
              ) : (
                <span>{asset.icon}</span>
              )}
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-sm text-gray-800">{asset.name}</div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${
                  asset.deprecated ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {asset.version}
                </span>
                {asset.deprecated ? (
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                    Deprecated
                  </span>
                ) : (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    Current
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">{asset.date}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 bg-blue-50">
        <div className="flex items-start gap-2">
          <span className="text-xl">💡</span>
          <p className="text-xs text-blue-800 leading-relaxed">
            <strong>Tip:</strong> Try dragging the old logo (v2.3) to see Brand Guardian AI in action
          </p>
        </div>
      </div>
    </div>
  )
}
