import type { GameStoreName } from '../data/crawler'

export interface Style {
  bgColor: string
  percentageBg: string
}

export function getStyle(gameStoreName: GameStoreName): Style {
  switch (gameStoreName) {
    case 'EPIC':
      return {
        bgColor: '#202020',
        percentageBg: '#DD3FE4',
      }
    default:
      return {
        bgColor: '#202020',
        percentageBg: '#DD3FE4',
      }
  }
}