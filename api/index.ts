import type { VercelRequest, VercelResponse } from '@vercel/node'
import validUrl from 'valid-url'
import { LinkSvg, _axios, getCrawerData, getMetaData, imgurl2Base64 } from '../src'
import type { MetaData } from '../src'

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    response.setHeader('Content-Type', 'image/svg+xml')
    response.setHeader('Cache-Control', `public, max-age=${300}`)
    const targetUrl = request.query.url as string
    validUrl.isUri(targetUrl)
    const { data: html } = await _axios({
      url: targetUrl,
    })
    const metadata: MetaData = await getMetaData(html, targetUrl)
    const { gameStoreName, title, description, logo, originPrice, price, percentage } = getCrawerData(html, targetUrl)

    const coverBase64 = await imgurl2Base64(metadata.image!)
    const logoBase64 = await imgurl2Base64(logo)
    const linkSvg = new LinkSvg(gameStoreName, coverBase64, logoBase64, title, description, originPrice, price, percentage)
    linkSvg.setStyle()
    linkSvg.setPriceDiv()
    // response.status(200).send({ ...metadata, ...crawlerData })
    response.send(linkSvg.render())
  }
  catch (error) {
    response.status(500).send(error)
  }
}
