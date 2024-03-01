import { memo } from 'react';
import { FieldSector } from './Sector/Sector';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Player } from '../Player/PlayerObject';
import './Field.css';
import { CordsPosition, GameStateContext, PlayerPosition, PlayerPositionContext } from './types';
import { handlePlayerClick } from './utils';
import { MoveLine } from './MoveLine/MoveLine';
import { elements } from './MoveLine/TestData';

type FieldState = {
    gameState: boolean;
}

export const Field: React.FC<FieldState> = memo(({ gameState }) => {
    useEffect(() => console.log(gameState), [gameState])
    const stack: Array<string> = useMemo(() => [], []);

    const [ playerPos, setPlayerPos ] = useState<PlayerPosition>('center');
    const [ cords, currentCords ] = useState<any>();
    const [ vector, setDirection ] = useState<CordsPosition>({ x: 0, y: 0 });

    const handleDefaultPlayerClick = useCallback(() => {
        if (stack.length === 0) {
            setDirection({ x: 0, y: 0 });
        }
        stack.pop();
    }, [setDirection, stack]);

    const handlePlayerKeyPress = useCallback((event: KeyboardEvent) => handlePlayerClick({
        event, 
        setDirection,
        stack
    }), [setDirection, stack]);
    
    useEffect(() => {
        window.addEventListener('keydown', handlePlayerKeyPress);
        window.addEventListener('keyup', handleDefaultPlayerClick);
        return () => {
            window.removeEventListener('keydown', handlePlayerKeyPress);
            window.removeEventListener('keyup', handleDefaultPlayerClick);
        };
    });

    return (
        <GameStateContext.Provider value={ gameState }>
            <PlayerPositionContext.Provider value={ playerPos }>
                <MoveLine elements={ elements }/>
                <div className="field">
                    <Player { ...vector } 
                        currentCords={ currentCords }
                        setPlayerPos={ setPlayerPos }
                        playerPos={ playerPos }
                        cords={ cords }
                        color="black" 
                    />
                    <FieldSector id={ 1 } type="up" />
                    <FieldSector id={ 2 } type="left" />
                    <FieldSector id={ 3 } type="center" />
                    <FieldSector id={ 4 } type="right" />
                    <FieldSector id={ 5 } type="down" />
                </div>
            </PlayerPositionContext.Provider>
        </GameStateContext.Provider>
    );
});