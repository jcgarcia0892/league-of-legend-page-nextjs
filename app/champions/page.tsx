import { Champion, ChampionsObject } from '../interfaces/champions-object';
import './champions.scss';
import { ChampionCard } from '../interfaces/champions-card';
import ChampionsView from '../views/champions/Champions';

const baseUrl: string = 'https://ddragon.leagueoflegends.com/cdn';

  const Champions = async () => {
    const championsCards = await transformCahmpions();
    return (
      <>
        <ChampionsView championsCards={championsCards} />
      </>
    )
}

export default Champions

const getupdatedVersion = async(): Promise<string[]> => {
  return fetch('https://ddragon.leagueoflegends.com/api/versions.json').then((res) => res.json());
}

const getChampions = async(): Promise<ChampionsObject> => {
  const versions = await getupdatedVersion();

  return fetch((`${baseUrl}/${versions[0]}/data/es_ES/champion.json`)).then(res => res.json());
}

const transformCahmpions = async(): Promise<ChampionCard[]> => {
  let championsCards: ChampionCard[] = [];
  const championObject = await getChampions();
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
