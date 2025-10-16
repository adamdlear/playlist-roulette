// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import {
//   DynamoDBDocumentClient,
//   PutCommand,
//   GetCommand,
// } from "@aws-sdk/lib-dynamodb";
// import { Resource } from "sst";
//
// const client = new DynamoDBClient({});
// const docClient = DynamoDBDocumentClient.from(client);
//
// export interface User {
//   id: string;
//   email: string;
//   spotifyId: string;
//   spotifyAccessToken: string;
//   spotifyRefreshToken: string;
//   spotifyTokenExpiry: number;
//   displayName?: string;
//   imageUrl?: string;
//   createdAt: number;
//   updatedAt: number;
// }

// export async function saveUser(user: Omit<User, "createdAt" | "updatedAt">) {
//   const now = Date.now();
//
//   const command = new PutCommand({
//     TableName: Resource.AuthStorage.name,
//     Item: {
//       ...user,
//       createdAt: now,
//       updatedAt: now,
//     },
//   });
//
//   await docClient.send(command);
//
//   return { ...user, createdAt: now, updatedAt: now };
// }
//
// export async function getUser(userId: string): Promise<User | null> {
//   const command = new GetCommand({
//     TableName: Resource.YourUsersTable.name,
//     Key: { id: userId },
//   });
//
//   const result = await docClient.send(command);
//   return result.Item as User | null;
// }
//
// export async function updateSpotifyTokens(
//   userId: string,
//   accessToken: string,
//   refreshToken: string,
//   expiresIn: number,
// ) {
//   const command = new PutCommand({
//     TableName: Resource.YourUsersTable.name,
//     Item: {
//       id: userId,
//       spotifyAccessToken: accessToken,
//       spotifyRefreshToken: refreshToken,
//       spotifyTokenExpiry: Date.now() + expiresIn * 1000,
//       updatedAt: Date.now(),
//     },
//   });
//
//   await docClient.send(command);
// }
//
// // Helper to refresh Spotify token when expired
// export async function getValidSpotifyToken(userId: string): Promise<string> {
//   const user = await getUser(userId);
//
//   if (!user) {
//     throw new Error("User not found");
//   }
//
//   // Check if token is still valid (with 5 minute buffer)
//   if (user.spotifyTokenExpiry > Date.now() + 5 * 60 * 1000) {
//     return user.spotifyAccessToken;
//   }
//
//   // Token expired, refresh it
//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization: `Basic ${Buffer.from(
//         `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
//       ).toString("base64")}`,
//     },
//     body: new URLSearchParams({
//       grant_type: "refresh_token",
//       refresh_token: user.spotifyRefreshToken,
//     }),
//   });
//
//   const data = await response.json();
//
//   // Update stored tokens
//   await updateSpotifyTokens(
//     userId,
//     data.access_token,
//     data.refresh_token || user.spotifyRefreshToken,
//     data.expires_in,
//   );
//
//   return data.access_token;
// }
