import cheerio from 'cheerio'
import type { CrawlerData } from '../crawler'

export function epic(html: string): CrawlerData {
  const $ = cheerio.load(html)
  const percentage = $('[data-component="CatalogOfferSidebarPrice"] [data-component="Text"]').first().text()
  const originPrice = $('[data-component="CatalogOfferSidebarPrice"] [data-component="PDPDiscountedFromPrice"]').text()
  const price = $('[data-component="CatalogOfferSidebarPrice"] [data-component="Text"]').last().text()
  const title = $('[data-component="PDPTitleHeader"] [data-component="Text"]').first().text()
  const description = $('[data-component="AboutSectionLayout"] [data-component="LineClamp"]').text()
  return {
    percentage,
    originPrice,
    price,
    title,
    description,
  }
}
