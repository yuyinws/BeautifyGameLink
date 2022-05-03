import cheerio from 'cheerio'
import type { CrawlerData } from '../crawler'

export function ubi(html: string): CrawlerData {
  const $ = cheerio.load(html)
  const title = $('.product-title-wrapper').text()
  const description = $('.product-description').text()
  const originPrice = $('.flex-reverse-order .price-standard').text()
  const price = $('.flex-reverse-order .standard-price').text()
  const percentage = $('.pdp-badge-only .deal-percentage').html()
  return {
    title,
    description,
    originPrice,
    price,
    gameStoreName: 'UBI',
    percentage,
    logo: 'https://cdn.jsdelivr.net/gh/yuyinws/static/imgs/ubi.png',
  }
}
