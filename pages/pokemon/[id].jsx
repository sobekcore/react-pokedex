import { useState, useEffect, useRef } from "react";
import { Storage, Handler } from "services/enums";
import { getPokemonById, getPageByPokemonName } from "services/api";
import { checkIfMobile } from "services/responsive";
import { saveStore } from "facades/store";
import { store } from "store/store";
import { ui } from "store/actions";
import styles from "styles/modules/PokemonPage.module.scss";

import InitializeHandler from "components/common/Handler";
import PokemonList from "components/PokemonList";
import Pokemon from "components/Pokemon";

/**
 * @param {import("types/Pokemon").Pokemon} props.pokemon
 * @returns {JSX.Element}
 */
const PokemonPage = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [isMobile, setMobile] = useState(false);
  const [isHandler, setHandler] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [page, setPage] = useState(null);

  const pokemonWrapperElement = useRef(null);
  const pokemonDetailsElement = useRef(null);
  const resizeHandlerElement = useRef(null);

  useEffect(() => {
    checkForMobileState(false);
    setPokemon(props.pokemon);
    setPageBasedOnConditions(props.pokemon.name);
    activateMovableHandler();
    setLoading(false);
  }, [props.pokemon]);

  const setPageBasedOnConditions = (name) => {
    const pokemonMainListPokemons = store.getState().pokemonMainList.pokemons;
    const pokemonMainListPage = store.getState().pokemonMainList.page;

    if (pokemonMainListPokemons.length > 0) {
      setPage(pokemonMainListPage);
      return;
    }

    getPageByPokemonName(name)
      .then((page) => setPage(page));
  };

  const checkForMobileState = (force) => {
    const isMobileInitially = checkIfMobile();
    setMobile(isMobileInitially);

    if (!isMobileInitially) {
      const uiPokemonDetailsWidth = store.getState().ui.pokemonDetailsWidth;
      let width = uiPokemonDetailsWidth;

      if (force || !uiPokemonDetailsWidth) {
        const wrapperStyles = window.getComputedStyle(pokemonWrapperElement.current);
        const wrapperWidth = parseInt(wrapperStyles.width);
        width = Math.round(wrapperWidth / 2);
        store.dispatch(ui.pokemonDetailsWidth(width));
      }

      pokemonDetailsElement.current.style.width = `${width}px`;
    }

    if (force) {
      if (!isHandler) activateMovableHandler();
      return;
    }

    window.addEventListener("resize", () => {
      if (pokemonDetailsElement.current instanceof HTMLElement) {
        pokemonDetailsElement.current.style.width = null;
        checkForMobileState(true);
      }
    });
  };

  const activateMovableHandler = () => {
    if (resizeHandlerElement.current instanceof HTMLElement) {
      const maxElementWidth = window.innerWidth - 580;
      const minElementWidth = 250;

      InitializeHandler(
        resizeHandlerElement.current,
        pokemonDetailsElement.current,
        pokemonWrapperElement.current,
        maxElementWidth,
        minElementWidth,
        Handler.DIRECTION_RIGHT,
        savePokemonDetailsWidth,
      );

      setHandler(true);
    }
  };

  const savePokemonDetailsWidth = (width) => {
    store.dispatch(ui.pokemonDetailsWidth(width));
    saveStore([Storage.ITEM_STATE_UI]);
  };

  return (
    <main ref={pokemonWrapperElement} className="is-flex is-width-100">
      {!isMobile && (
        <>
          <aside className={`${styles.list} is-sticky-top is-full-height is-overflow-y-scroll is-width-100`}>
            {page && (
              <PokemonList initialPage={page} scrollToPokemon={props.pokemon.name} />
            )}
          </aside>
          <div className="is-relative">
            <div ref={resizeHandlerElement} className={`${styles.handler} handler is-absolute is-height-100`}></div>
          </div>
        </>
      )}
      <section ref={pokemonDetailsElement} className={`${styles.details} is-relative is-width-100`}>
        {!isLoading && pokemon && (
          <Pokemon pokemon={pokemon} />
        )}
      </section>
    </main>
  )
};

PokemonPage.getInitialProps = async ({ query }) => {
  const pokemon = await getPokemonById(query.id);
  return { pokemon: pokemon };
};

export default PokemonPage;
