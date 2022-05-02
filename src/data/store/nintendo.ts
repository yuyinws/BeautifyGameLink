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
    logo: 'https://s2.loli.net/2022/05/02/YM12ZgBVfN3nkdp.png',
  }
}
