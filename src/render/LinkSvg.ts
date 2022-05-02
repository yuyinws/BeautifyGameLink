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
      default:
        return 'UN_KNOWN'
    }
  }

  public setPriceDiv() {
    this.percentageDiv = this.percentage ? `<div class="percentage">${this.percentage}</div>` : ''
    this.priceDiv = this.price ? `<div class="text">${this.price}</div>` : ''
    this.originPriceDiv = this.originPrice
      ? `<div class="subText">${this.originPrice}</div>`
      : `<div class="text">${this.originPrice}</div>`
  }

  public render() {
    return `
      <svg
        width="700" height="210"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg">
      >
      <style>
        .price {
          display: flex;
          gap:10px;
          align-items: center;
        }

        .percentage {
          width: 50px;
          height: 25px;
          background-color: #DD3FE4;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          font-size: 14px;
          color:white
        }

        .cover {
          height:180px;
          width:300px;
          border-radius: 10px;
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
          justify-content:space-between;
        }

        .logo {
          width:25px;
          height:25px;
        }
      </style>


      <defs>
        <pattern id="raduisImage" patternUnits="userSpaceOnUse" width="300" height="180">
          <image height="180" width="300" xlink:href="${this.coverBase64}"></image>
        </pattern>
      </defs>

      <rect fill="${this.style.bgColor}"  width="100%" height="100%" />

      <rect rx="10" height="150" width="280" x="10" y="10" fill="url(#raduisImage)"></rect>

      <image class="logo" x="10" y="172" xlink:href="${this.logoBase64}" ></image>

      <foreignObject x="300" width="400" height="150">
        <body xmlns="http://www.w3.org/1999/xhtml">
          <div class="text" style="font-size:18px">${this.title}</div>
          <div class="text" style="font-size:14px;margin-top:5px">${this.description}</div>
        </body>
      </foreignObject>

        <foreignObject width="660" x="30" height="50" y="165">
          <body xmlns="http://www.w3.org/1999/xhtml">
            <div class="bottom-wrap">
              <div style="display:flex;align-items:center;gap:5px">
                <div class="text">${this.formatGameStoreName(this.gameStoreName)}</div>
              </div>
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
