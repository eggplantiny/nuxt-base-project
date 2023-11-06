export class NoTokenError extends Error {
  constructor() {
    super('No token')
  }
}

export class DuplicatedError extends Error {
  constructor() {
    super('Duplicated')
  }
}
