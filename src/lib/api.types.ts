export interface ApiError {
    message: string,
    status: number
}

export interface Profile {
    id: string,
    requests: number,
    max_requests: number,
    last_payment: string
}

export interface Response {
    valid: boolean,
    code_message: string,
    message: string,
}