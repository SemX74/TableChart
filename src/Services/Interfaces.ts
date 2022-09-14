export interface IList {
  isActive: boolean;
  _id: string;
  id: string;
  name: string;
}

export interface Datum {
  id: number;
  curency: string;
  date: Date;
}
export interface DatumNew {
  id: number;
  curency: string;
  date: string;
}

export interface ICertain {
  data: Datum[];
  _id: string;
  id: string;
}