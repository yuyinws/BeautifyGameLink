import cheerio from 'cheerio'
import type { CrawlerData } from '../crawler'

export function epic(html: string): CrawlerData {
  const $ = cheerio.load(html)
  const priceArr: string[] = []
  let percentage: string | null = ''
  let originPrice = ''
  let price: string | null = ''
  $('[data-component="CatalogOfferSidebarPrice"] [data-component="Text"]').each((_, el) => {
    priceArr.push($(el).text())
  })
  if (priceArr.length === 1) {
    originPrice = priceArr[0]
    price = null
    percentage = null
  }
  else {
    originPrice = priceArr[1]
    price = priceArr[2]
    percentage = priceArr[0]
  }
  const title = $('[data-component="PDPTitleHeader"] [data-component="Text"]').first().text()
  const description = $('[data-component="AboutSectionLayout"] [data-component="Text"]').first().text()
  return {
    percentage,
    originPrice,
    price,
    title,
    description,
    gameStoreName: 'EPIC',
    logo: 'https://static-assets-prod.epicgames.com/epic-store/static/favicon.ico',
  }
}
