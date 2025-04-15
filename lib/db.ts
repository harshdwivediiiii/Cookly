import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("Missing MONGODB_URI in environment variables");

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  // Return the cached DB if it's already connected
  if (cachedDb) return cachedDb;

  try {
    // Create a new MongoClient instance if no cached client exists
    if (!cachedClient) {
      cachedClient = new MongoClient(uri as string, {
        // No need for useNewUrlParser and useUnifiedTopology in MongoDB v4.x and later
        maxPoolSize: 10, // Set the maximum connection pool size
      });
      
      // Attempt to connect to the MongoDB server
      await cachedClient.connect();
      console.log("MongoDB connected successfully");
    }

    // Cache the DB reference
    cachedDb = cachedClient.db("cookly");
    
    return cachedDb;
  } catch (error) {
    // Log the error and throw it
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

// Gracefully close the connection on shutdown (important for serverless environments)
export async function closeDatabaseConnection(): Promise<void> {
  if (cachedClient) {
    try {
      await cachedClient.close();
      console.log("MongoDB connection closed");
    } catch (error) {
      console.error("Failed to close MongoDB connection", error);
    }
  }
}
