import { ID, Query } from "appwrite";
import { account, appwriterConfig, avatars, databases } from "./config";
import { INewUser } from "@/types";

export async function createNewUserAccountApi(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarURL = avatars.getInitials(user.name);

    const newUser = setUserToDB({
      name: newAccount.name,
      password: newAccount.password!,
      imageUrl: avatarURL,
      username: user.username,
      email: newAccount.email,
      accountId: newAccount.$id,
    });
    return newUser;
  } catch (error) {
    return error;
    console.error(error);
  }
}

async function setUserToDB(user: {
  accountId: string;
  imageUrl: URL;
  name: string;
  username: string;
  password: string;
  email: string;
}) {
  try {
    const newUser = databases.createDocument(
      appwriterConfig.databaseID,
      appwriterConfig.usersCollectionID,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function signInAccountApi(user: {
  email: string;
  password: string;
}) {
  try {
    const logginUser = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return logginUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentAccount() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriterConfig.databaseID,
      appwriterConfig.usersCollectionID,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];

  } catch (error) {
    console.log();
  }
}
