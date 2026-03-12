export const STATISTICS = ['ag', 'co', 'em', 'in', 'me', 'pr', 'pe', 'qu', 're', 'sd'] as string[];

export type EntityType = 'system' | 'user';

export type Page<I> = {
  content: I[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
};

export type NamedEntity = {
  id: string;
  name: string;
};
