import { ISupabaseJournal, JournalEntry } from "@/types/types";
import { SupabaseBaseService } from "./SupabaseBaseService";


class SupabaseJournalService extends SupabaseBaseService implements ISupabaseJournal{
    AddJournal=async (journalEntry:JournalEntry):Promise<JournalEntry|null>=>{
        const {data,error}=await this.supabase.from("journal").insert(journalEntry).select("*")
        console.log(data)
        if(error) return null
        return data[0] as JournalEntry
    }
    GetJournal=async  (email: string) => {
        const {data,error}=await this.supabase.from("journal").select("*").eq("email",email)
        if(error) return null
        console.log(data)
        return data as JournalEntry[]
    };
    DeleteById=async (id:number)=>{
        const {data,error}=await this.supabase.from("journal").delete().eq("id",id)
        if(error) return false
        return true
    }
    UpdateById=async (id:number,journal:string,color:string)=>{
        const {data,error}=await this.supabase.from("journal").update({journal:journal,color:color}).eq('id',id).select("*")
        if(error) return null
        if(data){
            return data[0] as JournalEntry
        }
        return null
    }
}

export default new SupabaseJournalService()