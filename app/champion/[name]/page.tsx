import React, { FC } from 'react'
import { Champion } from '@/app/interfaces/champions-object';
import { baseUrl, getChampion } from '@/app/services/champion.service';
import { Skill } from '@/app/interfaces/champion.interface';
import ChampionView from '@/app/views/champion/Champion';
import { ErrorPage } from '@/app/views/error-page/ErrorPage';

interface Props {
    params: {name: string};
}

const Champion: FC<Props> = async ({params}) => {
    const champion = await getChampionData(params.name);
    if(!!champion) {
      return (
          <ChampionView champion={champion} />
      )
    }
    return <ErrorPage name={params.name} />
    
}

export default Champion

const getChampionData = async(id: string): Promise<any> => {
  try {
    const {data, version} = await getChampion(id);

    const imagesPath = getImagesPath(id, version);
    const skills = [];
    const skillSelected = {};
    const rolArray = [];
    for(let rol of data[id].tags) {
      rolArray.push(translateRol(rol));
    }
    skills.push(mapSkills(data[id].passive, version));
    
    for(let i = 0; i < data[id].spells.length; i++) {
      skills.push(mapSkills(data[id].spells[i], version, i));
    }
    skills[0].checked = true;
    const {spells, stats, blurb, info, partype, recommended, ...champProps} = data[id]
    const champion: Champion = {
      skills,
      rolArray,
      ...imagesPath,
      ...champProps
    }
    return champion;
  } catch (error) {}

}

const getImagesPath = (idChamp: string, version: string): {imgSplash: string, imgSquare: string, imgLoading: string} => {
    const imgSplash = `${baseUrl}/img/champion/splash/${idChamp}_0.jpg`;
    const imgSquare = `${baseUrl}/${version}/img/champion/${idChamp}.png`;
    const imgLoading = `${baseUrl}/img/champion/loading/${idChamp}_0.jpg`;
    return {
      imgSplash,
      imgSquare,
      imgLoading
    }
}

const translateRol = (value: string): string => {
    switch (value) {
      case 'Assassin':
        return 'Asesino';
      case 'Fighter':
        return 'Luchador';
      case 'Mage':
        return 'Mago';
      case 'Marksman':
        return 'Tirador';
      case 'Support':
        return 'Soporte';
      default:
        return 'Tanque';
    }
}

const mapSkills = (element: any, version: string, index: number = 5,): Skill => {
    let key = '';
    let {name, description, image} = element;
    switch (index) {
      case 0:
        key = 'Q'
        break;
      case 1:
        key = 'W'
        break;
      case 2:
        key = 'E'
        break;
      case 3:
        key = 'R'
        break;
      default:
        key = 'Pasiva'
        break;
    }
    return {
      checked: false,
      name,
      description,
      img: `${baseUrl}/${version}/img/${image.group}/${image.full}`,
      key
    }

}