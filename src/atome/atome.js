import { atom } from 'recoil';

// requête axios pour avoir les datas de l'id en question. Prévoir de faire un on Select

export const jwtState = atom({
  key: 'jwtState', // unique ID (with respect to other atoms/selectors)
  default: '', // valeur par défaut (alias valeur initials)
});

export const connectedState = atom({
  key: 'connectedState', // unique ID (with respect to other atoms/selectors)
  default: false, // valeur par défaut (alias valeur initials)
});

export const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: '', // valeur par défaut (alias valeur initials)
});

export const urlState = atom({
  key: 'urlState',
  default: 'https://preprod-carbonable-indexer.fly.dev',
});

export const favoritesState = atom({
  key: 'favoritesState',
  default: [],
});

export const favoriteChangeState = atom({
  key: 'handleFavoriteChangeState',
  default: '',
});
