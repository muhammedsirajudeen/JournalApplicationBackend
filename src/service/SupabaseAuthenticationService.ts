import { ISupabaseAuth } from '@/types/types'
import { createClient, SupabaseClient, User } from '@supabase/supabase-js'
import dotenv from "dotenv"
dotenv.config()



class SupabaseAuthenticationService implements ISupabaseAuth {
    private url: string
    private supabaseKey: string
    private supabase: SupabaseClient
    constructor() {
        this.url = 'https://rydeqftmrbthwnqucugh.supabase.co'
        this.supabaseKey = process.env.SUPABASE_KEY!
        this.supabase = createClient(this.url, this.supabaseKey)
    }
    async checkUser(email: string): Promise<boolean> {
        const { data, error } = await this.supabase
            .schema("public").from('users')  
            .select('id')         
            .eq('email', email)   
            .single()
        if (data) return true
        return false
    }
    async AddUser(email: string, password: string): Promise<boolean> {
        const existStatus = await this.checkUser(email)
        if (existStatus) {
            return false
        }
        const { data, error } = await this.supabase.from("users").insert(
            {
                email: email,
                password: password
            }
        )
        if (error) return false

        return true
    }
    async VerifyUser(email: string, password: string): Promise<boolean> {
        const existStatus = await this.checkUser(email)
        if (!existStatus) {
            return false
        }
        const { data, error } = await this.supabase.from("users").select("id").eq('email', email).eq('password', password)
        console.log(error)
        if (error) return false
        return true
    }
}

export default new SupabaseAuthenticationService()