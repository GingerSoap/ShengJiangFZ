import { useState, useRef, useMemo } from 'react'
import './ReceiptInteraction.css'
import { getStickers, getReceiptText } from '../data/defaultContent'

const FALLBACK_STICKERS = [
  { id: 1, name: 'Croissant au beurre 黄油可颂',      price: 2.80, description: '街角面包店的纸袋，油渍把店名晕开了一半', img: './images/贴纸1.png' },
  { id: 2, name: 'Ticket Métro — Ligne 4 地铁票',   price: 2.15, description: 'Métro线路图印在背面，折过一次，不知道为什么没扔', img: './images/贴纸2.png' },
  { id: 3, name: "L'Étranger — édition de poche 局外人", price: 7.50, description: '前任读者在第47页折了角，不知道他们读到那里的时候在想什么', img: './images/贴纸3.png' },
  { id: 4, name: 'Échantillon parfum — sans nom 香水小样', price: 0.00, description: '没有标签，味道介于某种花和某种木头之间，带回去之后大概也不会买', img: './images/贴纸4.png' },
  { id: 5, name: 'Montre de poche, chaîne manquante 怀表 断链', price: 12.00, description: '表盘还在走，但对不上任何时区', img: './images/贴纸5.png' },
  { id: 6, name: 'Pansements adhésifs × 6 创可贴',   price: 3.40, description: '买了一整盒，用了一片', img: './images/贴纸6.png' },
  { id: 7, name: 'Eau minérale + article inconnu 矿泉水 + 不明物品', price: 4.20, description: '水，和一个翻译软件也没认出来的东西', img: './images/贴纸7.png' },
  { id: 8, name: 'Bougie votive — marché paroissial 教堂义卖蜡烛', price: 3.00, description: '从某个教堂门口的义卖摊买的，还没点过，不知道带回去之后会不会点。', img: './images/贴纸8.png' },
]

export default function ReceiptInteraction({ onBack, selected, onSelectStickers, contentData }) {
  const STICKER_DATA = contentData ? getStickers(contentData) : FALLBACK_STICKERS
  const receiptText = getReceiptText(contentData)
  const [mountKey] = useState(() => Math.random())
  const [flipped, setFlipped] = useState([])
  const lastClickTime = useRef(0)
  const clickTimer = useRef(null)

  const rotations = useMemo(() =>
    STICKER_DATA.map(() => (Math.random() - 0.5) * 8),
  [mountKey])

  const total = selected.reduce((acc, s) => acc + s.price, 0)

  const handleClick = (item, e) => {
    e.stopPropagation()
    const now = Date.now()
    const diff = now - lastClickTime.current

    if (diff < 250 && lastClickTime.current > 0) {
      lastClickTime.current = 0
      clearTimeout(clickTimer.current)
      clickTimer.current = null
      setFlipped(prev =>
        prev.includes(item.id)
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id]
      )
    } else {
      clearTimeout(clickTimer.current)
      clickTimer.current = setTimeout(() => {
        lastClickTime.current = 0
        clickTimer.current = null
        onSelectStickers(prev =>
          prev.find(s => s.id === item.id)
            ? prev.filter(s => s.id !== item.id)
            : [...prev, item]
        )
      }, 250)
      lastClickTime.current = now
    }
  }

  return (
    <div className="interaction-page">
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
      <img className="int-disperse" src="./images/物品退散-小票.png" alt="" />

      {/* 左侧物品栏 */}
      <div className="sticker-panel">
        <div className="sticker-panel-inner">
          {STICKER_DATA.map((item, idx) => {
            const isFlipped = flipped.includes(item.id)
            const isSelected = selected.find(s => s.id === item.id)
            return (
              <div
                key={item.id}
                className={`sticker-grid-item${isFlipped ? ' flipped' : ''}${isSelected ? ' selected' : ''}`}
                style={{ '--rotate': `${rotations[idx]}deg` }}
                onClick={(e) => handleClick(item, e)}
              >
                <img
                  className="sticker-front"
                  src={item.img}
                  alt={item.name}
                />
                <div className="sticker-back">{item.description}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 小票容器 */}
      <div className="receipt-int-wrap">
        <img className="receipt-int-img" src="./images/v2_14.png" alt="" />
        <div className="receipt-int-header">
          <div className="receipt-int-title">{receiptText.header}</div>
          <div className="receipt-int-sub">{receiptText.subheader}</div>
          <div className="receipt-int-sep">----------------------------</div>
          <div className="receipt-int-no">{receiptText.no}</div>
          <div className="receipt-int-sep">----------------------------</div>
        </div>
        <div className="receipt-int-table">
          {selected.map(s => (
            <div key={s.id} className="receipt-int-item-row">
              <span className="receipt-int-item">{s.name}</span>
              <span className="receipt-int-price">{s.price.toFixed(2)}</span>
            </div>
          ))}
          {selected.length > 0 && <div className="receipt-int-sep2">-------------------------</div>}
          {selected.length > 0 && <div className="receipt-int-total">合计：{total.toFixed(2)}€</div>}
        </div>
        <div className="receipt-int-footer">
          <div className="receipt-int-date">{receiptText.date}</div>
          <div className="receipt-int-code">{receiptText.code1}</div>
          <div className="receipt-int-code">{receiptText.code2}</div>
        </div>
        <div className="receipt-int-barcode">{receiptText.bottom}</div>
      </div>

      </div>
      <div className="int-back" onClick={onBack}>
        <img className="int-back-img" src="./images/便签.png" alt="" />
        <div className="int-back-text">返回</div>
      </div>
    </div>
  )
}
