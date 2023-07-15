import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokemon.css';

function Pokemon({ endpoint }) {
  // 1 pokemon in an object.
  // Multiple pokemon objects in an array
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    // endpoint geeft hier een individuele pokemon url/endpoint
    // Deze instructie komt waarschijnlijk vanaf <Pokemon endpoint={pokemon.url} />
    // console.log('Endpoint props: ', endpoint);

    async function fetchData() {
      try {
        // Duidelijk hier dat props.endpoint is doorgegeven van App naar Pokemon
        const { data } = await axios.get(endpoint);
        // Data object in state stoppen. pokemon state lijkt niet op data object.
        setPokemon(data);
        console.log('Pokemon.jsx Data object', data);
      } catch (e) {
        console.error(e);
      }
    }

    // Verklaring EdHub React H7.5:
    /*
    Op dit moment wordt de fetchData-functie echter ook aangeroepen in de initialisatie-fase. 
    Wanneer de state variabele location van "niet bestaand" naar een lege string '' wordt veranderd 
    bij het aanmaken van de state, zal de useEffect-hook ook getriggerd worden. 
    We hebben daarom een extra check nodig.

    Plaats een if-statement om de aanroep van de fetchData functie heen, die checkt of location wel 
    een truthy waarde (een gevulde string) bevat!
    */
    // 2. we roepen de functie aan als endpoint is veranderd,
    // maar niet als het een null/undefined/lege string is
    if (endpoint) {
      fetchData();
    }

    // Geen clean functie?

    // Waarschijnlijk endpoint als state gezet ipv een normale variabele om deze
    // te kunnen gebruiken als useEffect dependency
  }, [endpoint]);

  return (
    <section className="poke-card">
      {Object.keys(pokemon).length > 0 && (
        <>
          <h2>{pokemon.name}</h2>
          <img alt="Afbeelding pokémon" src={pokemon.sprites.front_default} />
          <p>
            <strong>Moves: </strong>
            {pokemon.moves.length}
          </p>
          <p>
            <strong>Weight: </strong>
            {pokemon.weight}
          </p>
          <p>
            <strong>Abilities: </strong>
          </p>
          <ul>
            {pokemon.abilities.map((ability) => {
              return (
                // To make the key more unique, because abilities are not unique
                // Renders the abilities, not the main Pokemon, like in App.jsx
                <li key={`${ability.ability.name}-${pokemon.name}`}>
                  {ability.ability.name}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}

export default Pokemon;
