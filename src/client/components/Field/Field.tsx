import { memo } from 'react';
import { FieldSector } from './Sector/Sector';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Player } from '../Player/PlayerObject';
import './Field.css';
import { CordsPosition, PlayerPosition, PlayerPositionContext } from './types';
import { handlePlayerClick } from './utils';

export const Field = memo(() => {
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
        <PlayerPositionContext.Provider value={ playerPos }>
            <div className="field">
                <Player { ...vector } 
                    setDirection={ setDirection } 
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
    );
});