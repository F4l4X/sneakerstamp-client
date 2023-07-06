import React from "react";

const Cgu = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-white text-2xl font-bold mb-8">
        Conditions générales d'utilisation
      </h1>

      <div className="bg-white rounded-lg p-8 max-w-lg">
        <p>Date d'entrée en vigueur : 06-07-2023</p>

        <p>
          Les présentes conditions générales d'utilisation (ci-après dénommées
          les "CGU") régissent votre utilisation du service d'authentification
          de paires de chaussures basé sur la blockchain, proposé par
          SneakerStamp (ci-après dénommé "nous", "notre" ou "nos"). En utilisant
          notre service, vous acceptez d'être lié par ces CGU. Veuillez les lire
          attentivement avant d'utiliser notre site Web ou tout autre service
          que nous proposons.
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2">
          1. Acceptation des conditions d'utilisation
        </h2>
        <p>
          En utilisant notre service, vous déclarez avoir lu, compris et accepté
          les présentes CGU. Si vous n'acceptez pas ces CGU, vous ne devez pas
          utiliser notre service.
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2">
          2. Description du service
        </h2>
        <p>
          Notre service consiste à permettre aux utilisateurs de vérifier
          l'authenticité des paires de chaussures en scannant un code QR unique
          associé à chaque paire. Ce code QR contient des informations qui
          seront enregistrées sur une blockchain pour garantir l'authenticité
          des chaussures.
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2">
          3. Propriété intellectuelle
        </h2>
        <p>
          Tous les droits de propriété intellectuelle liés à notre service, y
          compris les droits d'auteur, les marques commerciales et les droits de
          propriété intellectuelle sur la blockchain utilisée, sont la propriété
          exclusive de SneakerStamp. Vous vous engagez à ne pas copier,
          reproduire, distribuer, publier, afficher, modifier ou exploiter de
          quelque manière que ce soit notre service sans notre autorisation
          écrite préalable.
        </p>

        {/* Reste du contenu des CGU ... */}
      </div>
    </div>
  );
};

export default Cgu;
