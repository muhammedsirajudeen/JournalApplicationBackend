import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { configDotenv } from "dotenv"
configDotenv()
export class SupabaseBaseService{
    protected url: string
    protected supabaseKey: string
    protected supabase: SupabaseClient
    constructor() {
        this.url = 'https://rydeqftmrbthwnqucugh.supabase.co'
        this.supabaseKey = process.env.SUPABASE_KEY!
        this.supabase = createClient(this.url, this.supabaseKey)
    }
}