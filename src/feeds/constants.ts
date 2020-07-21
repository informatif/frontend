export enum Status {
  refreshing,
  loadingMore,
  idling
}

export interface Item {
  link: string;
  origLink: string;
  altLink: string;
  altLinkName: string;
  title: string;
  points: number;
  responseCount: number;
  id: string;
  author: string;
  description: string;
}
