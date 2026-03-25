import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AssetLibrary from './components/AssetLibrary'
import Canvas from './components/Canvas'
import TopBar from './components/TopBar'
import WarningTooltip from './components/WarningTooltip'
import SuccessMessage from './components/SuccessMessage'

export type Asset = {
  id: string
  name: string
  version: string
  date: string
  icon: string
  deprecated: boolean
  type: 'logo' | 'color' | 'font'
}

export type DroppedAsset = Asset & {
  position: { x: number; y: number }
}

function App() {
  const [droppedAsset, setDroppedAsset] = useState<DroppedAsset | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [compliance, setCompliance] = useState(0)

  const assets: Asset[] = [
    {
      id: 'logo-old',
      name: 'Company Logo',
      version: 'v2.3',
      date: 'Feb 2024',
      icon: '🏢',
      deprecated: true,
      type: 'logo'
    },
    {
      id: 'logo-current',
      name: 'Company Logo',
      version: 'v3.1',
      date: 'March 2026',
      icon: '🏛️',
      deprecated: false,
      type: 'logo'
    },
    {
      id: 'color-palette',
      name: 'Brand Color Palette',
      version: '2026',
      date: 'Current',
      icon: '🎨',
      deprecated: false,
      type: 'color'
    },
    {
      id: 'font-heading',
      name: 'Heading Font',
      version: 'Inter Bold',
      date: 'Current',
      icon: 'Aa',
      deprecated: false,
      type: 'font'
    }
  ]

  const handleDrop = (asset: Asset, position: { x: number; y: number }) => {
    const newAsset: DroppedAsset = { ...asset, position }
    setDroppedAsset(newAsset)

    if (asset.deprecated) {
      setTimeout(() => {
        setShowWarning(true)
        setCompliance(0)
      }, 500)
    } else {
      setShowWarning(false)
      setCompliance(100)
    }
  }

  const handleSwitch = () => {
    setShowWarning(false)

    // Find current version of logo
    const currentLogo = assets.find(a => a.id === 'logo-current')
    if (currentLogo && droppedAsset) {
      const updatedAsset: DroppedAsset = {
        ...currentLogo,
        position: droppedAsset.position
      }

      // Fade out old
      setDroppedAsset(null)

      // Fade in new
      setTimeout(() => {
        setDroppedAsset(updatedAsset)
        setCompliance(100)
        setShowSuccess(true)

        setTimeout(() => setShowSuccess(false), 3000)
      }, 200)
    }
  }

  const handleDismiss = () => {
    setShowWarning(false)
  }

  return (
    <div className="flex flex-col h-screen bg-[#f5f5f7]">
      <TopBar compliance={compliance} />

      <div className="flex flex-1 overflow-hidden">
        <AssetLibrary assets={assets} />

        <div className="flex-1 relative">
          <Canvas
            onDrop={handleDrop}
            droppedAsset={droppedAsset}
          />

          <AnimatePresence>
            {showWarning && droppedAsset && (
              <WarningTooltip
                onSwitch={handleSwitch}
                onDismiss={handleDismiss}
                position={droppedAsset.position}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSuccess && (
              <SuccessMessage />
            )}
          </AnimatePresence>

          <motion.button
            className={`fixed bottom-8 right-8 px-6 py-3 rounded-lg font-semibold text-white shadow-lg transition-all ${
              compliance === 100
                ? 'bg-canva-purple hover:bg-canva-purple-dark cursor-pointer hover:shadow-canva-xl'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={compliance !== 100}
            whileHover={compliance === 100 ? { y: -2 } : {}}
            whileTap={compliance === 100 ? { scale: 0.98 } : {}}
          >
            Submit for Approval
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default App
