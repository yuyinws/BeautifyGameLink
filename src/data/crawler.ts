import { epic, steam } from './store/index'

export interface CrawlerData {
  originPrice: string
  price: string | null
  percentage: string | null
  title: string
  description: string
  gameStoreName: GameStoreName
  logo: string
}

export type GameStoreName = 'UN_KNOWN' | 'STEAM' | 'GOG' | 'EPIC'

export function getCrawerData(html: string, targetUrl: string): CrawlerData {
  switch (getStoreName(targetUrl)) {
    case 'STEAM':
      return steam()
    case 'EPIC':
      return epic(html)
    default:
      return epic(html)
  }
}

function getStoreName(url: string): GameStoreName {
  const urlObj = new URL(url)
  if (urlObj.hostname.includes('store.steampowered.com'))
    return 'STEAM'
  else if (urlObj.hostname.includes('gog.com'))
    return 'GOG'
  else if (urlObj.hostname.includes('epicgames.com'))
    return 'EPIC'
  else
    return 'UN_KNOWN'
}
