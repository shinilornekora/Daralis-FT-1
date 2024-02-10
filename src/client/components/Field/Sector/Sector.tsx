import { memo } from 'react';
import { useContext } from "react";
import { PlayerPositionContext } from "../types";

type Props = {
    id: number;
    type: string;
}

export const FieldSector = memo(({ id, type }: Props) => {
    const playerPos = useContext(PlayerPositionContext);
    
    return (
        <div className={ `sec sec${id} ${ playerPos === type ? 'active' : ''}` }>

        </div>
    );
});