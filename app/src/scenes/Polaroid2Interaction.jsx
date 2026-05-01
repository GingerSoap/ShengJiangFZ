import './Polaroid2Interaction.css'

export default function Polaroid2Interaction({ onBack }) {
  return (
    <div className="interaction-page">
      <img className="int-bg" src="/images/v2_2.png" alt="" />

      {/* 相机 - 居中偏左，旋转90度 */}
      <img className="p2-camera" src="/images/相机.png" alt="" />

      {/* 拍立得底图 */}
      <div className="p2-polaroid-wrap">
        <img className="p2-polaroid-base" src="/images/拍立得底图.png" alt="" />
        <img className="p2-polaroid-effect" src="/images/相机效果.png" alt="" />
      </div>

      {/* 标题 */}
      <div className="p2-title">
        <span className="p2-title-main">旅行日志</span>
        <span className="p2-title-num">02</span>
      </div>

      {/* 返回 */}
      <div className="int-back" onClick={onBack}>
        <img className="int-back-img" src="/images/便签.png" alt="" />
        <div className="int-back-text">返回</div>
      </div>
    </div>
  )
}
