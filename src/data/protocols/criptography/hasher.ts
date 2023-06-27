export type Hasher = {
  encrypt: (value: string) => Promise<string>
}
