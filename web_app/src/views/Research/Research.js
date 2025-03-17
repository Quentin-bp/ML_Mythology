import React, { useEffect, useState, useRef } from 'react';
import Loading from "../../components/UI/Loading/Loading"
import "./Research.css";
import Wave from "../../components/Wave/Wave"

import IAServices from "../../services/IAServices"

import Button from "../../components/UI/Button/Button";
import PinsFlower1 from "../../images/PinsFlower1.png"
import PinsSword1 from "../../images/PinsSword1.png"

import ResultPredictIa from "../../images/ResultPredictIa.gif"
import SadGif from "../../images/SadGif.gif"
import CuteWorking from "../../images/CuteWorking.gif"
import NotFoundGif from "../../images/NotFoundGif.gif"
function Research() {

    const { predictIa } = IAServices
    const refEnd = useRef() // juste pour le scroll
    const [inputResearch, setInputResearch] = useState("")
    const [resResearch, setResResearch] = useState("")
    const [isOpenTechnicalPart, setIsOpenTechnicalPart] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async () => {

        let result = "";
        if (inputResearch != "") {
            setIsLoading(true);
            result = await predictIa({
                txt: inputResearch
            })
            setIsLoading(false);
            if (result == "") {
                result = { error: "404" }
            }
            setResResearch(result)
        }
    }

    const handleKeyDown = (e, bool) => {

        e.preventDefault();
        if (e.key === 'Enter' || bool == true) {
            onSubmit();
            return;
        }
    }

    useEffect(() => {

        if (inputResearch == "") return;

        refEnd.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <div className="main_container">
            <div className="main_title_profil">
                <h1>Un équilibre entre Réalité et Idéal</h1>
            </div>
            <br></br><br></br>

            <Wave text={"Un trou de mémoire sur le nom d'une divinité mythologique grecque ? \nIl vous suffit de demander !"}></Wave>
            <form className="form_search" onSubmit={(e) => { handleKeyDown(e, true) }}>

                <br></br>
                <div className="form_container">
                    <div className="row">
                        <div className="col-25">
                            <label>Description du nom que vous cherchez</label>
                        </div>
                        <div className="col-75" style={{ marginBottom: "25px" }}>
                            <div className="list_checkbox_container">
                                <textarea type="text" style={{ width: "500px", height: "120px" }} onChange={(e) => setInputResearch(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                    {
                        isLoading &&
                        <div className="container_loading">
                            <Loading />
                        </div>
                    }
                    {resResearch && !resResearch.error &&
                        <div className="container_result_profil">
                            <div className="col-25">
                                <img src={ResultPredictIa}></img>
                            </div>
                            <div className="col-75" style={{ marginBottom: "25px" }}>
                                <span>   Le nom que vous cherchiez est : <strong style={{ fontSize: "30px" }}> {resResearch}</strong></span>
                            </div>
                        </div>
                     }
                     {resResearch && resResearch.error &&
                        <div className="container_result_profil">
                            <div className="col-25">
                                <img src={NotFoundGif}></img>
                            </div>
                            <div className="col-75" style={{ marginBottom: "25px" }}>
                                <span>L'IA n'a pas réussie a trouvé de correspondance avec la description donnée.</span>
                            </div>
                        </div>
                    }
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="row" style={{ paddingTop: "100px" }}>
                            <Button label="Voir le résultat" onClick={() => onSubmit()} />
                        </div>
                    </div>

                </div>
            </form >
            <br></br>
            < div ref={refEnd}></div>
            <div className="title_context click-me" onClick={() => setIsOpenTechnicalPart(!isOpenTechnicalPart)}>⚙️ Description technique ⚙️</div><br />

            {isOpenTechnicalPart &&
                <div className="paragraphe" style={{ textAlign: "left" }}>

                    <img src={PinsSword1} className="img-top-left" />
                    <img src={PinsFlower1} className="img-bottom-right" />

                    <h3>📦 Prévisions 📦 : </h3>
                    <p>
                        En premier lieu, il était prévu d'utiliser un modèle d'IA pour générer un nom à partir d'une description.
                        <br />
                        Pour ça, un modèle LSTM* (RNN* adapté aux longues séquences textuelles) a été conçu.<br />
                        Cela dit, étant donné la faible quantité de données, les résultats ne sont pas utilisables.
                    </p>
                    <p>
                        Ensuite, il était question de créer un modèle plus simple pour rechercher un nom en fonction d'une description. <br />
                        Mais encore une fois, le modèle ne pouvait pas généraliser avec un si petit dataset, comportant autant de différences.
                    </p>
                    <h3>👨‍💻 Application 👨‍💻 : </h3>
                    <p>
                        Puisque l'on a déjà développé un modèle pour la catégorisation d'un nom, et que les options sont restreintes, nous allons utiliser une IA déjà entraînée pour faire un petit moteur de recherche avec nos propres données.
                    </p>
                    <p>
                        Cela permet également de démontrer la différence entre les simples modèles que nous avons entraînés avec quelques centaines de lignes et de vrais modèles, entraînés avec des milliards de données.
                    </p>
                    <p>
                        Pour ce faire, nous allons utiliser une API très connue d'OpenAI.
                    </p>
                    <p>
                        L'installation n'est pas compliquée, mais il faut faire attention à deux choses importantes.
                        <ul>
                            <li>
                                <strong>La première</strong> est qu'il faut bien décrire le contexte avec les données que nous avons.
                                <br />
                                Nous avons un dataset, et nous ne voulons pas que l'IA sorte de son périmètre.
                            </li>
                            <li>
                                <strong>La deuxième</strong> est la consommation des ressources et/ou le "bruit".
                                <br />
                                Il ne faut pas envoyer à l'IA des informations inutiles (bruit), ni lui dire exactement quoi faire.
                                <br />
                                Il ne faut pas non plus ne rien lui dire, sinon le résultat sera impacté. Il faut donc trouver le juste milieu afin de cadrer le résultat attendu sans trop en dire.
                            </li>
                        </ul>
                    </p>
                    <p>
                        Dans notre cas, il suffit de lui fournir le dataset avec les colonnes pertinentes, à savoir les noms en anglais et les descriptions à comparer.
                        <br />
                        Les autres colonnes ne servent à rien et ne doivent donc pas être envoyées.
                    </p>
                    <p>
                        Il faut également indiquer à l'IA sa tâche principale, à savoir : comparer la description de l'utilisateur et retourner le nom qui lui semble le plus proche.
                    </p>
                    <p>
                        Une fois ces deux conditions prises en compte, il ne reste plus qu'à développer l'outil.
                    </p>
                    <br />
                    <p>
                        Lexique : <br />
                        <ul>
                            <li>
                                <strong>RNN - Réseau de neuronne récurrent : </strong> modèle d'apprentissage profond qui est formé pour traiter et convertir une entrée de données séquentielles en une sortie de données séquentielles spécifique <br />
                            </li>
                            <li>

                                <strong> LSTM - Long Short-Term Memory : </strong> type de réseau neuronal récurrent visant à atténuer le problème de gradient de disparition couramment rencontré par les RNN traditionnels
                            </li>
                            <span style={{ fontSize: "12px" }}>Source du lexique : Wikipédia </span>
                        </ul>


                    </p>
                    <img className="picture_profil_result_etude" style={{ top: "10px", right: "55px" }} src={SadGif}></img>
                    <img className="picture_profil_result_etude" style={{ bottom: "300px", right: "105px" }} src={CuteWorking}></img>


                </div>
            }
        </div >
    );
};

export default Research;