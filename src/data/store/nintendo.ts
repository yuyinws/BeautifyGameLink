import cheerio from 'cheerio'
import type { CrawlerData } from '../crawler'

export function nintendo(html: string): CrawlerData {
  const $ = cheerio.load(html)
  const title = $('.page-title .base').text()
  const description = $('.description .value').text()
  const originPrice = $('[data-price-type="oldPrice"]').text()
  const price = $('[data-price-type="finalPrice"]').first().text()
  const percentage = ''

  return {
    title,
    description,
    originPrice,
    price,
    gameStoreName: 'NINTENDO',
    percentage,
    logo: 'https://cdn.jsdelivr.net/gh/yuyinws/static/imgs/nintendo_1.png',
  }
}
