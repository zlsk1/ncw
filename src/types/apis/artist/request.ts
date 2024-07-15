export type getArtistlistType = {
  limit: number,
  offset: number,
  initial: ArtistlistInitialType,
  type: ArtistlistTypeType,
  area: ArtistlistAreaType,
}

export type ArtistlistInitialType = -1 | 0
export type ArtistlistTypeType = -1 | 1 | 2 | 3
export type ArtistlistAreaType = -1 | 7 | 96 | 8 | 16 | 0