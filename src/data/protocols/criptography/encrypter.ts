export type Encrypter = {
  encrypt: (id: string) => Promise<string>
}
