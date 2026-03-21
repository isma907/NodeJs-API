export interface SimpsonCharacter {
  _id?: string;
  name: string;
  resume: string;
  image: string;
  gender: string;
  status: string;
  occupation: string;
}

export interface SuperheroCharacter {
  _id?: string;
  name: string;
  firstAppearance: string;
  image: string;
  publisher: string;
}

export interface DataPageResponse<T> {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  data: T[];
}