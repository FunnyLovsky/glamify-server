export default class ApiError extends Error {
    status: number;
    errors: any[];

    constructor(status: number, message: string, errors: any[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnAutoriseError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message: string, errors: any[] = []) {
        return new ApiError(401, message, errors)
    }

    static ValidationFailed(message: string, errors: any[] = []) {
        return new ApiError(422, message, errors)
    }
}