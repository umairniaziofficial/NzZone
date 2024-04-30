import { INewUser } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { createNewUserAccount, signInAccount } from "../appwriter/api"


export const useCreatUserAccount = () =>{
    return useMutation({
        mutationFn: (user:INewUser)=> createNewUserAccount(user)
    })
}
export const useSigninAccount = () =>{
    return useMutation({
        mutationFn: (user:{email: string, password: string})=> signInAccount(user)
    })
}