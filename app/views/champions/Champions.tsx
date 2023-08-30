'use client';
import React, { ChangeEvent, FC, useState } from 'react'
import './champions.scss';
import { Button } from '@/app/components/button/Button'
import { ChampionCardComponent } from '@/app/components/champion-card/Champion-Card'
import { ChampionCard } from '@/app/interfaces/champions-card'
import { useEffect } from 'react';
import { ChampionFilter } from '@/app/interfaces/champion-filter.interface';

interface Props {
    championsCards: ChampionCard[];
}

const ChampionsView: FC<Props> = ({championsCards}) => {
    const [randomchampionsCards, setRandomchampionsCards] = useState<ChampionCard[]>([]);
    const [championsCardsFiltered, setChampionsCardsFiltered] = useState<ChampionCard[]>(championsCards);
    const [ championsNameFiltered, setChampionsNameFiltered ] = useState<ChampionCard[]>([]);
    const [ idChamp, setIdChamp ] = useState<string>('');
    const [ activeFocusSearcherInput, setActiveFocusSearcherInput ] = useState<boolean>(false);
    const [ championSearchControlText, setChampionSearchControlText ] = useState<string>('');
    const [ filters, setFilters ] = useState<ChampionFilter[]>([]);
    const [ championsRolesControlText, setChampionsRolesControl ] = useState<string>('');
    const [ levelsControlCheck, setLevelControlCheck ] = useState<boolean>(false);
    const [ difficultChamp, setDifficultChamp ] = useState<number>(0);
    const [ difficulty, setDifficulty ] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const championNameFilterFunction = (text: string): void => {
        let championName = [];
        text = text.toUpperCase();
        for (let champion of championsCards) {
          if(champion.name.toUpperCase().indexOf(text) !== -1) {
            championName.push(champion);
          }
        }
        setChampionsNameFiltered(championName);
    };

    const championSearchControl = () => {
        championNameFilterFunction(championSearchControlText);
        setIdChamp(championSearchControlText);
    }

    const championsRolesControl = () => {
        champsFilter(idChamp, championsRolesControlText , difficultChamp);
        if(championsRolesControlText !== '') {
          let filter = {field: 'rol', value: championsRolesControlText};
          let index = filters.findIndex((element: ChampionFilter) => element.field === filter.field);
          if(index === -1) {
            setFilters([...filters, filter])
          } else {
            filters[index].value = championsRolesControlText;
            setFilters([...filters]);
          }
        }
    }

      // RESET FILTERS
    const cleanFilters = (): void => {
        setIdChamp('');
        setChampionSearchControlText('');
        setChampionsRolesControl('');
        setDifficultChamp(0)
        setFilters([]);
        champsFilter('', '', 0);
    };

  // END RESET FILTERS

    // BLUR INPUTS
    const blurSearcher = (): void => {
        setTimeout(() => setActiveFocusSearcherInput(false), 90);
    };

    const blurDifficulty = (): void => {
        setTimeout(() => setLevelControlCheck(false), 90);
    };
    // END BLUR INPUTS

    const cleanChipFilter = (field: string): void => {
        let index = filters.findIndex((element) => element.field === field);
        let id = idChamp;
        let rol = championsRolesControlText;
        let difficulty = difficultChamp;
        setFilters(filters.filter((_, i) => i !== index));
        
        switch (field.toLowerCase()) {
          case 'nombre':
            id = ''; 
            setChampionSearchControlText(id); 
            break;
          case 'rol':
            rol = '';
            setChampionsRolesControl(rol)
            break;
          case 'dificultad':
            difficulty = 0;
            setDifficultChamp(difficulty)
            break;
        };
        champsFilter(id, rol, difficulty);
    };

    const champsFilter = (id: string, rol: string, difficulty: number): void => {
        let filter = championsCards;
        if(id) {
          filter = filterArrayById(filter, id);
        };
        
        if(rol) {
          filter = filterArrayByRoles(filter, rol);
        };
    
        if(difficulty) {
          filter = filterArrayByDifficulty(filter, difficulty);
        }
        setChampionsCardsFiltered(filter);
    
    }

    // ARRAY FILTERS
    const filterArrayById = (array: ChampionCard[], id: string): ChampionCard[] => {
        return array.filter((element) => element.id === id);
    };

    const filterArrayByRoles = (array: ChampionCard[], roles: string): ChampionCard[] => {
        let championsCards: ChampionCard[] = [];
        championsCards = array.filter((element) => {
          for(let rol of element.roles) {
            return rol.toLocaleLowerCase() === roles;
          }
          return;
        });

        return championsCards;
    };

    const filterArrayByDifficulty = (array: ChampionCard[], difficulty: number): ChampionCard[] => {
        return array.filter((element) => element.difficulty === difficulty);
    };
    // END ARRAY FILTERS

    // CARDS FILTERS
    const filterChampionByName = (id: string): void => {
        setIdChamp(id);
        champsFilter(id, championsRolesControlText, difficultChamp);
        const champion: ChampionCard | undefined = championsCards.find((ch: ChampionCard) => ch.id === id)
        setChampionSearchControlText(champion?.name || '');
        let filter = {field: 'nombre', value: champion?.name || ''};
        let index = filters.findIndex((element: ChampionFilter) => element.field === filter.field);
        if(index === -1) {
            setFilters((value) => [...value, filter]);
        } else {
            filters[index].value = champion?.name || '';
            setFilters([...filters]);
        }
        setActiveFocusSearcherInput(false);
    };

    const filterChampionByDifficulty = (difficulty: number): void => {
        setDifficultChamp(difficulty);
        champsFilter(idChamp, championsRolesControlText, difficulty);
        let filter = {field: 'dificultad', value: difficulty};
        let index = filters.findIndex((element: ChampionFilter) => element.field === filter.field);
        if(index === -1) {
            setFilters([...filters, filter])
        } else {
            filters[index].value = difficulty;
            setFilters([...filters]);
        }
    };
    // END CARDS FILTERS 

    useEffect(() => {
        championSearchControl();
    }, [championSearchControlText]);

    useEffect(() => {
        championsRolesControl();
    }, [championsRolesControlText]);

    useEffect(() => {
        setRandomchampionsCards(pushingRandomChampions(championsCards));
    }, []);

  return (
    <section className="findChamps">
        <div className="findChamps__title">
            <h1>ENCUENTRA TU CAMPEÓN</h1>
            <h4>Puedes ver la información del campeón que mas te guste, puedes filtrar por nombre, por rol o por dificultad de uso</h4>
        </div>
        <div className="findChamps__body">

            <div className="findChamps__body__navbar">
                <div className="findChamps__body__navbar__search">
                    <div className="findChamps__body__navbar__search__button">
                        <div className="search-input">
                            <input
                                autoComplete='off'
                                type="text"
                                placeholder="BUSCAR"
                                value={championSearchControlText}
                                onChange={ (event) => setChampionSearchControlText(event.target.value)}
                                // onChange={(event) => setChampionSearchControlText(event.target.value)}
                                onFocus={() => setActiveFocusSearcherInput(true)}
                                onBlur={() => blurSearcher()}
                                id="searcherInput" />
                            <label className="material-icons icon-asset" htmlFor="searcherInput">search</label>
                            {
                                championSearchControlText.length > 0 &&
                                <i  className="material-icons icon-asset"
                                    onClick={() => cleanChipFilter('nombre')}
                                >
                                    close
                                </i>

                            }
                        </div>
                    </div>
                    <div className={`findChamps__body__navbar__search__dropdown ${activeFocusSearcherInput && 'fadeIn'}`}>
                        <ul>
                            {
                                championsNameFiltered.map((champion) => (
                                    <li key={champion.id} onClick={() => filterChampionByName(champion.id)}>
                                        {champion.name}
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
                <div className="findChamps__body__navbar__filters">
                    <ul className="findChamps__body__navbar__filters__lists">
                        <li className="findChamps__body__navbar__filters__lists__item">
                            <input type="radio" name="rols" id="assassinsFilter" checked={championsRolesControlText === 'assassin'} onChange={(event) => setChampionsRolesControl(event.target.value)} value="assassin" />
                            <label htmlFor="assassinsFilter">
                                <span>ASESINOS</span>
                            </label>
                        </li>
                        <li className="findChamps__body__navbar__filters__lists__item">
                            <input type="radio" name="rols" id="supportsFilter" checked={championsRolesControlText === 'support'} onChange={(event) => setChampionsRolesControl(event.target.value)} value="support" />
                            <label htmlFor="supportsFilter">
                                <span>APOYOS</span>
                            </label>
                        </li>
                        <li className="findChamps__body__navbar__filters__lists__item">
                            <input type="radio" name="rols" id="fightersFilter" checked={championsRolesControlText === 'fighter'} onChange={(event) => setChampionsRolesControl(event.target.value)} value="fighter" />
                            <label htmlFor="fightersFilter">
                                <span>LUCHADORES</span>
                            </label>
                        </li>
                        <li className="findChamps__body__navbar__filters__lists__item">
                            <input type="radio" name="rols" id="magesFilter" checked={championsRolesControlText === 'mage'} onChange={(event) => setChampionsRolesControl(event.target.value)} value="mage" />
                            <label htmlFor="magesFilter">
                                <span>MAGOS</span>
                            </label>
                        </li>
                        <li className="findChamps__body__navbar__filters__lists__item">
                            <input type="radio" name="rols" id="tanksFilter" checked={championsRolesControlText === 'tank'} onChange={(event) => setChampionsRolesControl(event.target.value)} value="tank" />
                            <label htmlFor="tanksFilter">
                                <span>TANQUES</span>
                            </label>
                        </li>
                        <li className="findChamps__body__navbar__filters__lists__item">
                            <input type="radio" name="rols" id="marksmen" checked={championsRolesControlText === 'marksman'} onChange={(event) => setChampionsRolesControl(event.target.value)} value="marksman" />
                            <label htmlFor="marksmen">
                                <span>TIRADORES</span>
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="findChamps__body__navbar__levels">
                    <input
                        type="checkbox"
                        placeholder="TODAS LAS DIFICULTADES"
                        id="levels"
                        onBlur={() => blurDifficulty()}
                        onClick={() => setLevelControlCheck(!levelsControlCheck)}
                    />
                    {
                        difficultChamp === 0
                        ? <label htmlFor="levels">TODAS LAS DIFICULTADES </label>
                        : <label htmlFor="levels">DIFICULTAD: {difficultChamp}</label>
                    }

                    <div className="findChamps__body__navbar__levels__icons">
                        {
                            !levelsControlCheck
                            ? <i className="material-icons icon-asset">keyboard_arrow_down</i>
                            : <i className="material-icons icon-asset"> keyboard_arrow_up</i> 
                        }
                    </div>
                    <div className={`findChamps__body__navbar__levels__container ${levelsControlCheck && 'fadeIn'}`}>
                        {
                            difficulty.map((level, i) => (
                                <div 
                                    key={i}
                                    className={`findChamps__body__navbar__levels__container__group ${level === difficultChamp && 'bg-gray'}`}
                                    onClick={() => filterChampionByDifficulty(level)}
                                >
                                    {
                                        difficulty.map((item, j) => (
                                            <div 
                                                key={j}
                                                className={`
                                                    findChamps__body__navbar__levels__container__group__item 
                                                    ${j <= i && 'bg-blue'}`
                                                }
                                            >
                                            </div>
                                        ))
                                    }
                            </div>
                            ))
                        }
                    </div>

                </div>
            </div>

            {
                filters.length > 0 &&
                <div className="findChamps__body__chips">
                <div className="findChamps__body__chips__filters">
                    <h3 className="findChamps__body__chips__filters__title">Filtros:</h3>
                    <div className="findChamps__body__chips__filters__button">
                        <Button
                            text={filters.length <= 1 ? 'Limpiar filtro' : 'Limpiar filtros'}
                            size='btn--normal'
                            type='btn--secondary'
                            onClick={() => cleanFilters()}
                        />
                    </div>
                </div>
                {
                    filters.map((filter, i) => (
                        <div key={i} className="findChamps__body__chips__chip">
                            <span >{filter.field}: {filter.value}</span>
                            <i className="material-icons icon-asset" onClick={() => cleanChipFilter(filter.field)}>close</i>
                        </div>
                    ))
                }
            </div>
            }



            <div className="findChamps__body__cards">
                {
                championsCardsFiltered.length > 0 &&
                <div className="findChamps__body__cards__container">
                    {
                    championsCardsFiltered.map((championCard) => (
                        <div key={championCard.id} className="findChamps__body__cards__container__card">
                            <ChampionCardComponent championCard={championCard} />
                        </div>
                    ))
                    }  
                </div>
                }

                {
                championsCardsFiltered.length === 0 &&
                <div className="findChamps__body__cards__error">
                    <div className="findChamps__body__cards__error__title">
                        <h3>No hay campeones que cumplan con el criterio de filtro</h3>
                        <h4>Campeones que te puedan interesar:</h4>
                    </div>
                    {
                    randomchampionsCards.map((championCard) => (
                        <div key={championCard.id} className="findChamps__body__cards__error__card">
                        <ChampionCardComponent championCard={championCard} />
                        </div>
                    ))
                    }

                    <div className="findChamps__body__cards__error__button">
                        <Button
                        text="Más campeones"
                        size="btn--normal"
                        type="btn--primary"
                        onClick={ () => setRandomchampionsCards(pushingRandomChampions(championsCards)) }
                        />
                    </div>
                </div>
                }
            </div>
        </div>
  </section>
  )
}

export default ChampionsView;

const randomChampions = (arrayLength: number): number => {
    return Math.floor(Math.random() * arrayLength);
};

const pushingRandomChampions = (championsCards: ChampionCard[]): ChampionCard[] => {
    let randomchampionsCards = [];
    for(let i = 0; i < 4; i++) {
      let number = randomChampions(championsCards.length)
      randomchampionsCards.push(championsCards[number]);
    }
    return randomchampionsCards;
};