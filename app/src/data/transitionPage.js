const raw = `
本次旅程结束。
但是我们的故事没有终点。
`

export const transitionPageText = raw
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.length > 0 && !line.startsWith('//'))
