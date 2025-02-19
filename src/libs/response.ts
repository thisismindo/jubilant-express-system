interface ResponseData {
    [key: string]: string | undefined;
}

export const apiResponse = (status: boolean, message: string, data: ResponseData = {}) => {
    return {
        status: status,
        message: message,
        data: data
    }
}
