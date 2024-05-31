export declare class AuthenticationException extends Error {
}
export declare class InternetConnectionException extends Error {
}
export declare class HttpException extends Error {
    code: number | null;
    constructor(code: number | null, message?: string);
}
export declare class GuardException extends Error {
    constructor(message?: string);
}
