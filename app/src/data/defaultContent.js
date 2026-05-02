const defaultContent = {
  // 机票文本
  ticketIntro: '这里是巴黎。\n天气预报说今天有雨，但还没下。\n[OC名字]，你打算怎么度过这几天？',
  ticketRoute: '北京——巴黎',
  ticketDivider: '————————————',
  ticketRow1Label: '航班号    日期      座位号',
  ticketRow1Value: '2026      03/22    30',
  ticketRow2Label: '登机时间',
  ticketRow2Value: '17:00',
  ticketRow3Label: '登机口',
  ticketRow3Value: 'BC44',
  ticketBarcode: '2348RBSH→FUG',

  // 小票
  receiptNo: 'NO.1',
  receiptDate: '2026/03/22',
  receiptCode1: 'B006309023',
  receiptCode2: 'SRPQ00440315skyc',
  receiptBarcode: 'EXAMPLE',

  // 普通题 - 复选框4组 (page 1-4)
  check1Q: '交通偏好',
  check1Opts: '地铁，混进人群里\n走路，走到不认识路为止\n打车，不想思考方向\n单车，慢一点没关系',
  check2Q: '必带物品',
  check2Opts: '耳机\n相机/手机支架\n一本书或者随便什么可以看的\n充电宝和各种线\n随身小包，装得下就行',
  check3Q: '到了新地方第一件事',
  check3Opts: '先找吃的\n先看地图确认方向\n先拍照\n先找地方坐下来感受一下',
  check4Q: '旅行结束后',
  check4Opts: '马上开始想下一次\n需要缓几天才能回到状态\n照片一直存着没整理\n买的东西放着舍不得用',

  // 普通题 - 数轴4组 (page 1-4)
  axis1Q: '计划派还是随性派',
  axis1L: '计划', axis1R: '随性',
  axis2Q: '钱要花在刀刃上，还是花完再说',
  axis2L: '省钱', axis2R: '花费',
  axis3Q: '一个人走，还是跟着人群',
  axis3L: '一人游', axis3R: '随群',
  axis4Q: '白天的城市，还是夜晚的城市',
  axis4L: '白天', axis4R: '晚上',

  // 拍立得1 地点文本
  p1Place1: '卢浮宫',
  p1Place1Text: '有一块没什么人看的石碑，蹲下来看了看碑文，没看懂，但站了一会儿才走。',
  p1Place2: '圣奥诺雷路',
  p1Place2Text: '亮着灯的橱窗，有种进去购物的冲动，没买，但记住了那个颜色。',
  p1Place3: '某个街区菜市场',
  p1Place3Text: '看见收摊的菜贩，他在清点零钱，零钱掉了一枚在地上，他没发现。',
  p1Place4: '卢森堡公园',
  p1Place4Text: '想去坐下长椅，上面睡着一只猫，坐下来陪它待了一会儿，它没有醒。',
  p1Place5: '巴士底附近的跳蚤市场',
  p1Place5Text: '为什么门是半开的？里面在放什么歌，听了几秒，没走进去。',

  // 拍立得2 选项
  p2Opt1: 'A. 推开门，在门口站了一秒',
  p2Opt2: 'B. 直接走进去，没有停顿',
  p2Opt3: 'C. 侧身挤进去，把门带上',

  // 拍立得2 叙事文本
  p2Text1Title: '散场之后',
  p2Text1Body: '散场的铃声响过去有一会儿了。顶层包厢的门还没锁。',
  p2Text2: `天鹅绒椅背还留着别人的体温。
舞台上最后一盏灯还没灭，照着空台板，没有照任何人。布景还没撤，是上半场那片虚假的森林，树叶纹丝不动。
远处有人在收拾什么，金属碰金属的声音，断断续续。除此之外很安静。这种安静和演出前的安静不一样，那时候所有人都在等，现在没有人在等任何事了。`,
  p2Text3Body: `也许这里曾经承载了很多故事。
或许还在美好时代，这里上演莫里哀的喜剧，
或者在上世纪被搁置
那么对[OC名字]呢，这是什么?
走廊已经没有脚步声了。`,
  p2Text3Suffix: '最后',

  // 小票·小物（8个贴纸）
  s1name: 'Croissant au beurre 黄油可颂',        s1price: 2.80, s1desc: '街角面包店的纸袋，油渍把店名晕开了一半', s1img: './images/贴纸1.png',
  s2name: 'Ticket Métro — Ligne 4 地铁票',      s2price: 2.15, s2desc: 'Métro线路图印在背面，折过一次，不知道为什么没扔', s2img: './images/贴纸2.png',
  s3name: "L'Étranger — édition de poche 局外人", s3price: 7.50, s3desc: '前任读者在第47页折了角，不知道他们读到那里的时候在想什么', s3img: './images/贴纸3.png',
  s4name: 'Échantillon parfum — sans nom 香水小样', s4price: 0.00, s4desc: '没有标签，味道介于某种花和某种木头之间，带回去之后大概也不会买', s4img: './images/贴纸4.png',
  s5name: 'Montre de poche, chaîne manquante 怀表 断链', s5price: 12.00, s5desc: '表盘还在走，但对不上任何时区', s5img: './images/贴纸5.png',
  s6name: 'Pansements adhésifs × 6 创可贴',     s6price: 3.40, s6desc: '买了一整盒，用了一片', s6img: './images/贴纸6.png',
  s7name: 'Eau minérale + article inconnu 矿泉水 + 不明物品', s7price: 4.20, s7desc: '水，和一个翻译软件也没认出来的东西', s7img: './images/贴纸7.png',
  s8name: 'Bougie votive — marché paroissial 教堂义卖蜡烛', s8price: 3.00, s8desc: '从某个教堂门口的义卖摊买的，还没点过，不知道带回去之后会不会点。', s8img: './images/贴纸8.png',

  // 图片
  imgPolaroidBg: './images/巴黎拍立得1背景.png',
  imgTheater1: './images/巴黎剧场1.png',
  imgTheater2: './images/巴黎剧场2.png',
}

