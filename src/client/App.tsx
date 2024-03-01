import { useCallback, useState } from 'react';
import { Field } from './components/Field/Field';

import './App.css';

export const App = () => {
    const [ gameState, toggleSignal ] = useState<boolean>(false);
    const handleGameButtonClick = useCallback(() => {
        toggleSignal(!gameState)
    }, [toggleSignal, gameState]);

    return (
        <div className="container">
            <Field gameState={ gameState } />
            <button 
                type="submit"
                className="gameStartButton"
                onClick={ handleGameButtonClick }
            >
                { gameState ? 'Stop' : 'Start' }
            </button>
        </div>
    );
}

