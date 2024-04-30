import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriterConfig = {
    projectId: import.meta.env.VITE_CONFIG_ID,
    url: import.meta.env.VITE_CONFIG_URL,
    databaseID: import.meta.env.VITE_CONFIG_DATABASE_ID,
    storageID: import.meta.env.VITE_CONFIG_STORAGE_ID,
    usersCollectionID: import.meta.env.VITE_CONFIG_DATABASE_USERS,
    postsCollectionID: import.meta.env.VITE_CONFIG_DATABASE_POSTS,
    savesCollectionID: import.meta.env.VITE_CONFIG_DATABASE_SAVES,

};
export const client = new Client();

client.setEndpoint(appwriterConfig.url)
client.setProject(appwriterConfig.projectId);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
