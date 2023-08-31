import { Champion, ChampionsObject } from '../interfaces/champions-object';
import { ChampionCard } from '../interfaces/champions-card';
import ChampionsView from '../views/champions/Champions';
import { getChampions } from '../services/champion.service';


  const Champions = async () => {
    const championsCards = await transformCahmpions();
    return (
      <>
        <ChampionsView championsCards={championsCards} />
      </>
    )
}

export default Champions



const transformCahmpions = async(): Promise<ChampionCard[]> => {
  let championsCards: ChampionCard[] = [];
  const championObject: ChampionsObject = await getChampions();
  Object.values(championObject.data).forEach((champion: Champion) => {
    let name = champion.name;
    const img = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
    const id = champion.id;
    const difficulty = champion.info.difficulty;
    const roles = champion.tags;
    championsCards.push({name, img, id, difficulty, roles});
  });
  return championsCards;
}
