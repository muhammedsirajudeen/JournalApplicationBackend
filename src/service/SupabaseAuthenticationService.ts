import { ISupabaseAuth } from '@/types/types'
import { createClient, SupabaseClient, User } from '@supabase/supabase-js'
import dotenv from "dotenv"
dotenv.config()



class SupabaseAuthenticationService implements ISupabaseAuth{
    private url:string
    private supabaseKey:string
    private supabase:SupabaseClient
    constructor(){
        this.url='https://rydeqftmrbthwnqucugh.supabase.co'
        this.supabaseKey=process.env.SUPABASE_KEY!
        this.supabase=createClient(this.url,this.supabaseKey)
    }
    async checkUser(email:string):Promise<boolean>{
        const { data, error } = await this.supabase
            .schema("public").from('users')  // 'auth.users' is the table where user data is stored
            .select('id')         // Select the 'id' field
            .eq('email', email)   // Match the email address
            .single()
        console.log(data)   
        if(data) return true
        return false
    }
    //in the case of null just assume that the service broke or something
    async AddUser(email:string,password:string):Promise<boolean>{
        const existStatus=await this.checkUser(email)
        console.log(existStatus)
        if(existStatus){
            return false
        }
        const {data,error}=await this.supabase.from("users").insert(
            {
                email:email,
                password:password
            }
        )
        console.log(data)
        if(error) return false
        
        return true
    }
    // async VerifyUser(email:string,password:string):Promise<User|null>{

    // }
}

export default new SupabaseAuthenticationService()