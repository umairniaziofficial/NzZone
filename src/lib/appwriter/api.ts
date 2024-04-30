  import { ID } from "appwrite";
  import { account, appwriterConfig, avatars, databases } from "./config";
  import { INewUser } from "@/types";

  export async function createNewUserAccount(user: INewUser) {
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
        accountID: newAccount.$id,
      });
      return newUser;
    } catch (error) {
      return error;
      console.error(error);
    }
  }

  async function setUserToDB(user: {
    accountID: string;
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
