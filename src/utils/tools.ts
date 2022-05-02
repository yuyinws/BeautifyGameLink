import { _axios } from './axios'

export async function imgurl2Base64(imgurl: string) {
  const { data } = await _axios({
    url: imgurl,
    responseType: 'arraybuffer',
  })
  if (data)
    return Buffer.from(data).toString('base64')
  return ''
}
