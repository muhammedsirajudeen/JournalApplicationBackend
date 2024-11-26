export default abstract class BaseController{
    logger(message:string){
        console.log(`Date ${new Date()} ${message}`)
    }
}