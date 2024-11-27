import { Router } from "express";
import JournalController from "@/controller/JournalController";
import { IJournal } from "@/types/types";


class JournalRoutes{
    private router=Router()
    JournalController:IJournal;
    constructor(controller:IJournal){
        this.JournalController=controller
        this.router.post('/create',this.JournalController.addJournal)

    }
    getRoute():Router{
        return this.router
    }
}


const JournalRoute=new JournalRoutes(JournalController)
export default JournalRoute.getRoute()