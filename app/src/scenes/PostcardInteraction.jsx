import { useState } from 'react'
import './PostcardInteraction.css'

export default function PostcardInteraction({ onBack, onTransition, onReveal, postcardImage }) {
  const [flipped, setFlipped] = useState(false)
  const [text, setText] = useState('')
  const [stamping, setStamping] = useState(false)

  const handleBackClick = () => {
    if (stamping) return
    if (text.trim()) {
      setStamping(true)
      onReveal?.()
      setTimeout(() => {
        onTransition?.()
      }, 800)
    } else {
      setFlipped(false)
    }
  }

  return (
    <div className="interaction-page pc-fade-in">
      <img className="int-bg" src="./images/v2_2.png" alt="" />

      {/* 明信片卡片 */}
      <div className={`pc-card-wrap ${flipped ? 'pc-card-wrap--flipped' : ''}`}>
        <div className="pc-card-inner">
          <div className="pc-card-face pc-card-face--front" onClick={() => setFlipped(true)}>
            <img className="pc-card-front-img" src="./images/明信片正面.jpg" alt="" />
            <div className="pc-rect">
              {postcardImage && <img src={postcardImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
            <div className="pc-rect1" />
            <div className="pc-rect2" />
          </div>
          <div className="pc-card-face pc-card-face--back" onClick={handleBackClick}>
            <img className="pc-card-back-img" src="./images/明信片背面.jpg" alt="" />
            <div className="pc-back-square" />
            <input
              className="pc-card-input"
              placeholder="请留下你的一句话"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>

      {/* 盖章动效 */}
      {stamping && (
        <img className="pc-stamp" src="./images/通过盖章.png" alt="" />
      )}

      {/* 返回 */}
      <div className="int-back" onClick={onBack}>
        <img className="int-back-img" src="./images/便签.png" alt="" />
        <div className="int-back-text">返回</div>
      </div>
    </div>
  )
}
