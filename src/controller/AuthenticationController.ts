import { Response } from "express";
import SupabaseAuthenticationService from "@/service/SupabaseAuthenticationService";
import { CustomRequest, IAuthentication, ISupabaseAuth, TokenRequest } from "@/types/types";
import { HttpMessage, StatusCodes } from "@/types/types";
import JwtHelper, { IJwtHelper } from "@/helper/JwtHelper";
import BaseController from "./BaseController";

class AuthenticationController extends BaseController implements IAuthentication {
    private SupabaseAuthService:ISupabaseAuth
    constructor(authService: ISupabaseAuth, jwtHelper: IJwtHelper) {
        super(jwtHelper)
        this.SupabaseAuthService=authService

    }

    CreateUser = async (req: CustomRequest, res: Response) => {
        try {
            const result = await this.SupabaseAuthService.AddUser(req.body.email, req.body.password)
            if (!result) {
                return res.status(StatusCodes.Forbidden).json({ message: HttpMessage.Forbidden })

            }
            const token = await this.JwtHelper.generateToken(req.body)
            return res.status(StatusCodes.OK).json({ message: HttpMessage.OK, token: token })
        } catch (error) {
            console.log(error)
            return res.status(StatusCodes.InternalServerError).json({ message: HttpMessage.InternalServerError })
        }

    }
    LoginUser = async (req: CustomRequest, res: Response) => {
        try {
            const result = await this.SupabaseAuthService.VerifyUser(req.body.email, req.body.password)
            if (!result) {
                return res.status(StatusCodes.Forbidden).json({ message: HttpMessage.Forbidden })
            }
            const token = await this.JwtHelper.generateToken(req.body)
            return res.status(StatusCodes.OK).json({ message: HttpMessage.OK, token: token })
        } catch (error) {
            console.log(error)
            return res.status(StatusCodes.InternalServerError).json({ message: HttpMessage.InternalServerError })
        }
    }
    VerifyToken = async (req: TokenRequest, res: Response) => {
        try {
            const { token } = req.body
            const result = this.JwtHelper.verifyToken(token)
            if (result) {
                return res.status(StatusCodes.OK).json({ message: HttpMessage.InternalServerError })
            } else {
                return res.status(StatusCodes.Forbidden).json({ message: HttpMessage.Forbidden })
            }
        } catch (error) {
            console.log(error)
            return res.status(StatusCodes.InternalServerError).json({ message: HttpMessage.InternalServerError })

        }
    };
}


export default new AuthenticationController(SupabaseAuthenticationService, JwtHelper)