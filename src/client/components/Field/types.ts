import { createContext } from 'react';

export type PlayerPosition = 'up' | 'left' | 'center' | 'right' | 'down';

export type CordsPosition = {
    x: number;
    y: number;
}

export type ActiveSectorProps = {
    playerCords: CordsPosition;
    currentCords: (cords: CordsPosition) => void;
    setPlayerPos: (playerPos: PlayerPosition) => void;
    cords: CordsPosition;
    playerPos: PlayerPosition;
}

export type PlayerClickProps = {
    event: KeyboardEvent;
    setDirection: any;
    stack: Array<string>
}

export const PlayerPositionContext = createContext('center');

export const GameStateContext = createContext(false);