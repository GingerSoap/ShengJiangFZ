import { useState } from 'react'
import './PolaroidInteraction.css'

export default function PolaroidInteraction({ onBack, onPolaroid1, onPolaroid2, polaroid1Image, polaroid2Image, polaroid2Revealed, contentData }) {
  const [exiting, setExiting] = useState(false)

  const handleBack = () => {
    setExiting(true)
    setTimeout(() => onBack?.(), 350)
  }

  return (
    <div className={`interaction-page${exiting ? ' polaroid-exiting' : ''}`}>
      <img className="int-bg" src="./images/v2_2.png" alt="" />
      <div style={{
        position: 'absolute',
        width: '392px',
        height: '699px',
        top: '81px',
        left: 0,
        zIndex: 3,
        background: 'url(./images/v2_3.png) no-repeat center/cover',
        pointerEvents: 'none',
      }} />
      <div className="int-slide-wrap">
      <img className="int-disperse" src="./images/物品退散-拍立得.png" alt="" />

      {/* 退散背景大图（占满屏） */}
      <img className="polaroid-int-full-disperse" src="./images/物品退散-拍立得.png" alt="" />

      {/* 拍立得1 - 倾斜放置 */}
      <div className="polaroid-int-p1" onClick={onPolaroid1}>
        <div className="polaroid-int-p1-bg" style={{ backgroundImage: `url(${contentData.imgPolaroidBg})` }} />
        <div className="polaroid-int-p1-base" style={{ backgroundImage: `url(${contentData.imgPolaroidBg})` }}>
          {polaroid1Image && <img className="polaroid-int-p1-photo-img" src={polaroid1Image} alt="" />}
        </div>
        <img className="polaroid-int-p1-img" src="./images/v2_21.png" alt="" />
      </div>

      {/* 拍立得2 - 另一处倾斜 */}
      <div className="polaroid-int-p2" onClick={onPolaroid2}>
        <div className="polaroid-int-p2-bg" style={{ backgroundImage: `url(${contentData.imgTheater2})` }} />
        <div className="polaroid-int-p2-base" style={{ backgroundImage: `url(${contentData.imgTheater2})` }}>
          {polaroid2Image && <img className="polaroid-int-p2-photo-img" src={polaroid2Image} alt="" />}
        </div>
        <img className="polaroid-int-p2-frame-img" src="./images/v2_21.png" alt="" />
        <img className="polaroid-int-p2-img" src="./images/噪点底图.png" alt="" style={{ display: polaroid2Revealed ? 'none' : 'block' }} />
      </div>

      </div>
      <div className="int-back" onClick={handleBack}>
        <img className="int-back-img" src="./images/便签.png" alt="" />
        <div className="int-back-text">返回</div>
      </div>
    </div>
  )
}
