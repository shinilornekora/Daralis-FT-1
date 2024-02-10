import { ActiveSectorProps, PlayerClickProps, PlayerPosition } from "./types";

export const checkActiveSector = ({ playerCords, currentCords, cords, playerPos, setPlayerPos }: ActiveSectorProps) => {
    let result: PlayerPosition = 'center';

    currentCords({ x: playerCords.x - 289, y: playerCords.y - 436 });
    
    if (!cords?.x || !cords?.y) {
        return;
    }

    if (cords.x <= 310 && cords.x >= 160 && cords.y >= 0 && cords.y <= 150) {
        result = 'up';
    }
    
    if (cords.x <= 310 && cords.x >= 160 && cords.y >= 160 && cords.y <= 310) {
        result = 'center';
    }
    
    if (cords.x <= 310 && cords.x >= 160 && cords.y >= 320 && cords.y <= 470) {
        result = 'down';
    }
    
    if (cords.x >= 0 && cords.x <= 150 && cords.y >= 160 && cords.y <= 310) {
        result = 'left';
    }
    
    if (cords.x >= 320 && cords.x <= 470 && cords.y >= 160 && cords.y <= 310) {
        result = 'right';
    }

    if (result !== playerPos) {
        setPlayerPos(result);
    }
}

export const handlePlayerClick = ({ event, setDirection, stack }: PlayerClickProps) => {
    stack.push(event.key);
    switch (event.key) {
      case 'w':
        setDirection({ x: 0, y: -163 });
        break;
      case 'a':
        setDirection({ x: -163, y: 0 });
        break;
      case 's':
        setDirection({ x: 0, y: 163 });
        break;
      case 'd':
        setDirection({ x: 163, y: 0 });
        break;
    }
  }