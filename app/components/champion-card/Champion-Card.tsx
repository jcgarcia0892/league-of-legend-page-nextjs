import React, { FC } from 'react'
import './champion-card.scss';
import { ChampionCard } from '@/app/interfaces/champions-card'
import { useRouter } from 'next/navigation';
interface Props {
    championCard: ChampionCard,
};


export const ChampionCardComponent: FC<Props> = ({championCard}) => {
  const router = useRouter();
  const goTo = (url: string) => {
    router.push(`/champion/${url}`);
  }

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
