export type ApiError = {
    status: number;
    data: {
        error: {
            details: { message: string; path?: string }[];
        };
        message: string;
        stack?: string | null;
        statusCode: number;
        success: boolean;
    };
};