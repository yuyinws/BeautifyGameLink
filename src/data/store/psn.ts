import cheerio from 'cheerio'
import type { CrawlerData } from '../crawler'

export function psn(html: string): CrawlerData {
  const $ = cheerio.load(html)
  const title = $('.game-title').text().replaceAll('&', ' ')
  const description = $('.textblock,.parbase .text-block p').first().text().replaceAll('&', ' ')
  const originPrice = $('[data-qa="mfeCtaMain#offer0#originalPrice"]').text()
  const price = $('[data-qa="mfeCtaMain#offer0#finalPrice"]').text()
  const percentage = ''

  return {
    title,
    description,
    originPrice,
    price,
    gameStoreName: 'PSN',
    percentage,
    logo: 'https://cdn.jsdelivr.net/gh/yuyinws/static/imgs/playstation_1.png',
  }
}
