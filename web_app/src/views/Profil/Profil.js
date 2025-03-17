import React, { useEffect, useState, useRef } from 'react';
import "./Profil.css";
import Wave from "../../components/Wave/Wave"

import IAServices from "../../services/IAServices"

import Button from "../../components/UI/Button/Button";
import ResultNameGif from "../../images/ResultNameGif.gif"
import PinsFlower1 from "../../images/PinsFlower1.png"
import PinsSword1 from "../../images/PinsSword1.png"
import ReadingGifSaisie from "../../images/ReadingGifSaisie.gif"
import WritingGifSaisie from "../../images/WritingGifSaisie.gif" 
function Profil() {

    const { predict } = IAServices
    const refEnd = useRef() // juste pour le scroll
    const [inputResearch, setInputResearch] = useState("")
    const [resResearch, setResResearch] = useState("")
    const [isOpenTechnicalPart, setIsOpenTechnicalPart] = useState("")
    const onSubmit = async () => {
        let result = "";
        if (inputResearch != "") {
            result = await predict({
                txt: inputResearch
            })
            let data = {}

            data.main_type = Object.entries(result.main_type).map(([key, value]) => ({
                name: key,
                score: value
            })).sort((a, b) => b.score - a.score);

            data.sub_type = Object.entries(result.sub_type).map(([key, value]) => ({
                name: key,
                score: value
            })).sort((a, b) => b.score - a.score);

            setResResearch(data)
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


    const models = ["Random Forest", "SVM", "Logistic Regression", "Naive Bayes"]
    const resultsMainVect = ["66%", "68%", "69%", "69%"]
    const resultsMainTfidf = ["59%", "68%", "68%", "69%"]

    const resultsSubVect = ["55%", "58%", "60%", "61%"]
    const resultsSubTfidf = ["52%", "59%", "60%", "61%"]

    const arrayResult = (results, title) => {
        const resultsWithModels = models.map((model, index) => ({
            model,
            score: results[index],
            scoreNum: parseFloat(results[index].replace('%', '')),
        }));

        const sortedResults = resultsWithModels.sort((a, b) => b.scoreNum - a.scoreNum);
        return <table border="1" style={{ marginRight: "40px" }}><thead><tr><th>{title}</th><th>Score</th></tr></thead><tbody>{sortedResults.map((item, index) => (<tr key={index}><td>{item.model}</td> <td>{item.score}</td></tr>))}</tbody>  </table>

    }

    return (
        <div className="main_container">
            <div className="main_title_profil">
                <h1>Un Nom, une Histoire </h1>
            </div>
            <br></br><br></br>

            <Wave text={"Cherchons ensemble !"}></Wave>
            <form className="form_search" onSubmit={(e) => { handleKeyDown(e, true) }}>

                <br></br>
                <div className="form_container">
                    <div className="row">
                        <div className="col-25">
                            <label>Une idée de nom ? Saisissez la !</label>
                        </div>
                        <div className="col-75" style={{ marginBottom: "25px" }}>
                            <div className="list_checkbox_container">
                                <input type="text" onChange={(e) => setInputResearch(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                    {resResearch &&
                        <div className="container_result_profil">
                            <table border="1" style={{ marginRight: "40px" }}>
                                <thead>
                                    <tr>
                                        <th>Type de divinité</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resResearch.main_type.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{parseFloat((item.score * 100).toFixed(2))}% </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <table border="1" className="border_profil_result">
                                <thead>
                                    <tr>
                                        <th>Catégorie de divinité</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resResearch.sub_type.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{parseFloat((item.score * 100).toFixed(2))}% </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <img src={ResultNameGif}></img>

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

                    <h3>📦 Explications 📦 : </h3>
                    <p>
                        Pour commencer l'étude, nous avons utilisé un modèle Random Forest. <br />
                        Il a permis un bon point de départ avec 66% de prédiction. <br />
                        Cependant, il faut toujours en tester plusieurs afin de comparer les résultats. <br />
                        Trois modèles adaptés au contexte (peu de données textuelles, 1 valeur de retour) ont été choisis :
                    </p>
                    <ul>
                        <li>Logistic Regression - pratique dans le cas où l'on cherche à obtenir une seule valeur</li>
                        <li>SVM - pratique dans le cas où il y a peu de données</li>
                        <li>Naive Bayes - pratique pour les données catégoriques</li>
                    </ul>
                    <p>
                        Ensuite, puisque nous utilisons des données textuelles, il faut également prendre en compte le vectoriseur. <br />
                        Ce dernier permet de transcrire une valeur textuelle en valeur numérique, compréhensible par les modèles. <br />
                        Sans lui, nous ne pourrions pas utiliser les modèles cités précédemment.
                    </p>
                    <p>
                        Pour cela, nous allons chercher à utiliser les vectoriseurs suivants :
                    </p>
                    <ul>
                        <li>Count Vectorizer - efficace pour compter le nombre de syllabes différentes</li>
                        <li>TfIdf - efficace pour trouver les syllabes plus importantes/lourdes</li>
                    </ul>
                    <p>
                        Dans notre cas, on ne cherche pas à analyser des phrases avec un sens, mais un nom avec quelques syllabes. <br />
                        Théoriquement, on peut s'attendre à ce que le CountVectorizer fonctionne mieux.
                    </p>
                    <p>
                        Maintenant, voici les résultats pour chaque modèle avec les deux vectoriseurs :
                    </p>
                    <div className="container_result_profil">
                        {arrayResult(resultsMainVect, "Count Vectorizer")}
                        {arrayResult(resultsMainTfidf, "TfIdf")}
                    </div>
                    <img className="picture_profil_result_etude"style={{ top : "20px", right:"15px"}} src={WritingGifSaisie}></img>
                    <img className="picture_profil_result_etude"style={{ bottom : "20px", right:"15px"}} src={ReadingGifSaisie}></img>
                    <p>
                        Les meilleurs modèles pour obtenir le type de divinité selon le nom sont la Régression Logistique et Naive Bayes, avec le CountVectorizer.
                    </p>

                    <p>
                        Concernant la catégorie de divinité, nous faisons exactement la même démarche et constatons quelques différences :
                    </p>
                    <div className="container_result_profil">
                        {arrayResult(resultsSubVect, "Count Vectorizer")}
                        {arrayResult(resultsSubTfidf, "TfIdf")}
                    </div>

                    <p>
                        Les résultats sont moins bons d'environ 10% en moyenne.
                    </p>

                    <p>
                        Le meilleur modèle reste Naive Bayes, qu'il soit utilisé avec le CountVectorizer ou TfIdf.
                    </p>

                    <p>
                        Enfin, pour les hyperparamètres, plusieurs ont été testés à différentes échelles.  <br />
                        Aucun résultat n'a été probant : soit ils étaient similaires, soit moins bons. <br />
                        Ainsi, il n'y a, malheureusement, rien à en tirer.
                    </p>


                </div>
            }
        </div >
    );
};

export default Profil;