import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Asset, DroppedAsset } from '../App'

type CanvasProps = {
  onDrop: (asset: Asset, position: { x: number; y: number }) => void
  droppedAsset: DroppedAsset | null
}

export default function Canvas({ onDrop, droppedAsset }: CanvasProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const assetData = e.dataTransfer.getData('asset')
    if (!assetData) return

    const asset: Asset = JSON.parse(assetData)
    const rect = e.currentTarget.getBoundingClientRect()
    const position = {
      x: e.clientX - rect.left - 50, // Center the asset
      y: e.clientY - rect.top - 50
    }

    onDrop(asset, position)
  }

  return (
    <div className="h-full flex items-center justify-center p-12">
      <div
        className={`relative w-full max-w-4xl h-full bg-white rounded-xl shadow-canva-lg transition-all border-4 ${
          isDragOver
            ? 'border-canva-purple bg-purple-50'
            : 'border-dashed border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <AnimatePresence>
          {!droppedAsset && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-gray-400"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Drag a brand asset here</h3>
              <p className="text-sm">Start designing with your brand assets</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {droppedAsset && (
            <motion.div
              className="absolute flex items-center justify-center"
              style={{
                left: droppedAsset.position.x,
                top: droppedAsset.position.y,
                width: '100px',
                height: '100px'
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {droppedAsset.type === 'color' ? (
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-canva-purple to-canva-purple-dark shadow-lg" />
              ) : droppedAsset.type === 'font' ? (
                <span className="text-8xl font-bold text-gray-800">{droppedAsset.icon}</span>
              ) : (
                <span className="text-8xl">{droppedAsset.icon}</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {isDragOver && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-purple-50 bg-opacity-50 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">📍</div>
              <p className="text-lg font-semibold text-canva-purple">Drop to add to canvas</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
