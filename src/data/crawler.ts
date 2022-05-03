import { epic, nintendo, psn, steam, ubi, xbox } from './store/index'

export interface CrawlerData {
  originPrice: string
  price: string | null
  percentage: string | null
  title: string
  description: string
  gameStoreName: GameStoreName
  logo: string
  cover?: string
}

export type GameStoreName = 'UN_KNOWN' | 'STEAM' | 'GOG' | 'EPIC' | 'NINTENDO' | 'XBOX' | 'PSN' | 'UBI'

export function getCrawerData(html: string, targetUrl: string): CrawlerData {
  switch (getStoreName(targetUrl)) {
    case 'STEAM':
      return steam(html)
    case 'EPIC':
      return epic(html)
    case 'NINTENDO':
      return nintendo(html)
    case 'XBOX':
      return xbox(html)
    case 'PSN':
      return psn(html)
    case 'UBI':
      return ubi(html)
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
  else if (urlObj.hostname.includes('nintendo.com'))
    return 'NINTENDO'
  else if (urlObj.hostname.includes('xbox.com'))
    return 'XBOX'
  else if (urlObj.hostname.includes('playstation.com'))
    return 'PSN'
  else if (urlObj.hostname.includes('ubi.com'))
    return 'UBI'
  else
    return 'UN_KNOWN'
}