export default defaultContent

/* ----- 派生辅助 ----- */

export function getTicketText(content) {
  return {
    left: {
      route: content.ticketRoute,
      divider: content.ticketDivider,
      row1Label: content.ticketRow1Label,
      row1Value: content.ticketRow1Value,
      row2Label: content.ticketRow2Label,
      row2Value: content.ticketRow2Value,
      row3Label: content.ticketRow3Label,
      row3Value: content.ticketRow3Value,
    },
    right: content.ticketBarcode,
  }
}

export function getReceiptText(content) {
  return {
    header: '收银单',
    subheader: '·invoice·',
    no: content.receiptNo,
    date: content.receiptDate,
    code1: content.receiptCode1,
    code2: content.receiptCode2,
    bottom: content.receiptBarcode,
  }
}

export function getPageCheckboxes(content) {
  return [
    null,
    { id: 'transport', question: content.check1Q, options: content.check1Opts.split('\n') },
    { id: 'essentials', question: content.check2Q, options: content.check2Opts.split('\n') },
    { id: 'firstthing', question: content.check3Q, options: content.check3Opts.split('\n') },
    { id: 'aftertrip', question: content.check4Q, options: content.check4Opts.split('\n') },
  ]
}

export function getPageAxes(content) {
  return [
    null,
    { question: content.axis1Q, left: content.axis1L, right: content.axis1R },
    { question: content.axis2Q, left: content.axis2L, right: content.axis2R },
    { question: content.axis3Q, left: content.axis3L, right: content.axis3R },
    { question: content.axis4Q, left: content.axis4L, right: content.axis4R },
  ]
}

const P1_COLORS = ['#C47A4A', '#B84A5A', '#C4854A', '#5A8A5A', '#7B6BA0']

export function getP1Places(content) {
  return [1, 2, 3, 4, 5].map((i, idx) => ({
    place: content[`p1Place${i}`],
    text: content[`p1Place${i}Text`],
    color: P1_COLORS[idx],
  }))
}

export function getP2Options(content) {
  return [content.p2Opt1, content.p2Opt2, content.p2Opt3]
}

export function getStickers(content) {
  return [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
    id: i,
    name: content[`s${i}name`],
    price: Number(content[`s${i}price`]) || 0,
    description: content[`s${i}desc`],
    img: content[`s${i}img`] || `./images/贴纸${i}.png`,
  }))
}

export function getStickerCn(content) {
  const cn = {}
  for (let i = 1; i <= 8; i++) {
    const name = content[`s${i}name`] || ''
    const parts = name.split(' ')
    cn[i] = parts[parts.length - 1] || name
  }
  return cn
}
