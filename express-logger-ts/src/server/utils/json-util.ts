import { WithId } from "mongodb";

export const mapResult = <T>(obj: WithId<T>) => {
    const { _id, ...rest } = obj;
    return { id: _id?.toHexString(), ...rest }
}