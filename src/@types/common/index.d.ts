type RequiredPartial<T, K extends keyof T> = Omit<T, K> &
  {
    [P in K]-?: T[P]
}

type PartialObject<T, K extends keyof T> = Omit<T, K> &
  {
    [P in K]?: T[P]
}


interface Pagination {
  page?: number
  perPage?: number
  total?: number
}