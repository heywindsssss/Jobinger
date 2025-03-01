import { StatusCodes} from "http-status-codes";

export class NotFoundError extends Error{
    constructor(msgs){
        super(msgs)
        this.name='NotFoundError';
        this.statusCodes=StatusCodes.NOT_FOUND;
    }
}

export class BadRequestError extends Error{
    constructor(msg){
        super(msg)
        this.name='BadRequestError';
        this.statusCode=StatusCodes.BAD_REQUEST;
    }
}

export class UnauthenticatedError extends Error{
    constructor(msg){
        super(msg)
        this.name='UnauthenticatedError';
        this.statusCode=StatusCodes.UNAUTHORIZED;
    }
}

export class UnauthorizedError extends Error{
    constructor(msg){
        super(msg)
        this.name='UnauthorizedError';
        this.statusCode=StatusCodes.FORBIDDEN;
    }
}

