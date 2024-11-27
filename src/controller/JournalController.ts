import { Request, Response } from "express";
import BaseController from "./BaseController";
import JwtHelper, { IJwtHelper } from "@/helper/JwtHelper";
import { HttpMessage, IJournal, ISupabaseJournal, StatusCodes } from "@/types/types";
import SupabaseJournalService from "@/service/SupabaseJournalService";



class JournalController extends BaseController implements IJournal{
    private journalService:ISupabaseJournal
    constructor(journalService:ISupabaseJournal,jwtHelper:IJwtHelper){
        super(jwtHelper)
        this.journalService=journalService
    }
    addJournal=(req:Request,res:Response)=>{
        try{
            const {journal,color}=req.body
            const date=new Date().toDateString()
            
            console.log(journal,color)
            return res.status(StatusCodes.OK).json({message:HttpMessage.OK})
        }catch(error){
            return res.status(StatusCodes.InternalServerError).json({message:HttpMessage.InternalServerError})
        }
    }
}

export default new JournalController(SupabaseJournalService,JwtHelper)