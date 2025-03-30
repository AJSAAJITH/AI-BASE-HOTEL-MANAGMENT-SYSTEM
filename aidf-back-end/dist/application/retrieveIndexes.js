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
exports.retrieve = void 0;
const Hotel_1 = __importDefault(require("../infrastructure/schemas/Hotel"));
const mongoose_1 = __importDefault(require("mongoose"));
const openai_1 = require("@langchain/openai");
const mongodb_1 = require("@langchain/mongodb");
const retrieve = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        if (!query || query === "") {
            const hotels = (yield Hotel_1.default.find()).map((hotel) => ({
                hotel: hotel,
                confidence: 1,
            }));
            res.status(200).json(hotels);
            return;
        }
        const embeddingsModel = new openai_1.OpenAIEmbeddings({
            model: "text-embedding-ada-002",
            apiKey: process.env.OPENAI_API_KEY,
        });
        const vectorIndex = new mongodb_1.MongoDBAtlasVectorSearch(embeddingsModel, {
            collection: mongoose_1.default.connection.collection("hotelVectors"),
            indexName: "vector_index",
        });
        const results = yield vectorIndex.similaritySearchWithScore(query);
        console.log(results);
        const matchedHotels = yield Promise.all(results.map((result) => __awaiter(void 0, void 0, void 0, function* () {
            const hotel = yield Hotel_1.default.findById(result[0].metadata._id);
            return {
                hotel: hotel,
                confidence: result[1],
            };
        })));
        res
            .status(200)
            .json(matchedHotels.length > 3 ? matchedHotels.slice(0, 4) : matchedHotels);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.retrieve = retrieve;
