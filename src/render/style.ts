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
    case 'NINTENDO':
      return {
        bgColor: '#dc0000',
        percentageBg: '#dc0000',
      }
    case 'XBOX':
      return {
        bgColor: '#277800',
        percentageBg: '#277800',
      }
    case 'PSN':
      return {
        bgColor: '#2f7dfb',
        percentageBg: '#2f7dfb',
      }
    case 'UBI':
      return {
        bgColor: '#2c8aa5',
        percentageBg: '#f68200',
      }
    case 'STEAM':
      return {
        bgColor: '#1d2839',
        percentageBg: '#4f6b1c',
      }
    default:
      return {
        bgColor: '#202020',
        percentageBg: '#DD3FE4',
      }
  }
}
