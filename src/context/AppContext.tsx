import React, { useMemo, createContext } from 'react';
import {
  Action,
  IPeople,
  IResultPeople,
  InitialState,
  TypeContext,
} from '../types/interface';

const initialState = {
  inputSearch: '',
  storeApiResult: null,
  storeCharacters: null,
  pages: '1',
  perPage: '10',
};

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case 'ADD_SEARCH':
      return {
        ...state,
        inputSearch: action.payload,
      };
    case 'ADD_STORE_API':
      return {
        ...state,
        storeApiResult: action.resultApi,
      };
    case 'CLEAR_STORE_API':
      return {
        ...state,
        storeApiResult: null,
      };
    case 'ADD_STORE_CHARACTERS':
      return {
        ...state,
        storeCharacters: action.characters,
      };
    case 'CLEAR_STORE_CHARACTERS':
      return {
        ...state,
        storeCharacters: null,
      };
    case 'ADD_PAGES':
      return {
        ...state,
        pages: action.pages,
      };
    case 'PRE_PAGE':
      return {
        ...state,
        perPage: action.perPage,
      };
    default:
      return state;
  }
};

export const AppContext = createContext<TypeContext>({} as TypeContext);

function Provider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const valueProps = {
    inputSearch: state.inputSearch,
    storeApiResult: state.storeApiResult,
    storeCharacters: state.storeCharacters,
    pages: state.pages,
    perPage: state.perPage,
    addPages: (value: string) => {
      dispatch({ type: 'ADD_PAGES', pages: value });
    },
    addPerPage: (value: string) => {
      dispatch({ type: 'PRE_PAGE', perPage: value });
    },
    addInputSearch: (inputSearch: string) => {
      dispatch({ type: 'ADD_SEARCH', payload: inputSearch });
    },
    addStoreApiResult: (value: IResultPeople | null) => {
      dispatch({ type: 'ADD_STORE_API', resultApi: value });
    },
    addAllCharacters: (value: IPeople[] | null) => {
      dispatch({ type: 'ADD_STORE_CHARACTERS', characters: value });
    },
    removeStoreApiResult: () => {
      dispatch({ type: 'ADD_STORE_API', resultApi: null });
    },
    removeAllCharacters: () => {
      dispatch({ type: 'CLEAR_STORE_CHARACTERS', characters: null });
    },
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const foo = useMemo(() => valueProps, [state]);
  return <AppContext.Provider value={foo}>{children}</AppContext.Provider>;
}

export default Provider;
