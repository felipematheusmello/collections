import React, { useState } from "react";
import RickAndMorty from "./components/characters/rickAndMorthy";
function App() {
  const [rickAndMorty, setRickAndMorty] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  return (
    <div>
      Oi
      <RickAndMorty />
    </div>
  );
}

export default App;
