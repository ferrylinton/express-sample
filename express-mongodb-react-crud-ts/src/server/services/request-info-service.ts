import { RequestInfo } from "@src/types/request-info";
import { getCollection } from "../utils/mongodb";
import * as requestAppService from "./request-app-service";

const getCollectionName = (str: string) => {
    str = str.replace(/\s/g,'')
    return str.toLowerCase();
}

export const create = async (requestInfo: Omit<RequestInfo, "id">) => {
    requestInfo.createdAt = (new Date()).toISOString();
    await requestAppService.create(requestInfo.app);
    const todoCollection = await getCollection<Omit<RequestInfo, "id">>(getCollectionName(requestInfo.app));
    return await todoCollection.insertOne(requestInfo);
};