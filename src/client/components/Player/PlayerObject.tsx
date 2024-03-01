import { useSpring, animated } from 'react-spring';
import { useEffect, useRef, useMemo } from 'react';
import './Player.css';
import { checkActiveSector } from '../Field/utils';
import { CordsPosition, PlayerPosition } from '../Field/types';

type Props = {
    x: number;
    y: number;
    color: string;
    currentCords: (cords: CordsPosition) => void;
    setPlayerPos: (playerPos: PlayerPosition) => void;
    cords: CordsPosition;
    playerPos: PlayerPosition;
}

export const Player: React.FC<Props> = (
    {     
        x, 
        y, 
        color, 
        currentCords, 
        cords,
        playerPos,
        setPlayerPos
    }) => {

    const requestRef = useRef<number>();
    const props = useSpring({ 
        left: x, 
        top: y,
        config: { 
            tension: 270, 
            friction: 30, 
        },
    });

    const trackPosition = useMemo(() => () => {
        const playerCords = document.querySelector('.player div')!.getBoundingClientRect();
        if (!playerCords) {
            return;
        }
        const x = playerCords.x;
        const y = playerCords.y;
        checkActiveSector({
            playerCords: { x, y },
            currentCords,
            setPlayerPos,
            cords,
            playerPos,
        })
        requestRef.current = requestAnimationFrame(trackPosition);
    }, [cords, currentCords, playerPos, setPlayerPos]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(trackPosition);

        return () => cancelAnimationFrame(requestRef.current!);
    }, [trackPosition]);

    return (
        <div className="player">
            <animated.div
                style={ 
                    {
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        background: color,
                        borderRadius: '50%',
                        ...props,
                    } 
                }
            />
        </div>
    )
}

