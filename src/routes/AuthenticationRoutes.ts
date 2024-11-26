import { Router } from "express";
import AuthenticationController from "@/controller/AuthenticationController";
import { IAuthentication } from "@/types/types";


class AuthenticationRoutes{
    private router=Router()
    AuthenticationController:IAuthentication;
    constructor(controller:IAuthentication){
        this.AuthenticationController=controller
        this.router.post('/create',this.AuthenticationController.CreateUser)
        this.router.post('/verify',this.AuthenticationController.LoginUser)
    }
    getRoute():Router{
        return this.router
    }
}


const AuthRoute=new AuthenticationRoutes(AuthenticationController)
export default AuthRoute.getRoute()