import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import './title-animated.scss';
import { positionYFadeIn } from '@/app/animation/basics';

const scrollDetection = (event: Event, titlePositionY: number): boolean => {
    let scrollTop = (event.target as any).scrollingElement.scrollTop;
    let clientHeight = (event.target as any).scrollingElement.clientHeight;
    let scrollPositionY = scrollTop + clientHeight;
    let isTrueAnimation = positionYFadeIn(titlePositionY, scrollPositionY);
    return isTrueAnimation;
}

const getTitlePositionY = (titleContainer: HTMLDivElement ): number => {
    let titleOffsetTop: number = titleContainer?.offsetTop!;
    let titleOffsetHeight: number = titleContainer?.offsetHeight!;
    return titleOffsetTop + titleOffsetHeight;
}

const TitleAnimated: FC<PropsWithChildren> = ({children}) => {
    const titleRef = useRef<HTMLDivElement>(null);
    const [ isTrueAnimation, setIsTrueAnimation ] = useState<boolean>(true);
    
    useEffect(() => {
        let titlePositionY = getTitlePositionY(titleRef.current!);
        const scrollEvent = (event: Event) => {
            setIsTrueAnimation(scrollDetection(event, titlePositionY));
        };
        window.addEventListener('scroll', scrollEvent);
        return () => {
            window.removeEventListener('scroll', scrollEvent);
        };
    }, []);

    return (
        <div ref={titleRef} className={`animation-container ${isTrueAnimation ? 'enable': ''}`}>
            { children }
        </div>
    )
}

export default TitleAnimated