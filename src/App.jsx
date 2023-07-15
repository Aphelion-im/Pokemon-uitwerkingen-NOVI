import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './components/pokemon/Pokemon';
import Button from './components/button/Button';
import logo from './assets/logo.png';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  // 1 endpoint geeft 1 pokemon
  // Props: App geeft de hier gedefineerde endpoint state/variabele door aan Pokemon.jsx dmv een props
  // Omdat App.jsx hier de states beheert
// Wat betreft het gebruik van endpoint useState variabele:
// EdHub React H7.5: "De update cycle! In ons geval is de dependency onze state variabele location: 
// we willen immers dat de data alleen wordt opgehaald wanneer de gebruiker naar een locatie zoekt. 
// En op het moment dat deze locatie veranderd is 
// ( van een lege string naar 'utrecht' of van 'utrecht' naar 'amsterdam'), 
// dán moet de de fetchData() functie aangeroepen worden. "

  const [endpoint, setEndpoint] = useState(
    'https://pokeapi.co/api/v2/pokemon/'
  );
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      toggleLoading(true);
      setError(false);

      try {
        const { data } = await axios.get(endpoint);
        // 2 fetch stromen:
        // App.jsx: haalt alle pokemons op.
        // Pokemon.jsx haalt 1 pokemon op van de endpoint, het uiterlijk, de attributen.
        // Daarna injecteert Pokemon.jsx het uiterlijk in App.jsx.
        setPokemons(data);
        // Geeft alle pokemons, met extra functies zoals prev/nect
        console.log('App.jsx Data object', data);
        // Geeft 1281 pokemons
        console.log('Data van App.jsx - Count', data.count);
        // Geeft een url met de volgende 20 pokemons
        console.log('Data van App.jsx - data.next', data.next);
        // Geeft null, want dit is de eerste pagina
        console.log('Data van App.jsx - data.previous', data.previous);
        console.log(
          'Data van App.jsx - data.results[0].url',
          data.results[0].url
        );
      } catch (e) {
        console.error(e);
        setError(true);
      }

      toggleLoading(false);

      // Geen clean functie?
    }

    // Waarschijnlijk geen useEffect nodig in FOUNDFAVE op de sign-in-register pagina
    // omdat de knoppen daar een fetch triggeren en in dit bestand is het de useEffect tijdens mount
    fetchData();

    // Waarschijnlijk endpoint als state gezet ipv een normale variabele om deze
    // te kunnen gebruiken als useEffect dependency
  }, [endpoint]);

  return (
    <div className="poke-deck">
      {pokemons && (
        <>
          <img alt="logo" width="400px" src={logo} />
          <section className="button-bar">
            <Button
              // Als pokemons.previous = null, schakel dan de button uit.
              disabled={!pokemons.previous}
              clickHandler={() => setEndpoint(pokemons.previous)}
            >
              Vorige
            </Button>
            <Button
              disabled={!pokemons.next}
              clickHandler={() => setEndpoint(pokemons.next)}
            >
              Volgende
            </Button>
          </section>

          {pokemons.results &&
            // Elke map() moet in React een return hebben en een key.
            pokemons.results.map((pokemon) => {
              // pokemons is state met daarin alle pokemons
              // pokemon = pokemons[x].
              // props.endpoint dan 2-ledig:
              // props.endpoint geeft de Axios.url door vanuit state van App -> Pokemon
              // Geeft endpoint={pokemon.url} hier de instructie om enkele pokemons op te halen?
              // PROPS, lijken:
              // 1) State door te geven aan andere componenten
              // 2) Instructies te geven via de child component <Pokemon />
              // 3) Functies doorgeven
              // 4) Variabelen doorgeven. Props lijken geavanceerde variabelen
              return <Pokemon key={pokemon.name} endpoint={pokemon.url} />;
            })}
        </>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Er ging iets mis bij het ophalen van de data...</p>}
    </div>
  );
}

export default App;
