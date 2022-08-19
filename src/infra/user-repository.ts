import { Table, FieldSet } from 'airtable'
import { NewUser } from '@/types'
import { IUserRepository } from '@/app/user-repository-interface'
import { UserDTO } from '@/app/user-dto'

export class UserRepository implements IUserRepository {
  public constructor(
    private readonly airtable: Table<FieldSet>
  ) { }

  public async index(): Promise<UserDTO[] | undefined> {
    const records = await this.airtable.select({ sort: [{ field: "id", direction: "asc" }] }).all()
    return records.map((record) => this.createUserDTO(record.fields))
  }

  public async findByEmail(param: string): Promise<UserDTO | undefined> {
    try {
      const records = await this.airtable.select({
        maxRecords: 1,
        filterByFormula: `{email} = "${param}"`
      }).firstPage()
      return this.createUserDTO(records[0].fields)
    } catch (error) {
      return undefined
    }
  }

  public async insert(newUser: NewUser): Promise<UserDTO | undefined> {
    if (await this.duplicatedEmail(newUser.email)) return

    const record = await this.airtable.create(newUser)
    return this.createUserDTO(record.fields)
  }

  // public async bulkInsert(newUsers: NewUser[]) {
  //   newUsers.forEach(async (newUser) => {
  //     await this.insert(newUser)
  //   })
  // }

  private async duplicatedEmail(email: string): Promise<boolean> {
    return await this.findByEmail(email) !== undefined
  }

  private createUserDTO(fields: any) {
    const { id, username, email } = this.addTypeToField(fields)
    return new UserDTO(id, username, email)
  }

  private addTypeToField(props: any) {
    return {
      id: props.id as number,
      username: props.username as string,
      email: props.email as string
    }
  }
}
