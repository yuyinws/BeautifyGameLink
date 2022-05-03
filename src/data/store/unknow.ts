import type { CrawlerData } from '../crawler'

export function unknow(): CrawlerData {
  return {
    percentage: '',
    originPrice: '',
    price: '',
    title: '不支持的链接类型',
    description: '不支持的链接类型',
    gameStoreName: 'UN_KNOWN',
    logo: 'https://cdn.jsdelivr.net/gh/yuyinws/static/imgs/unknow.png',
  }
}
