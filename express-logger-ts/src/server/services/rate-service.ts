import { RATE_LIMIT_WINDOW_IN_SECONDS, REDIS_PREFIX } from "@utils/env-constant";
import redisClient from "@utils/redis";

export const findRateByIp = async (ip: string) => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    return await redisClient.GET(`${REDIS_PREFIX}:${ip}`);
}

export const createRate = async (ip: string) => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    return await redisClient
        .SET(`${REDIS_PREFIX}:${ip}`, new Date().toISOString(), { EX: RATE_LIMIT_WINDOW_IN_SECONDS, NX: true });
}


export const incrementRateCount = async (ip: string) => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const id = `${REDIS_PREFIX}:${ip}`;
    const count = await redisClient.incr(id);

    if(count === 1){
        await redisClient.expire(id, RATE_LIMIT_WINDOW_IN_SECONDS);
    }

    return count;
}