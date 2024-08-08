import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { RedisService as NestJSRedisService, DEFAULT_REDIS_NAMESPACE, ClusterService, DEFAULT_CLUSTER_NAMESPACE } from '@liaoliaots/nestjs-redis';
import { Redis, Cluster } from 'ioredis';
@Injectable()
export class RedisService {
  private client: Redis | Cluster;
  constructor(
    private readonly redisService: NestJSRedisService,
    // private readonly clusterService: ClusterService,
  ) {
    this.client = this.redisService.getClient(DEFAULT_REDIS_NAMESPACE) || undefined;
    // this.client = this.clusterService.getClient(DEFAULT_CLUSTER_NAMESPACE) || undefined;

  }

  status(): string {
    return this.client.status;
  }

  async get(cid: string) {
    return await this.client.get(cid);
  }

  async getBuffer(cid: string) {
    return await this.client.getBuffer(cid);
  }

  async set(cid: string, data: any): Promise<void> {
    function isNumeric(num) { return !isNaN(num) }

    const expiredTime = process.env.REDIS_CACHE_EXPIRE_TIME; // second

    let expiryInSeconds;

    if (isNumeric(expiredTime) && parseInt(expiredTime) > 0) {
      // Use the provided expiry time
      expiryInSeconds = parseInt(expiredTime);
    } else {
      // If no valid expiry time is provided, set a default expiry time
      expiryInSeconds = 10800; // Default expiry time of 1 hour
    }

    // Add a random number of seconds between 0 and 5 to the expiry time
    expiryInSeconds += Math.floor(Math.random() * 6); // Add a random number between 0 and 5

    await this.client.set(cid, data, 'EX', expiryInSeconds);
  }

  async exists(cid: string) {
    return await this.client.exists(cid)

  }

  async publish(channel: string, cid: string) {
    return this.client.publish(channel, cid);

  }
}
