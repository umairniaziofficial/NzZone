import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriterConfig = {
    projectId: import.meta.env.VITE_CONFIG_ID,
    url: import.meta.env.VITE_CONFIG_URL,
};
export const client = new Client();

client.setEndpoint(appwriterConfig.url)
client.setProject(appwriterConfig.projectId);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
