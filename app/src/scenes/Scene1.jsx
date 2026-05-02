import { useState, useRef, useCallback, useEffect } from 'react'
import './Scene1.css'
import CropModal from '../components/CropModal'

const SLOT_LABELS = {
  persona: '图片1',
  polaroid1: '拍立得图片1',
  polaroid2: '拍立得图片2',
  postcard: '明信片图片',
}

const SLOT_CROP = {
  persona: { w: 250, h: 250 },
  polaroid1: { w: 250, h: 250 },
  polaroid2: { w: 250, h: 250 },
  postcard: { w: 215, h: 200 },
}

export default function Scene1({ onComplete }) {
  const [ocName, setOcName] = useState('')
  const [personaImage, setPersonaImage] = useState(null)
  const [polaroid1Image, setPolaroid1Image] = useState(null)
  const [polaroid2Image, setPolaroid2Image] = useState(null)
  const [postcardImage, setPostcardImage] = useState(null)
  const [activeSlot, setActiveSlot] = useState(null)

  const allReady = ocName.trim() && personaImage && polaroid1Image && polaroid2Image && postcardImage

  const handleCropConfirm = (dataUrl) => {
    switch (activeSlot) {
      case 'persona': setPersonaImage(dataUrl); break
      case 'polaroid1': setPolaroid1Image(dataUrl); break
      case 'polaroid2': setPolaroid2Image(dataUrl); break
      case 'postcard': setPostcardImage(dataUrl); break
    }
    setActiveSlot(null)
  }

  const handleStart = () => {
    if (!allReady) return
    onComplete?.({
      ocName: ocName.trim(),
      personaImage,
      polaroid1Image,
      polaroid2Image,
      postcardImage,
    })
  }

  const getImageStatus = (img) => img ? '已导入' : '点击导入'
  const slots = ['persona', 'polaroid1', 'polaroid2', 'postcard']
  const imageMap = { persona: personaImage, polaroid1: polaroid1Image, polaroid2: polaroid2Image, postcard: postcardImage }

  return (
    <div className="scene1-new">
      <img className="scene1-new__bg" src="./images/场景一底图.png" alt="" />

      <div className="scene1-new__panel">
        <div className="scene1-new__title">请导入数据</div>

        {/* OC名字 */}
        <div className="scene1-new__row">
          <span className="scene1-new__label">OC名字</span>
          <input
            className="scene1-new__input"
            type="text"
            placeholder="输入OC名字"
            value={ocName}
            onChange={(e) => setOcName(e.target.value)}
          />
        </div>

        {slots.map(slot => {
          const img = imageMap[slot]
          return (
            <div key={slot} className="scene1-new__row">
              <span className="scene1-new__label">{SLOT_LABELS[slot]}</span>
              <span
                className={`scene1-new__status ${img ? 'scene1-new__status--done' : 'scene1-new__status--pending'}`}
                onClick={() => setActiveSlot(slot)}
              >
                {getImageStatus(img)}
              </span>
            </div>
          )
        })}

        {/* 开始旅行 */}
        {allReady && (
          <div className="scene1-new__start" onClick={handleStart}>
            开始旅行
          </div>
        )}
      </div>

      {/* 裁剪弹窗 */}
      {activeSlot && (
        <CropModal
          cropW={SLOT_CROP[activeSlot].w}
          cropH={SLOT_CROP[activeSlot].h}
          onConfirm={handleCropConfirm}
          onCancel={() => setActiveSlot(null)}
        />
      )}
    </div>
  )
}
