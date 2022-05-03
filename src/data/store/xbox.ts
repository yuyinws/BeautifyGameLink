import cheerio from 'cheerio'
import type { CrawlerData } from '../crawler'

export function xbox(html: string): CrawlerData {
  const $ = cheerio.load(html)
  const price = $('[class^=\'Price-module__srOnly\']').text()
  const originPrice = ''
  const percentage = ''
  const title = $('[class^=\'ProductDetailsHeader-module__detailContainerRight\'] h1').text()
  const description = $('[class^=\'Description-module__descriptionContainer\']').text()
  const cover = $('[class^=\'ProductDetailsHeader-module__productImageContainer\'] img').attr('src')
  return {
    percentage,
    originPrice,
    price,
    title,
    description,
    gameStoreName: 'XBOX',
    logo: 'https://cdn.jsdelivr.net/gh/yuyinws/static/imgs/xbox_1.png',
    cover,
  }
}
