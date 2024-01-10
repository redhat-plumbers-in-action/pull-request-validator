export declare class ValidationError extends Error {
    readonly code?: number | undefined;
    constructor(message: string, code?: number | undefined);
}
