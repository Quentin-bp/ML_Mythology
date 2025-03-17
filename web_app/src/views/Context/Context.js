import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Context.css";

import PinsFlower1 from "../../images/PinsFlower1.png"
import PinsSword1 from "../../images/PinsSword1.png"
import Mathis from "../../images/Kinavar.png"
import ProportionDivinity from "../../images/graphs/ProportionDivinity.png"
import ProportionSubDivinity from "../../images/graphs/ProportionSubDivinity.png"
import DatasetStructure from "../../images/graphs/DatasetStructure.png"
import Tokens from "../../images/graphs/Tokens.png"
import Names from "../../images/graphs/Names.png"
import HideGif from "../../images/hide-sherlock.gif"

import Wave from "../../components/Wave/Wave"
import Modal from "../../components/Modal/Modal"
import FontTextBackground from "../../components/FontTextBackground/FontTextBackground"
import FontBookBackground from "../../components/FontBookBackground/FontBookBackground"
import Button from '../../components/UI/Button/Button';
import Image from "../../components/UI/Image/Image"

function Context() {
    const navigate = useNavigate();
    const [isOpenExample1, setIsOpenExample1] = useState(false);
    const [isOpenData, setIsOpenData] = useState(false);
    //const [isOpenProblem, setIsOpenProblem] = useState(false);
    const [isOpenNames, setIsOpenNames] = useState(false);
    const [isOpenTokens, setIsOpenTokens] = useState(false);
    const [isOpenTechnicalPart, setisOpenTechnicalPart] = useState(false);
    const [isOpenSpoil, setisOpenSpoil] = useState(false);
    return (
        <div className="main_container">
            <div className="main_title_context">
                <h1>Il était une fois... </h1>
            </div>
            <br></br><br></br>
            <div className="paragraphe">
                <img src={PinsSword1} className="img-top-left" />
                Pour la création de personnages dans les histoires de jeux, de romans, de films...<br></br>
                Les noms permettent d’apporter un premier aperçu d’une entité ou de la définir.
                <img src={PinsFlower1} className="img-bottom-right" />
            </div>
            <Wave
                text={"Pour beaucoup d’auteurs de romans, les noms sont la première problématique rencontrée pour leurs personnages. \nParfois même, un simple nom est lié à des métaphores complexes."}
                description_modal="Exemple"
                onClick={() => setIsOpenExample1(true)}
            ></Wave>
            {isOpenExample1 && <Modal setIsOpen={setIsOpenExample1} title={"Un nom au service de l'Histoire"} img={Mathis} legend={<span>Par exemple : un personnage principal appelé "Mathis", dans un monde fantaisiste, ne fait pas grand sens tant c'est un nom normal. Maintenant, avec quelques recherches, nous comprenons que <span style={{ fontWeight: "bold" }}>Mathis = "Don de Dieu". </span></span>} />}
            <FontTextBackground main={"Chaque nom a un sens !"} description={"Il est rare que des auteurs donnent des noms à leurs personnages sans arrière-pensée. Ce projet aura ainsi pour but d’apporter un sens aux noms grâce à l’IA. \nPour nous aider, nous utiliserons l’onomastique afin d’appliquer et de comprendre le contexte."} />
            <div className="paragraphe">
                <img src={PinsSword1} className="img-top-left" />
                🙋‍♀️ : <span style={{ fontWeight: "bold" }}> L'onomastique </span>est l'étude des noms propres : comment ils ont été formés, comment ils sont utilisés, quelle est leur étymologie...<br></br>
                C'est la conversion d'un simple nom en un sens.<br></br>
                Il s'agit d'une discipline scientifique "officielle" datant du <span style={{ fontWeight: "bold" }}> 19ème siècle</span>, bien que, concrètement, ce soit une thématique remontant aux textes bibliques.
                <img src={PinsFlower1} className="img-bottom-right" />
            </div>
            <Wave
                text={"Pour être efficace et avoir du sens, il faut donc utiliser des noms qui sont régulièrement utilisés dans différents contextes.\n\
                Nous nous baserons ainsi sur les noms de la mythologie grecque.\n\
                Les autres mythologies, comme la mythologie nordique ou celles d’Asie, sont également envisageables.\n\
                Pour rester clairs, nous utiliserons la mythologie grecque, que la plupart des gens connaissent."}
            ></Wave>

            <div className="paragraphe" style={{ textAlign: "left" }}>
                <img src={PinsSword1} className="img-top-left" />
                <img src={PinsFlower1} className="img-bottom-right" />
                <p>Avant de parler d'IA, il faut d'abord commencer par récupérer les données.</p>

                <p>Il existe de nombreux moyens, mais nous utiliserons le <strong>scraping</strong> sur Wikipédia pour ça.</p>

                <p>Cela présente deux avantages majeurs :</p>
                <ul>
                    <li>Les données sont <em>généralement</em> bien structurées.</li>
                    <li>Les données des autres mythologies sont centralisées au même endroit.</li>
                </ul>

                <p>Dans le cas où nous voudrions étendre le projet un jour, cette approche est plus qu'intéressante.</p>
            </div>

            <div className="title_context click-me" onClick={() => setisOpenTechnicalPart(!isOpenTechnicalPart)}>⚙️ Description technique ⚙️</div><br />

            {isOpenTechnicalPart &&
                <div className="paragraphe" style={{ textAlign: "left" }}>

                    <img src={PinsSword1} className="img-top-left" />
                    <img src={PinsFlower1} className="img-bottom-right" />

                    <h3>📦 Principe 📦 : </h3>
                    <p>
                        Puisque les données sont scrappées, nous partons du principe qu'elles ne seront pas toujours disponibles telles que nous les avons obtenues.
                        Par exemple :
                    </p>
                    <ul>
                        <li>Suppression du site scrappé</li>
                        <li>Modifications de la structure/HTML du site</li>
                        <li>Changements dans les données elles-mêmes</li>
                    </ul>
                    <p>Il est donc <strong>impératif de les stocker correctement</strong>.</p>

                    <h3>⚙️ Stockage ⚙️  : </h3>
                    <ul>
                        <li><strong>Sur un serveur en ligne</strong> via <em>Supabase</em> </li>
                        <li><strong>En local</strong> via un fichier <em>Excel</em></li>
                    </ul>
                    <p>
                        Cela permet, en cas de problème technique en local (fichier corrompu, suppression accidentelle...),
                        que les données soient toujours accessibles en ligne.
                    </p>
                </div>
            }
            <Wave
                text={"Une fois les données obtenues, il faut travailler avec.\n\ Pour commencer, nous les analysons."}
                description_modal="Données récoltées"
                onClick={() => setIsOpenData(true)}
            ></Wave>
            <Image image={ProportionDivinity} legend={<span>On constate qu'il existe trois types de divinités : les Titans, les Dieux et les Personnifications.<br></br> Premier problème : il y a un trop grand nombre de dieux par rapport aux Titans et aux Personnifications.</span>} />
            <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
            <Image image={ProportionSubDivinity} legend={<span>On constate qu'il existe plusieurs sous-types de divinités.<br></br> Second problème : il y a un trop grand nombre de sous-types "dieu" par rapport aux autres catégories.</span>} />
            <br></br>  <br></br>
            {isOpenData && <Modal setIsOpen={setIsOpenData} title={"Un ciel jonché d'étoiles"} img={DatasetStructure} legend={<span>Le dataset comporte <strong>444 lignes.</strong><br></br>A noter : la seconde colonne correspond à du texte grec mal encodé.<br></br> C'est pour cela que nous n'arrivons pas à le lire, mais nous ne l'utiliserons pas par la suite.</span>} />}
            <Wave
                text={<span>Maintenant, avant de commencer la partie IA, nous constatons par avance un problème majeur : le nombre de données.<br></br>
                    Nous allons nous baser sur les noms, qui sont évidemment uniques, et au vu du nombre, ça ne sera pas viable.<br></br></span>}
            ></Wave>
            <div className="paragraphe">
                <img src={PinsSword1} className="img-top-left" />
                <img src={PinsFlower1} className="img-bottom-right" />
                Par contre, en analysant un peu les noms :
                <br></br>  <br></br>

                <div style={{ display: "flex", justifyContent: "center" }}> <Button onClick={() => setIsOpenNames(true)} label={"Noms"}></Button></div>
                <br></br>
                <div style={{ position: "relative" }}>
                    👇 Cliquer après avoir réfléchi à une déduction 👇
                    <div style={{ background: isOpenSpoil ? "unset" : "var(--dark)" }} className="spoil_section" onClick={() => setisOpenSpoil(!isOpenSpoil)}>
                        Les noms <strong>partagent certaines syllabes</strong>.<br></br>
                        On peut donc plus facilement les utiliser au détriment des noms eux-mêmes, afin d'obtenir des résultats plus probants qu’auparavant avec des noms uniques.
                    </div>
                    {!isOpenSpoil && <img className="hide_gif" src={HideGif} />}
                </div>

            </div>
            {isOpenNames && <Modal imgClass="names_picture_class" setIsOpen={setIsOpenNames} title={"Un simple nom pour tant de mythes"} img={Names} legend={<span>Que constatons-nous ?</span>} />}

            <Wave
                text={"On sait que dans l'onomastique, les noms sont des dérivés de mots.\n\
                    Utiliser les syllabes et non les noms entiers, n'est donc pas problématique pour le processus de création. \n\
                    On peut donc les utiliser au détriment du noms, sans perdre l'intérêt de base.\n\
                   Bien que ça ne soit pas une solution magique, nous pouvons fragmenter chaque noms par les syllabes qu'il comporte et faire non pas les traitements sur le nom entier, mais plutôt sur les syllabes."}
                description_modal="Données récoltées"
                onClick={() => setIsOpenTokens(true)}
            ></Wave>
            {isOpenTokens && <Modal imgClass="tokens_picture_class" setIsOpen={setIsOpenTokens} title={"Lorsque l'Unité ne suffit plus"} img={Tokens} legend={<span>A noter : Il existe <strong>1457</strong> tokens différents pour 444 noms.<br></br><strong>404</strong> parmis eux sont uniques.</span>} />}

            <FontBookBackground className="conclusion_context" main={"Nous pouvons désormais\n commencer à parler IA !"} />

        </div >
    );
};

export default Context;