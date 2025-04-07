const AboutPage = () => {
    return (
        <div className="relative w-full h-full flex-grow">
            <div className="absolute inset-0 bg-mountain bg-cover bg-bottom bg-no-repeat"></div>
            <div className="absolute inset-0 bg-white opacity-80"></div>
            <div className="relative z-10 flex flex-col p-8">
                <h1 className="text-3xl font-bold mb-4 md:mb-6 xl:mb-8 text-center">
                    About
                </h1>
                <div className="flex flex-col gap-6">
                    <p>
                        Ce chat est dédié aux questions sur les montagnes du
                        monde. Il utilise un dataset des sommets existants,
                        leurs altitudes et leurs localisations.
                    </p>
                    <p>
                        Ollama est utilisé pour gérer le modèle Gemma 2, le RAG
                        améliore les réponses en utilisant ChromaDB comme base
                        de données vectorielle et Sentence Transformers pour
                        générer les embeddings.
                    </p>
                    <div className="flex flex-col gap-3">
                        <p>
                            Il est possible de déterminer un certain nombre
                            d'options en cliquant sur le bouton réglages :
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                L'option RAG permet d'utiliser les données
                                obtenues depuis le dataset et d'enrichir la
                                requete avec. Dans le cas contraire les requetes
                                sont directement effectuées vers le modèle sans
                                utilisations des données apportées.
                            </li>
                            <li>
                                Le nombre max de tokens limite le nombre
                                d'éléments récupérés depuis la base vectorielle.
                                Une valeur plus élevée permet des réponses plus
                                détaillées mais augmente le temps de traitement.
                            </li>
                            <li>
                                La température contrôle la créativité du modèle.
                                Une valeur basse produit des réponses plus
                                prévisibles, tandis qu'une valeur haute favorise
                                la diversité et l'originalité.
                            </li>
                        </ul>
                    </div>
                    <p>
                        Au premier chargement l'API est contactée pour mettre en
                        route le container et obtenir un compte rendu de l'état
                        de l'application. Cet appel peut prendre plusieurs
                        minutes.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
