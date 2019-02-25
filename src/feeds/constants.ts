export enum Status {
  refreshing,
  loadingMore,
  idling
}

export interface Item {
  link: string;
  title: string;
  points: number;
  responseCount: number;
  id: string;
  author: string;
  description: string;
}
