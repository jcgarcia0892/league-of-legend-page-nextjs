'use client';
import React, { FC, useState, useRef, useEffect } from 'react'
import './champion.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Champion, Skill } from '@/app/interfaces/champion.interface';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

interface Props {
    champion: Champion;
}

const ChampionView: FC<Props> = ({champion}) => {
    const [ championData, setChampionData ] = useState<Champion>(champion);
    const [ skillControl, setSkillControl ] = useState<string>(champion.skills[0].name);
    const skillHtmlRef = useRef<HTMLDivElement>(null);

    const showSkills = (skillName: string): void => {
        let index = championData.skills.findIndex((skill: Skill) => skill.name === skillName);
        const skills = championData.skills.map((skill) => {
            skill.checked = skillName === skill.name ? true : false;
            return skill;
        });
        setChampionData({...championData, skills});
        skillHtmlRef.current!.innerHTML = showSkillSelectedHTML(index);
    }

    useEffect(() => {
        showSkills(skillControl);
    }, [skillControl]);

    const showSkillSelectedHTML = (index: number): string => {
        return `
            <p class="champion__skills__container__description__skill">${championData.skills[index].key}</p>
            <h4>${championData.skills[index].name}</h4>
            <p class="champion__skills__container__description__text">${championData.skills[index].description}</p>
        `;
      }
    return (
        <section className="champion">
            <div className="champion__main">
                <img className="champion__main__blur" src={championData.imgSplash} alt="" />
                <div className="champion__main__presentation">
                    <img className="" src={championData.imgSplash} alt="" />
                    <div className="champion__main__presentation__text">
                        <h1>{ championData?.name }</h1>
                        <h2>{ championData?.title }</h2>
                    </div>
                </div>
            </div>

            <div className="champion__description">
                <div className="champion__description__header">
                    <div className="champion__description__header__img">
                        <img src={championData?.imgSquare} alt="" />
                    </div>
                </div>
                <div className="champion__description__body">
                    <div className="champion__description__body__text">
                        <h2>INFORMACIÓN</h2>
                        <div className="champion__description__body__text__chips">
                            <h4>TIPO DE CAMPEÓN</h4>
                            <div className="champion__description__body__text__chips__container">

                                {
                                    championData.rolArray.map((rol, i) => (
                                        <div key={i} className="champion__description__body__text__chips__container__chip">
                                            <span>{ rol }</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="champion__description__body__text__history">
                            <h4>HISTORIA</h4>
                            <p>{ championData?.lore }</p>
                        </div>

                        <div className="champion__description__body__text__allyTips">
                            <h4>TIPS PARA USAR EL CAMPEÓN</h4>
                            {
                                championData.allytips.map((tip, i) => (
                                    <p key={i}>{ tip }</p>
                                ))
                            }
                            {championData.allytips.length === 0 && (
                                <p>
                                Nuestro expertos están trabajando para brindarte los mejor tips
                                cuando usas a este campeón en partida.
                                </p>
                            )}
                        </div>

                        <div className="champion__description__body__text__enemyTips">
                            <h4>TIPS PARA DERROTAR EL CAMPEÓN</h4>
                            {
                                championData.enemytips.map((tip, i) => (
                                    <p key={i}>{ tip }</p>
                                ))
                            }
                            {championData.enemytips.length === 0 && (
                                <p>
                                    Nuestro expertos están trabajando para brindarte los mejor tips
                                    cuando estas en contra de este campeón en partida.
                                </p>
                            )}

                        </div>
                    </div>
                    <div className="champion__description__body__img">
                        <img src={championData?.imgLoading} alt="" />
                    </div>
                </div>
            </div>

            <div className="champion__skills">
                <div className="champion__skills__container">
                    <div className="champion__skills__container__imgs">
                        <h2>HABILIDADES</h2>
                        <div className="champion__skills__container__imgs__assets">
                            {
                                championData.skills.map((skill, i) => (
                                    <div key={i}>
                                        <input
                                            type="radio"
                                            name="championSkills"
                                            onChange={(event) => setSkillControl(event.target.value)}
                                            checked={skill.name === skillControl}
                                            id={skill.name}
                                            value={skill.name}
                                        />
                                        <label htmlFor={skill.name}>
                                            <img
                                                className="champion__skills__container__imgs__assets__img"
                                                src={skill?.img}
                                                alt=""
                                            />
                                        </label>
                                        <img
                                            className={`champion__skills__container__imgs__assets__selector ${skill.checked && 'op-1'}`}
                                            src="/images/skills-selector.svg"
                                            alt=""
                                        />
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    <div className="champion__skills__container__logo">
                        <img src="/images/skills-symbol.svg" alt="" />
                    </div>
                    <div className="champion__skills__container__description">
                        <div ref={skillHtmlRef}></div>
                    </div>
                </div>
            </div>

            <div className="champion__skins">
                <div className="champion__skins__title">
                    <h2>ASPECTOS DISPONIBLES</h2>
                </div>
                <div className="champion__skins__thumbs">
                    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                        {
                            championData.skins.map((skin, i) => (
                                <SwiperSlide key={i}>
                                    <div className="champion__skins__thumbs__container">
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`} />
                                        <div className="champion__skins__thumbs__container__title">
                                        <h4>{(skin.name === 'default') ? champion.name : skin.name}</h4>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default ChampionView