'use client';
import { FC, MouseEventHandler } from 'react'
import './button.scss'

interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
    text: string;
    type: 'btn--primary' | 'btn--secondary';
    icon?: string | undefined;
    size: 'btn--big' | 'btn--normal' | 'btn--small';
    border?: 'btn-no--border';
}

export const Button: FC<Props> = ({ onClick, text, type = 'btn--primary', icon, size = 'btn--normal', border, }) => {
    return (
        <button
            className={`btn-base ${type} ${size} ${border}`}
            onClick={onClick}
        >
            {text}
            { !text && icon && (<i className="material-icons">{icon}</i>) }
        
        </button>
    )
}

