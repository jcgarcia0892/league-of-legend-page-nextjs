'use client';
import React, { useEffect, useRef, useState } from 'react'
import './rules.scss';
import { Button } from '../components/button/Button'
import { randomNumber, videoPaths } from '../data/video';
import { rules, Rule } from '../data/rules';
import { power } from '../data/powerInfo';
import TitleAnimated from '../components/title-animated/Title-animated';



const Rules = () => {
  const [ videoPath ] = useState(`/videos/${videoPaths[randomNumber()]}.mp4`);
  const [ videoPowerPostion, setVideoPowerPostion ] = useState(0);
  const [ videoPowerPath, setVideoPowerPath] = useState('/images/get-gold.webm');
  const [ scollInY, setScollInY ] = useState<number>(0);
  const [ rulesInfo, setRulesInfo ] = useState(rules);
  const [ powerInfo, setPowerInfo ] = useState(power);
  const rulesElementRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoGetGoldRef = useRef<HTMLVideoElement>(null);
  const videoGetExpRef = useRef<HTMLVideoElement>(null);
  const scrollToRules = (): void => {
    window.scrollTo({
      top: scollInY,
      behavior: 'smooth'
    });
  };

  const translatePage = (pageNumber: number): number => {
    return (pageNumber - 1) * 100 * -1;
  }
  
  const changeItemList = (subtitle: string, action: string, currentPageNumber: number): void => {
    let index = rulesInfo.findIndex((rule) => rule.header.subtitle === subtitle);
    if(action === 'prev') {
      if(currentPageNumber <= 1) {
        currentPageNumber = 1;
      } else {
        currentPageNumber--;
      }
    } else {
      if(currentPageNumber >= rulesInfo[index].card.list.length) {
        currentPageNumber = rulesInfo[index].card.list.length;
      } else {
        currentPageNumber++
      }
    };
    setRulesInfo(() => {
      return rulesInfo.map((rule, i) => {
        if(index === i) {
          return {
            ...rule,
            card: {
              ...rule.card,
              currentPageNumber,
              translate: translatePage(currentPageNumber),
            }
          }
        }
        return rule;
      })
    });
  };




  const showSelectedPower = (title: string, videoPosition: number): void => {
    setVideoPowerPostion(videoPosition);
    let index = powerInfo.findIndex((power: any) => power.title === title);
    setPowerInfo((powerInfo) => {
      return powerInfo.map((power, i) => {
        if(power.title === title) {
          return {...power, title, isShown: true}
        }
        return {...power, isShown: false}
      });
    })
    setVideoPowerPath(powerInfo[index].videoPath);
  }

  const translateX = (): number => {
    return videoPowerPostion * 100 * -1;
  }

  useEffect(() => {
    setScollInY(rulesElementRef.current?.offsetTop || 0)
    if(!videoGetExpRef.current || !videoGetGoldRef.current) return;
    videoGetExpRef.current.muted = true;
    videoGetGoldRef.current.muted = true;
    videoGetExpRef.current.play().catch(() => {return;})
    videoGetGoldRef.current.play().catch(() => {return;})
  }, []);

  useEffect(() => {
    if(!videoRef.current) return;
    videoRef.current.src = videoPath;
    videoRef.current.muted = true;
    videoRef.current.play().catch(() => {return;})

  }, [videoPath]);

  return (
    <>
      {/* RULES SCREEN */}
      <main className="main">
          <video ref={videoRef} loop>
              <source type="video/mp4" />
          </video>
          <div className="main__center">
              <h2>BIENVENIDO A LA GRIETA DEL INVOCADOR</h2>
              <h1>APRENDE LO BÁSICO PARA JUGAR</h1>
              <div className="main__center__button">
                  <Button
                      text="EMPEZAR EL RECORRIDO"
                      size="btn--normal"
                      type="btn--primary"
                      onClick={scrollToRules} />
              </div>
          </div>
      </main>
      {/*END RULES SCREEN*/}
      <section className="rules" ref={rulesElementRef}>
        <div className="rules__container">
          <div className="rules__container__left">
              {
                rulesInfo.map((rule, ruleIndex) => (
                  <div key={ruleIndex} className="rules__container__left__item">
                    <div className="rules__container__left__item__header">
                        <h5>{rule.header.subtitle}</h5>
                        <h2>{rule.header.title}</h2>
                        {
                          rule.header.descriptions.map((description) => (<p key={description}>{description}</p>))
                        }
                    </div>
                    <div className="rules__container__left__item__card">
                      <p className="rules__container__left__item__card__page">{rule.card.currentPageNumber}/{rule.card.list.length}</p>
                      <ul>
                          {
                            rule.card.list.map((item) => (
                              <li key={item.title} style={{transform: 'translateX(' + rule.card.translate + '%)'}}>
                                <h5>{item.title}</h5>
                                <p className="rules__container__left__item__card__text">{item.description}</p>
                            </li>
                            ))
                          }
                      </ul>
                      <div className="rules__container__left__item__card__buttons">
                          <div>
                              <Button
                              icon="arrow_back_ios"
                              size="btn--small"
                              type="btn--secondary"
                              border="btn-no--border"
                              onClick={() => changeItemList(rule.header.subtitle, 'prev', rule.card.currentPageNumber)} />
                          </div>

                          <div>
                              <Button
                              icon="arrow_forward_ios"
                              size="btn--small"
                              type="btn--secondary"
                              border="btn-no--border"
                              onClick={() => changeItemList(rule.header.subtitle, 'next', rule.card.currentPageNumber)} />
                          </div>
                      </div>
                    </div>
                  </div>
                ))
              }
          </div>
        </div>
      </section>

      <section className="power">
        <div className="power__header" >
          <TitleAnimated>
            <h1>DALE MÁS PODER A TU CAMPEÓN</h1>
            <p>Los campeones se fortalecen al obtener experiencia para subir de nivel y oro para comprar más objetos poderosos conforme avanza la partida. Es crucial dominar estos dos factores para superar al equipo enemigo y destruir su base.</p>
          </TitleAnimated>
        </div>

        <div className="power__body">
          <div className="power__body__left">
              <video ref={videoGetExpRef} src="/images/get-exp.webm" loop style={{transform: `translateX(${translateX()}%)`}}></video>
              <video ref={videoGetGoldRef} loop src="/images/get-gold.webm" style={{transform: `translateX(${translateX()}%)`}}></video>
              <img src="/images/shop.jpg" style={{transform: `translateX(${translateX()}%)`}}/>
          </div>

          <div className="power__body__right">
            <div>
              {
                powerInfo.map((power) => (
                  <div key={power.title} className="power__body__right__info">
                    <div className="power__body__right__info__icon">
                      {
                        !power.isShown
                        ? <i className="material-icons" onClick={() => showSelectedPower(power.title, power.videoPosition)}>add</i>
                        : <i className="material-icons">remove</i>
                      }
                    </div>
                    <div className="power__body__right__info__texto">
                        <h5 onClick={() => showSelectedPower(power.title, power.videoPosition)}>{power.title}</h5>
                        <p className={power.isShown ? 'max-height' : ''}> {power.description} </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Rules