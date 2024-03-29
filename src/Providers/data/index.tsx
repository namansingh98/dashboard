import graphqlDataProvider, 
{ GraphQLClient , 
    liveProvider as graphqlProvider} from "@refinedev/nestjs-query";
import { fetchwarpper } from "./fetchWrapper";



import { createClient } from "graphql-ws";

export const API_BASE_URL='https://api.crm.refine.dev'
export const API_URL = `${API_BASE_URL}/graphql`;;
export  const WS_client = 'wss://api.crm.refine.dev/graphql'

export const client = new GraphQLClient(API_URL,{
fetch: (url: string, options: RequestInit)=> {
    try{
return fetchwarpper(url,options);
    }catch (error){
        return Promise.reject(error as Error);
    }
}})
export const wsClient =typeof  window !== "undefined"
? createClient({
    url:WS_client,
connectionParams:() =>{
    const accessToken=localStorage.getItem('access_token');
    return {
        headers:{
           Authorization:`Bearer ${accessToken}` 
        }
    }
}
}
):undefined

export const dataProvider = graphqlDataProvider(client)
export const liveProvider =wsClient? graphqlProvider(wsClient):undefined





