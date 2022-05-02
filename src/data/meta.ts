import metascraper from 'metascraper'
import author from 'metascraper-author'
import image from 'metascraper-image'
import logo from 'metascraper-logo'
import description from 'metascraper-description'

export interface MetaData {
  author: string | null
  image: string | null
  logo?: string | null
  description: string | null
}

const meta = metascraper([author(), image(), logo(), description()])

function getMetaData(html: string, url: string): Promise<MetaData> {
  return meta({ html, url })
}

export { getMetaData }
