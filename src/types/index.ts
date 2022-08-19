export type User = {
  id: number
  username: string
  email: string
}

export type NewUser = Omit<User, 'id'>
