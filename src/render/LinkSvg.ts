import type { GameStoreName } from '../data/crawler'
import type { Style } from './style'
import { getStyle } from './style'

const JPEG_PREFIX = 'data:image/jpeg;base64,'
const PNG_PREFIX = 'data:image/png;base64,'

export class LinkSvg {
  private coverBase64 = ''
  private gameStoreName: GameStoreName = 'EPIC'
  private style: Style = {
    bgColor: '',
    percentageBg: '',
  }

  private title = ''
  private description = ''
  private logoBase64 = ''
  private originPrice = ''
  private price: string | null = ''
  private percentage: string | null = ''
  private percentageDiv = ''
  private priceDiv = ''
  private originPriceDiv = ''

  public constructor(gameStoreName: GameStoreName, coverBase64: string, logoBase64: string, title: string, description: string, originPrice: string, price: string | null, percentage: string | null) {
    this.coverBase64 = JPEG_PREFIX + coverBase64
    this.gameStoreName = gameStoreName
    this.title = title
    this.description = description
    this.logoBase64 = PNG_PREFIX + logoBase64
    this.originPrice = originPrice
    this.price = price
    this.percentage = percentage
  }

  public setStyle() {
    this.style = getStyle(this.gameStoreName)
  }

  public formatGameStoreName(gameStoreName: GameStoreName) {
    switch (gameStoreName) {
      case 'EPIC':
        return 'Epic Games'
      case 'NINTENDO':
        return 'Nintendo'
      case 'XBOX':
        return 'Xbox'
      default:
        return 'UN_KNOWN'
    }
  }

  public setPriceDiv() {
    this.percentageDiv = this.percentage ? `<div class="percentage">${this.percentage}</div>` : ''
    this.priceDiv = this.price ? `<div class="text">${this.price}</div>` : ''
    // this.originPriceDiv = this.price
    //   ? `<div class="subText">${this.originPrice}</div>`
    //   : `<div class="text">${this.originPrice}</div>`
    if (this.originPrice && this.price)
      this.originPriceDiv = `<div class="subText">${this.originPrice}</div>`
    else
      this.originPriceDiv = `<div class="text">${this.originPrice}</div>`
  }

  public render() {
    return `
      <svg
        width="580" height="200"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg">
      >
      <style>
        .price {
          display: flex;
          gap:10px;
          align-items: center;
          color:white;
        }

        .percentage {
          width: 50px;
          height: 25px;
          background-color: ${this.style.percentageBg};
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          font-size: 14px;
          color:white
        }

        .text {
          color:white
        }

        .subText {
          color:#F5F5F599;
          text-decoration:line-through;
        }

        .bottom-wrap {
          display:flex;
          align-items:center;
          margin-top:12px;
          justify-content: space-between;
        }

        .content-wrap {
          display:flex;
          gap:10px;
        }

        .logo {
          width:25px;
          height:25px;
        }

        .cover {
          width:180px;
          height:145px;
          border-radius: 10px;
          object-fit: cover;
        }

        .description {
          font-size: 14px;
          margin-top: 5px;
          height: 112px;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .title {
          font-size: 18px;
          color: #F3F4F6;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      </style>


      <defs>
        <pattern id="raduisImage" patternUnits="userSpaceOnUse" width="300" height="180">
          <image height="180" width="180" xlink:href="${this.coverBase64}"></image>
        </pattern>
      </defs>

      <rect rx="5" fill="${this.style.bgColor}"  width="100%" height="100%" />

      <foreignObject width="100%" height="200">
        <body xmlns="http://www.w3.org/1999/xhtml">
          <div class="content-wrap">
            <img class="cover" src="${this.coverBase64}"></img>
            <div>
              <div class="title">${this.title}</div>
              <div class="text description">${this.description}</div>
            </div>
          </div>
          <div class="bottom-wrap">
            <img class="logo" src="${this.logoBase64}"></img>
            <div class="price">
              ${this.percentageDiv}
              ${this.originPriceDiv}
              ${this.priceDiv}
            </div>
          </div>
        </body>
      </foreignObject>
    </svg>
    `
  }
}
