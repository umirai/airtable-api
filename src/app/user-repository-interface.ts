import { NewUser } from '@/types'
import { UserDTO } from '@/app/user-dto'

export interface IUserRepository {
  index: () => Promise<UserDTO[] | undefined>
  findByEmail: (email: string) => Promise<UserDTO | undefined>
  insert: (newUser: NewUser) => Promise<UserDTO | undefined>
}
