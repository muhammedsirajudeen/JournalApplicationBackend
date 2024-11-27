import { Request, Response } from "express";
import BaseController from "./BaseController";
import JwtHelper, { IJwtHelper } from "@/helper/JwtHelper";
import { HttpMessage, IJournal, ISupabaseJournal, JournalRequest, StatusCodes } from "@/types/types";
import SupabaseJournalService from "@/service/SupabaseJournalService";



class JournalController extends BaseController implements IJournal{
    private journalService:ISupabaseJournal
    constructor(journalService:ISupabaseJournal,jwtHelper:IJwtHelper){
        super(jwtHelper)
        this.journalService=journalService
    }
    addJournal=async (req:JournalRequest,res:Response)=>{
        try{
            const {journal,color,token}=req.body
            const date=new Date().toDateString()
            const userDetails=this.JwtHelper.verifyToken(token)
            if(!userDetails){

                return res.status(StatusCodes.Unauthorized).json({message:HttpMessage.Unauthorized})
            }
            let journalEntryStatus=await this.journalService.AddJournal({journal:journal,color:color,email:userDetails.email,date:date})
            if(journalEntryStatus){
                return res.status(StatusCodes.OK).json({message:HttpMessage.OK,journal:journalEntryStatus})
            }else{
                return res.status(StatusCodes.InternalServerError).json({message:HttpMessage.InternalServerError})

            }
        }catch(error){
            return res.status(StatusCodes.InternalServerError).json({message:HttpMessage.InternalServerError})
        }
    }
    getJournal= async (req: JournalRequest, res: Response) => {
        try{
            const {token}=req.body
            const userDetails=this.JwtHelper.verifyToken(token)
            if(!userDetails){
                return res.status(StatusCodes.Unauthorized).json({message:HttpMessage.Unauthorized})
            }
            const JournalData=await this.journalService.GetJournal(userDetails.email)
            console.log(JournalData)
            return res.status(StatusCodes.OK).json({message:HttpMessage.OK,journals:JournalData})
        }catch(error){
            console.log(error)
            return res.status(StatusCodes.InternalServerError).json({message:HttpMessage.InternalServerError})
        }
    }
    DeleteJournalById=async (req:JournalRequest, res:Response)=>{
        try{
            const {id}=req.params
            const DeleteStatus=await this.journalService.DeleteById(parseInt(id))
            if(!DeleteStatus){
                return res.status(StatusCodes.InternalServerError).json({message:HttpMessage.InternalServerError})
            }
            return res.status(StatusCodes.OK).json({message:HttpMessage.OK})
        }catch(error){
            console.log(error)
            return res.status(StatusCodes.InternalServerError).json({message:HttpMessage.InternalServerError})
        }
    }
    updateById= async (req: JournalRequest, res: Response) => {
        try{
            const {id}=req.params
            const {journal,color}=req.body
            const UpdateJournal=await this.journalService.UpdateById(parseInt(id),journal,color)
            if(!UpdateJournal){
                return res.status(StatusCodes.InternalServerError).json({message:HttpMessage.InternalServerError})

            }
            return res.status(StatusCodes.OK).json({message:HttpMessage.OK,journal:UpdateJournal})
        }catch(error){
            return res.status(StatusCodes.InternalServerError).json({message:HttpMessage.InternalServerError})
        }
    };

}

export default new JournalController(SupabaseJournalService,JwtHelper)