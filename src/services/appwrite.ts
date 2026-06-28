import { Client, Databases, ID, Query } from "react-native-appwrite";
import { TMDB } from "./api";

const client = new Client()
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!);

const databases = new Databases(client);

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

export async function trackSearch(query: string, movie: Movie) {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return;

    try {
        const existing = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", normalizedQuery),
        ]);

        if (existing.documents.length > 0) {
            const doc = existing.documents[0];
            await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: (doc.count ?? 0) + 1,
            });
        } else {
            await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: normalizedQuery,
                count: 1,
                movie_id: movie.id,
                title: movie.title,
                poster_url: movie.poster_path
                    ? `${TMDB.IMAGE_URL}${movie.poster_path}`
                    : "",
            });
        }
    } catch (error) {
        console.error("Failed to track search:", error);
    }
}

export async function getTrendingMovies(): Promise<TrendingMovie[]> {
    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderDesc("count"),
            Query.limit(5),
        ]);

        return result.documents.map((doc) => ({
            searchTerm: doc.searchTerm,
            movie_id: doc.movie_id,
            title: doc.title,
            count: doc.count,
            poster_url: doc.poster_url,
        }));
    } catch (error) {
        console.error("Failed to fetch trending movies:", error);
        return [];
    }
}

export default client;
