export interface BoardGameCollection {
  gameId: number;
  name: string;
  image: string;
  thumbnail: string;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  isExpansion: boolean;
  yearPublished: number;
  bggRating: number;
  averageRating: number;
  rank: number;
  numPlays: number;
  rating: number;
  owned: boolean;
  preOrdered: boolean;
  forTrade: boolean;
  previousOwned: boolean;
  want: boolean;
  wantToPlay: boolean;
  wantToBuy: boolean;
  wishList: boolean;
  userComment: string;
}


export const emptyBoardgameCollection: BoardGameCollection = {
  gameId: 0,
  name: '',
  image: '',
  thumbnail: '',
  minPlayers: 0,
  maxPlayers: 0,
  playingTime: 0,
  isExpansion: false,
  yearPublished: 0,
  bggRating: 0,
  averageRating: 0,
  rank: 0,
  numPlays: 0,
  rating: 0,
  owned: false,
  preOrdered: false,
  forTrade: false,
  previousOwned: false,
  want: false,  
  wantToPlay: false,
  wantToBuy: false,
  wishList: false,
  userComment: ''
};
