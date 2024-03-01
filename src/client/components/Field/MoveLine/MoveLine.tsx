import { useContext, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { GameStateContext } from '../types';

type MoveLineProps = {
    elements: Array<{ position: String; delay: Number }>
}

function hashCode(element: String, index: number) {
    return (Math.random() * 1000000000 << 2) * index >> element.length;
}

export const MoveLine: React.FC<MoveLineProps> = ({ elements }) => {
    const GameState = useContext(GameStateContext);

    const [ styles, api ] = useSpring(() => ({
            from: {
                right: '0'
            },
            to: {
                right: '10000px',
            },
            config: {
                tension: 5, 
                friction: 270, 
            }
        })
    );

    useEffect(() => {
        if (GameState) {
            api.start();
            return () => {
                api.stop();
            };
        }
    }, [GameState, api]);
    

    return (
        <div className="lineContainer">
            <div className="currentCommand"></div>
            <animated.div style={ styles } className="commands">
                {
                    elements.map(element => {
                        switch(element.position) {
                            case 'up':
                                return '⬆';
                            case 'down':
                                return '⬇';
                            case 'left':
                                return '⬅';
                            case 'right':
                                return '⮕';
                            case 'center':
                                return 'o';
                        }
                        return 'o';
                    }).map((e, index) => {
                        
                        return (
                            <div 
                                key={ hashCode(e, index) } 
                                className={`command${index}`}
                            >
                                {e}
                            </div> 
                        )
                    })
                }
            </animated.div>
        </div>
    )
}