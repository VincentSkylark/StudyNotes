/*
method decorator to cache descriptor with redis, using argument[0]:string as key
configuration:
    REDIS_HOST: socket for redis
    REDIS_EXPIRE_SECONDS: key expiration time in seconds
*/

export function redisCache<T>(redisConfig: RedisConfig = null): any {
    return (target: Object, propertyKey: string, descriptor: any): TypedPropertyDescriptor<PromiseDescriptorValue<T>> => {
        const originalMethod = descriptor.value;
        const redisHost = redisConfig?.redisHost;
        const redisExpireSeconds = redisConfig?.redisExpireSeconds ?? 600;
        descriptor.value = async function <T>(...args: any[]) {
            const client = createClient({
                    socket: {
                        url: redisHost
                    }
                }
            );

            client.on('error', async (err) => {
                Logger.error('Redis Client Error', err);
                // if Redis crash, call original method instead.
                return await originalMethod.apply(this, args);
            });

            await client.connect();
            if (await client.exists(args[0])) {
                return JSON.parse(await client.get(args[0]));
            } else {
                const value = await originalMethod.apply(this, args);
                await client.setEx(args[0], Number(redisExpireSeconds), JSON.stringify(value));
                return value;
            }
        }
        return descriptor;
    }
}
