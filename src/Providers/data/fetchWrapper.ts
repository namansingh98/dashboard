import { GraphQLFormattedError } from "graphql";

type Error = {
    message: string;
    statusCode: string;
}

const customFetch = async (url: string, options: RequestInit) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = options.headers as Record<string, string>;
    return await fetch(url, {
        ...options,
        headers: {
            ...headers,
            Authorization: headers.Authorization || `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            'Apollo-Require-Preflight': 'true'
        }
    });
}

const getGraphQLErrors = (body: Record<"errors", GraphQLFormattedError[] | undefined>): Error | null => {
    if (!body) {
        return {
            message: "unknown error",
            statusCode: "Internal_Server_Error",
        }
    }

    if ("errors" in body && body.errors) {
        const errors = body.errors;
        const messages = errors.map(error => error?.message).join("");
        const code = errors[0]?.extensions?.code;
        return {
            message: messages || JSON.stringify(errors),
            statusCode: code || "500"
        }
    }

    return null;
}


export const fetchwarpper =async (url:string,options:RequestInit) => {

    const response =await customFetch(url,options)

    const responseClone =response.clone();
    const body =await responseClone.json();
    const error =getGraphQLErrors(body);

    if(error){
        throw error
    }
    return response
}