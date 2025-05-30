import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";
import { NextFunction, Request, Response } from "express"; // Added Request and Response imports
import mongoose, { model } from "mongoose";
import Hotel from "../infrastructure/schemas/Hotel";
import { Document } from "@langchain/core/documents";

export const createEmberdding = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const emberdingModels = new OpenAIEmbeddings({
            model: "text-embedding-ada-002",
            apiKey: process.env.OPENAI_API_KEY
        });
        const vectorIndex = new MongoDBAtlasVectorSearch(emberdingModels, {
            collection: mongoose.connection.collection("hotelVectors"),
            indexName: "vector_index",
        });

        const hotels = await Hotel.find({});
        const docs = hotels.map((hotel) => {
            const { _id, location, price, description } = hotel;
            const doc = new Document({
                pageContent: `${description} Located in ${location}. Price per night: ${price}`,
                metadata: {
                    _id,
                }
            })
            return doc;
        });
        await vectorIndex.addDocuments(docs);

        res.status(200).json({
            message: "Emberdding create successfully."
        });

    } catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}