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

  public constructor(gameStoreName: GameStoreName, coverBase64: string) {
    this.coverBase64 = JPEG_PREFIX + coverBase64
    this.gameStoreName = gameStoreName
  }

  public setStyle() {
    this.style = getStyle(this.gameStoreName)
  }

  public render() {
    return `
      <svg
        width="700" height="170"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg">
      >        
      <defs>
        <pattern id="raduisImage" patternUnits="userSpaceOnUse" width="300" height="180">
          <image height="180" width="300" xlink:href="${this.coverBase64}"></image>
        </pattern>
      </defs>

      <rect fill="${this.style.bgColor}"  width="100%" height="100%" />

      <rect rx="10" height="150" width="280" x="10" y="10" fill="url(#raduisImage)"></rect>
      
      <text font-size="18" y="30" x="300" fill="white">《这是游戏标题》</text>
      <text font-size="14" y="60" x="300" fill="white">《这是游戏描述》</text>

      <rect rx="5" fill="${this.style.percentageBg}" x="300" y="135" width="50" height="25"></rect>
      <text font-size="14" x="308" y="153">-25%</text>
      </svg>
    `
  }
}
