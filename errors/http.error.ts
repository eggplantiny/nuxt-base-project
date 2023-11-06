export class HttpError {
  private readonly _status: number
  private readonly _message: string

  constructor(status: number, message: string) {
    this._status = status
    this._message = message
  }

  public get status() {
    return this._status
  }

  public get message() {
    return this._message
  }
}

export class InternalServerError extends HttpError {
  constructor(message = '서버에 오류가 발생했습니다.') {
    super(500, message)
  }
}

export class NetworkError extends HttpError {
  constructor(message = '서버와 통신을 실패했습니다.') {
    super(400, message)
  }
}

export class BadRequestError extends HttpError {
  constructor(message = '잘못된 요청입니다.') {
    super(400, message)
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = '아이디 또는 비밀번호를 확인해주세요.') {
    super(401, message)
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = '권한이 없습니다.') {
    super(403, message)
  }
}

export class NotFoundError extends HttpError {
  constructor(message = '찾을 수 없습니다.') {
    super(404, message)
  }
}

export class NoContentError extends HttpError {
  constructor(message = '항목을 찾을 수 없습니다.') {
    super(204, message)
  }
}
