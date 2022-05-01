import type { VercelRequest, VercelResponse } from '@vercel/node'
import validUrl from 'valid-url'
import { _axios, getCrawerData, getMetaData } from '../src'
import type { MetaData } from '../src'

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const targetUrl = request.query.url as string
    validUrl.isUri(targetUrl)
    const { data: html } = await _axios({
      url: targetUrl,
      method: 'get',
    })
    const metadata: MetaData = await getMetaData(html, targetUrl)
    const crawlerData = getCrawerData(html, targetUrl)
    response.status(200).send({ ...metadata, ...crawlerData })
  }
  catch (error) {
    response.status(500).send(error)
  }
}
