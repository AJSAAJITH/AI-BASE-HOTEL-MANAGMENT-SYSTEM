class ValidateError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}
export default ValidateError;