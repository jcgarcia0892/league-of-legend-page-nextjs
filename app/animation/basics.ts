export type MousePosition = 'toXsLeft' | 'toSmLeft' | 'toMdLeft' | 'toLgLeft'
| 'toXlLeft' | 'toXsRight' | 'toSmRight' | 'toMdRight' | 'toLgRight' | 'toXlRight';

export interface MouseMoveAnimation {
    mousePosition: MousePosition;
    movement: string;
} 

export const positionYFadeIn = (elementPositionY: number, scrollPositionY: number): boolean => {
    return (elementPositionY < scrollPositionY) ? true : false;
}

export const mouseMoveAnimation = (positionX: number, partialZone: number): MouseMoveAnimation => {
    if(positionX <= partialZone * 1) {
      return {mousePosition: 'toXsLeft', movement: '-100px'}
    } else if(positionX <= partialZone * 2) {
      return {mousePosition: 'toSmLeft', movement: '-80px'}
    } else if(positionX <= partialZone * 3) {
      return {mousePosition: 'toMdLeft', movement: '-60px'}
    } else if(positionX <= partialZone * 4) {
      return {mousePosition: 'toLgLeft', movement: '-40px'}
    } else if(positionX <= partialZone * 5) {
      return {mousePosition: 'toXlLeft', movement: '-20px'}
    } else if(positionX <= partialZone * 6) {
      return {mousePosition: 'toXsRight', movement: '20px'}
    } else if(positionX <= partialZone * 7) {
      return {mousePosition: 'toSmRight', movement: '40px'}
    } else if(positionX <= partialZone * 8) {
      return {mousePosition: 'toMdRight', movement: '60px'}
    } else if(positionX <= partialZone * 9) {
      return {mousePosition: 'toLgRight', movement: '80px'}
    } else {
      return {mousePosition: 'toXlRight', movement: '100px'}
    }
  }