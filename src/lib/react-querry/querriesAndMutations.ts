import { useMutation } from "@tanstack/react-query";
import { createNewUserAccountApi, signInAccountApi } from "../appwriter/api";
import { INewUser } from "@/types";

export const useCreatUserAccount = () => {
    return(useMutation({mutationFn:(user: INewUser)=> createNewUserAccountApi(user)})
    )
};

export const useSigninAccount = ()=> {
    return(useMutation({mutationFn:(user: {email: string, password: string})=> signInAccountApi(user)}))
};