import { useState, useCallback, useEffect } from 'react'
import Scene1 from './scenes/Scene1'
import Scene2 from './scenes/Scene2'
import defaultContent from './data/defaultContent'
import './App.css'

const W = 393
const H = 852
const STORAGE_KEY = 'travelogue_content'

function loadContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaultContent, ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return { ...defaultContent }
}

function App() {
  const [phase, setPhase] = useState('scene1')
  const [sceneData, setSceneData] = useState(null)
  const [contentData, setContentData] = useState(loadContent)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const calc = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H))
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const handleSaveContent = useCallback((data) => {
    setContentData(data)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch { /* ignore */ }
  }, [])

  const canvasStyle = { transform: `scale(${scale})` }

  if (phase === 'scene1') {
    return (
      <div className="app-shell">
        <div className="app-canvas" style={canvasStyle}>
          <Scene1 onComplete={(data) => {
            setSceneData(data)
            setPhase('scene2')
          }} />
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="app-canvas" style={canvasStyle}>
        <Scene2
          ocName={sceneData?.ocName || ''}
          personaImage={sceneData?.personaImage || null}
          polaroid1Image={sceneData?.polaroid1Image || null}
          polaroid2Image={sceneData?.polaroid2Image || null}
          postcardImage={sceneData?.postcardImage || null}
          contentData={contentData}
          onSaveContent={handleSaveContent}
        />
      </div>
    </div>
  )
}

export default App
