import React, { useEffect } from "react";
import axios from "axios";
import { useParms, Link, useHistory } from "react-router-dom";

const RickAndMorthy = () => {
  const history = useHistory();
  const { page } = useParms();
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(({ results }) => setCharactersAPI(results || []));
  }, [page, setCharacters]);
};
