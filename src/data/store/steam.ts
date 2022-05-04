import cheerio from 'cheerio'
import type { CrawlerData } from '../crawler'
export function steam(html: string): CrawlerData {
  const $ = cheerio.load(html)
  // 适配bundle
  const title = $('.apphub_AppName').first().text() || $('.pageheader').text()
  const description = $('.game_description_snippet').text() || $('#game_area_description').text()
  const originPrice = $('.discount_original_price').first().text()
  const price = $('.discount_final_price').first().text()
  const percentage = $('.discount_pct').first().text()

  return {
    title,
    description,
    originPrice,
    price,
    percentage,
    gameStoreName: 'STEAM',
    logo: 'https://cdn.jsdelivr.net/gh/yuyinws/static/imgs/steam.png',
  }
}
