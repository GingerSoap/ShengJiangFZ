import { useState, useRef, useCallback, useEffect } from 'react'
import './CropModal.css'

function dist(a, b) {
  const dx = a.clientX - b.clientX
  const dy = a.clientY - b.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

function mid(a, b) {
  return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 }
}

export default function CropModal({ onConfirm, onCancel, cropW = 250, cropH = 250, resizeTo }) {
  const [imageUrl, setImageUrl] = useState(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const posRef = useRef({ x: 0, y: 0 })
  const scaleRef = useRef(1)
  const dragging = useRef(false)
  const lastP = useRef({ x: 0, y: 0 })
  const lastPos = useRef({ x: 0, y: 0 })
  const imgRef = useRef(null)
  const imgNatural = useRef({ w: 0, h: 0 })
  const fileRef = useRef(null)
  const frameRef = useRef(null)
  // 双指捏合
  const pinching = useRef(false)
  const pinchDist0 = useRef(0)
  const pinchScale0 = useRef(1)
  const pinchCenter = useRef({ x: 0, y: 0 })
  const pinchPos0 = useRef({ x: 0, y: 0 })

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      imgNatural.current = { w: img.naturalWidth, h: img.naturalHeight }
      const s = Math.max(cropW / img.naturalWidth, cropH / img.naturalHeight)
      scaleRef.current = s
      posRef.current = { x: 0, y: 0 }
      setScale(s)
      setPos({ x: 0, y: 0 })
      setImageUrl(url)
    }
    img.src = url
  }

  const clampPos = useCallback((x, y, s) => {
    const { w, h } = imgNatural.current
    const dw = w * s
    const dh = h * s
    const cx = (cropW - dw) / 2
    const cy = (cropH - dh) / 2
    const maxOff = Math.max(0, (dw - cropW) / 2)
    const maxOffY = Math.max(0, (dh - cropH) / 2)
    return {
      x: Math.max(cx - maxOff, Math.min(cx + maxOff, x)),
      y: Math.max(cy - maxOffY, Math.min(cy + maxOffY, y)),
    }
  }, [cropW, cropH])

  const onPointerDown = useCallback((e) => {
    const touches = e.touches
    if (touches && touches.length >= 2) {
      // 双指捏合开始
      pinching.current = true
      dragging.current = false
      pinchDist0.current = dist(touches[0], touches[1])
      pinchScale0.current = scaleRef.current
      pinchCenter.current = mid(touches[0], touches[1])
      pinchPos0.current = { x: posRef.current.x, y: posRef.current.y }
    } else {
      // 单指拖拽
      dragging.current = true
      pinching.current = false
      const p = touches ? touches[0] : e
      lastP.current = { x: p.clientX, y: p.clientY }
      lastPos.current = { x: posRef.current.x, y: posRef.current.y }
    }
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      const touches = e.touches
      if (pinching.current && touches && touches.length >= 2) {
        // 双指捏合
        e.preventDefault()
        const d = dist(touches[0], touches[1])
        const ratio = d / (pinchDist0.current || 1)
        const ns = Math.max(0.5, Math.min(3, pinchScale0.current * ratio))
        // 围绕捏合中心缩放：调整位置使中心点保持不动
        const mc = mid(touches[0], touches[1])
        const dx = mc.x - pinchCenter.current.x
        const dy = mc.y - pinchCenter.current.y
        const nx = pinchPos0.current.x + dx
        const ny = pinchPos0.current.y + dy
        const clamped = clampPos(nx, ny, ns)
        scaleRef.current = ns
        posRef.current = clamped
        setScale(ns)
        setPos(clamped)
      } else if (dragging.current) {
        // 单指拖拽
        const p = touches ? touches[0] : e
        const dx = p.clientX - lastP.current.x
        const dy = p.clientY - lastP.current.y
        const nx = lastPos.current.x + dx
        const ny = lastPos.current.y + dy
        const clamped = clampPos(nx, ny, scaleRef.current)
        posRef.current = clamped
        setPos(clamped)
      }
    }
    const onUp = (e) => {
      // touchend 时检查剩余手指
      if (pinching.current && e.touches && e.touches.length < 2) {
        pinching.current = false
        // 如果还剩一根手指，转为拖拽
        if (e.touches.length === 1) {
          dragging.current = true
          lastP.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
          lastPos.current = { x: posRef.current.x, y: posRef.current.y }
        }
      }
      if (!e.touches || e.touches.length === 0) {
        dragging.current = false
        pinching.current = false
      }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
  }, [clampPos])

  useEffect(() => {
    const el = frameRef.current
    if (!el || !imageUrl) return
    const onWheel = (e) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.05 : 0.05
      const ns = Math.max(0.5, Math.min(3, scaleRef.current + delta))
      scaleRef.current = ns
      const clamped = clampPos(posRef.current.x, posRef.current.y, ns)
      posRef.current = clamped
      setScale(ns)
      setPos(clamped)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [imageUrl, clampPos])

  const dw = imgNatural.current.w * scale
  const dh = imgNatural.current.h * scale
  const displayLeft = (cropW - dw) / 2 + pos.x
  const displayTop = (cropH - dh) / 2 + pos.y

  const handleConfirm = () => {
    const canvas = document.createElement('canvas')
    const img = imgRef.current
    if (!img) return
    const { w, h } = imgNatural.current

    const cx = (cropW - dw) / 2 + pos.x
    const cy = (cropH - dh) / 2 + pos.y

    const srcX = Math.max(0, -cx / scale)
    const srcY = Math.max(0, -cy / scale)
    const srcW = Math.min(w - srcX, cropW / scale)
    const srcH = Math.min(h - srcY, cropH / scale)

    const dstX = Math.max(0, cx)
    const dstY = Math.max(0, cy)
    const dstW = srcW * scale
    const dstH = srcH * scale

    canvas.width = cropW
    canvas.height = cropH
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, cropW, cropH)
    ctx.drawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH)

    // 可选：裁剪后再缩放到目标尺寸
    if (resizeTo) {
      const rCanvas = document.createElement('canvas')
      rCanvas.width = resizeTo.w
      rCanvas.height = resizeTo.h
      const rCtx = rCanvas.getContext('2d')
      rCtx.drawImage(canvas, 0, 0, cropW, cropH, 0, 0, resizeTo.w, resizeTo.h)
      onConfirm(rCanvas.toDataURL('image/png'))
    } else {
      onConfirm(canvas.toDataURL('image/png'))
    }
  }

  return (
    <div className="crop-modal-mask" onClick={onCancel}>
      <div className="crop-modal" onClick={(e) => e.stopPropagation()}>
        {!imageUrl ? (
          <div
            className="crop-modal__import-area"
            style={{ width: cropW, height: cropH }}
            onClick={() => fileRef.current?.click()}
          >
            <div className="crop-modal__import-text">点击导入图片</div>
          </div>
        ) : (
          <>
            <div className="crop-modal__crop-container">
              <div
                ref={frameRef}
                className="crop-modal__crop-frame"
                style={{ width: cropW, height: cropH }}
                onMouseDown={onPointerDown}
                onTouchStart={onPointerDown}
              >
                <img
                  ref={imgRef}
                  className="crop-modal__crop-img"
                  src={imageUrl}
                  alt=""
                  draggable={false}
                  style={{
                    width: dw,
                    height: dh,
                    left: displayLeft,
                    top: displayTop,
                  }}
                />
                <div className="crop-modal__crop-border" />
              </div>
            </div>
            <div className="crop-modal__controls">
              <button className="crop-modal__btn crop-modal__btn--redo" onClick={() => fileRef.current?.click()}>重新选择</button>
              <button className="crop-modal__btn crop-modal__btn--confirm" onClick={handleConfirm}>确认裁剪</button>
            </div>
          </>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
      </div>
    </div>
  )
}
