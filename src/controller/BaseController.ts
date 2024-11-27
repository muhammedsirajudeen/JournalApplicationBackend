import { IJwtHelper } from "@/helper/JwtHelper"
import { ISupabaseAuth } from "@/types/types"

export default class BaseController{
    public JwtHelper: IJwtHelper
    constructor(jwtHelper: IJwtHelper) {
        this.JwtHelper = jwtHelper
    }
    logger(message:string){
        console.log(`Date ${new Date()} ${message}`)
    }
}