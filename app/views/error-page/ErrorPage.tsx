'use client';
import { Button } from '@/app/components/button/Button'
import { useRouter } from 'next/navigation';
import './errorPage.scss';
import { FC } from 'react';

interface Props {
    name: string;
}

export const ErrorPage: FC<Props> = ({name}) => {
    const router = useRouter();
    return (
        <div className='error__container'>
            <h3>No se pudo encontrar un campeón con ese nombre: <strong>({name})</strong></h3>
            <Button onClick={() => router.push('/champions')} text='Campeones' />
        </div>
    )
}
