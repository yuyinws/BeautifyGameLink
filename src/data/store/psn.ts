import cheerio from 'cheerio'
import type { CrawlerData } from '../crawler'

export function psn(html: string): CrawlerData {
  const $ = cheerio.load(html)
  const title = $('.game-hero__title-content h1').text()
  const description = $('.textblock,.parbase .text-block p').first().text()
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
