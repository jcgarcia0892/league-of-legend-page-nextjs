import { ChampionsObject } from "../interfaces/champions-object";

export const baseUrl: string = 'https://ddragon.leagueoflegends.com/cdn';

export const getupdatedVersion = async(): Promise<string[]> => {
    return fetch('https://ddragon.leagueoflegends.com/api/versions.json').then((res) => res.json());
}
  
export const getChampions = async(): Promise<ChampionsObject> => {
    const versions = await getupdatedVersion();
  
    return fetch((`${baseUrl}/${versions[0]}/data/es_ES/champion.json`)).then(res => res.json());
}
export const getChampion = async(id: string) => {
    const versions = await getupdatedVersion();
    return fetch(`${baseUrl}/${versions[0]}/data/es_ES/champion/${id}.json`).then((res) => res.json());
}