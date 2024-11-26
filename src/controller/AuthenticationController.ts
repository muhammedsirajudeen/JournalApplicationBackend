import { Response } from "express";
import SupabaseAuthenticationService from "@/service/SupabaseAuthenticationService";
import { CustomRequest, IAuthentication, ISupabaseAuth } from "@/types/types";
import { HttpMessage, StatusCodes } from "@/types/types";

class AuthenticationController implements IAuthentication{
    private SupabaseAuthService:ISupabaseAuth
    constructor(authService:ISupabaseAuth){
        this.SupabaseAuthService=authService
        console.log(this.SupabaseAuthService.AddUser)
        
    }
    CreateUser=async (req:CustomRequest,res:Response)=>{
        try{
            const result=await this.SupabaseAuthService.AddUser(req.body.email,req.body.password)
            if(!result){
                return res.status(StatusCodes.Forbidden).json({message:HttpMessage.Forbidden})
                
            }
            return res.status(StatusCodes.OK).json({message:HttpMessage.OK})
        }catch(error){
            console.log(error)
            return res.status(StatusCodes.InternalServerError).json({message:HttpMessage.InternalServerError})
        }
        
    }
    LoginUser=async (req:CustomRequest,res:Response)=>{
        try{
            const result=await this.SupabaseAuthService.AddUser(req.body.email,req.body.password)
            if(!result){
                return res.status(StatusCodes.Forbidden).json({message:HttpMessage.Forbidden})                
            }
            return res.status(StatusCodes.OK).json({message:HttpMessage.OK})
        }catch(error){
            console.log(error)
            return res.status(StatusCodes.InternalServerError).json({message:HttpMessage.InternalServerError})
        }
    }
}


export default new AuthenticationController(SupabaseAuthenticationService)