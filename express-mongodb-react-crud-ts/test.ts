import redisClient from "./src/server/utils/redis"


(async () => {

    try {
        console.log("test....");
        
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }

        await redisClient.set('key', 'value');
        const value = await redisClient.get('key');
        console.log(value);

    } catch (error: any) {
        console.log(error);
    } finally {
        setTimeout(function () {
            process.exit();
        }, 1000);
    }
})()