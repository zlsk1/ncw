export type UnionTypeToArray<T> = T extends (infer P)[] ? P : never;
