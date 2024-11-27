import { ISupabaseJournal, JournalEntry } from "@/types/types";
import { SupabaseBaseService } from "./SupabaseBaseService";


class SupabaseJournalService extends SupabaseBaseService implements ISupabaseJournal{
    AddJournal=(journalEntry:JournalEntry):boolean=>{
        
        return true
    }
}

export default new SupabaseJournalService()