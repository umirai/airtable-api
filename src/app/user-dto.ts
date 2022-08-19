export class UserDTO {
  public constructor(
    private readonly id: number,
    private readonly username: string,
    private readonly email: string
  ) { }
}
