"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redisClient_1 = __importDefault(require("../config/redisClient"));
const cacheMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = req.originalUrl;
    try {
        const cachedData = yield redisClient_1.default.get(cacheKey);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }
        next();
    }
    catch (error) {
        console.error("Redis error", error);
        next(); // Continue without caching in case of error
    }
});
exports.default = cacheMiddleware;
/*
run: docker run --name redis -p 6379:6379 -d redis

use:
in controllers
  Store the data in Redis cache with a 1-hour expiration
  import redisClient from '../config/redisClient';

    await redisClient.set(req.originalUrl, JSON.stringify(data), {
        EX: 3600, // Expire after 3600 seconds (1 hour)
    });

in routes
add cacheMiddleware after the endpoint
*/
