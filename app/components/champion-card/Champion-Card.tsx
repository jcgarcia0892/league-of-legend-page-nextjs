import React, { FC } from 'react'
import './champion-card.scss';
import { ChampionCard } from '@/app/interfaces/champions-card'
interface Props {
    championCard: ChampionCard,
};

const goTo = (url: string) => {}

export const ChampionCardComponent: FC<Props> = ({championCard}) => {
  return (
    <figure
        className="card"
        onClick={() => goTo(championCard.id)}>
        <div className="card__img">
            <img src={championCard.img} loading="lazy" alt="" />
            {/* <img src={championCard.img} loading="lazy" alt="" appNoImage> */}
        </div>
        <div className="card__figcaption">
            <figcaption>{championCard.name}</figcaption>
        </div>
    </figure>
  )
}
