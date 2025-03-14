import { User } from "@supabase/supabase-js"
import { Request, Response } from "express"
export interface CustomRequest extends Request {
    body: {
        password: "string",
        email: "string"
    }
}
export interface TokenRequest extends Request{
    body:{
        token:string
    }
}

export interface IAuthentication {
    CreateUser: (req: CustomRequest, res: Response) => void
    LoginUser :(req: CustomRequest, res: Response) => void
    VerifyToken:(req:TokenRequest,res:Response)=>void
}

export interface ISupabaseAuth {
    AddUser: (email: string, password: string) => Promise<boolean>
    VerifyUser:(email:string,password:string)=>Promise<boolean>
}

export interface ISupabaseJournal{
    AddJournal:(journal:JournalEntry)=>Promise<null|JournalEntry>
    GetJournal:(email:string)=>Promise<null|JournalEntry[]>
    DeleteById:(id:number)=>Promise<boolean>
    UpdateById:(id:number,journal:string,color:string)=>Promise<null|JournalEntry>
}
export interface JournalRequest extends Request{
    body:{
        journal:string,
        color:string,
        token:string
    }
}
export interface IJournal{
    addJournal:(req:JournalRequest,res:Response)=>void
    getJournal:(req:JournalRequest,res:Response)=>void
    DeleteJournalById:(req:JournalRequest,res:Response)=>void
    updateById:(req:JournalRequest,res:Response)=>void
}


export interface JournalEntry{
    id?:string,
    journal:string,
    date:string,
    color:string,
    email:string
}

export enum StatusCodes {
    // Informational responses (100–199)
    Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,

    // Success (200–299)
    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,

    // Redirection (300–399)
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,

    // Client Error (400–499)
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    URITooLong = 414,
    UnsupportedMediaType = 415,
    RangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    ImATeapot = 418,  // A fun one, but included for completeness
    MisdirectedRequest = 421,
    UnprocessableEntity = 422,
    Locked = 423,
    FailedDependency = 424,
    TooEarly = 425,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    UnavailableForLegalReasons = 451,

    // Server Error (500–599)
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HTTPVersionNotSupported = 505,
    VariantAlsoNegotiates = 506,
    InsufficientStorage = 507,
    LoopDetected = 508,
    NotExtended = 510,
    NetworkAuthenticationRequired = 511
}


export enum HttpMessage {
    // Informational responses (100–199)
    Continue = "Continue",
    SwitchingProtocols = "Switching Protocols",
    Processing = "Processing",

    // Success (200–299)
    OK = "OK",
    Created = "Created",
    Accepted = "Accepted",
    NonAuthoritativeInformation = "Non-Authoritative Information",
    NoContent = "No Content",
    ResetContent = "Reset Content",
    PartialContent = "Partial Content",

    // Redirection (300–399)
    MultipleChoices = "Multiple Choices",
    MovedPermanently = "Moved Permanently",
    Found = "Found",
    SeeOther = "See Other",
    NotModified = "Not Modified",
    UseProxy = "Use Proxy",
    TemporaryRedirect = "Temporary Redirect",
    PermanentRedirect = "Permanent Redirect",

    // Client Error (400–499)
    BadRequest = "Bad Request",
    Unauthorized = "Unauthorized",
    PaymentRequired = "Payment Required",
    Forbidden = "Forbidden",
    NotFound = "Not Found",
    MethodNotAllowed = "Method Not Allowed",
    NotAcceptable = "Not Acceptable",
    ProxyAuthenticationRequired = "Proxy Authentication Required",
    RequestTimeout = "Request Timeout",
    Conflict = "Conflict",
    Gone = "Gone",
    LengthRequired = "Length Required",
    PreconditionFailed = "Precondition Failed",
    PayloadTooLarge = "Payload Too Large",
    URITooLong = "URI Too Long",
    UnsupportedMediaType = "Unsupported Media Type",
    RangeNotSatisfiable = "Range Not Satisfiable",
    ExpectationFailed = "Expectation Failed",
    ImATeapot = "I'm a teapot",  // A fun one, but included for completeness
    MisdirectedRequest = "Misdirected Request",
    UnprocessableEntity = "Unprocessable Entity",
    Locked = "Locked",
    FailedDependency = "Failed Dependency",
    TooEarly = "Too Early",
    UpgradeRequired = "Upgrade Required",
    PreconditionRequired = "Precondition Required",
    TooManyRequests = "Too Many Requests",
    RequestHeaderFieldsTooLarge = "Request Header Fields Too Large",
    UnavailableForLegalReasons = "Unavailable For Legal Reasons",

    // Server Error (500–599)
    InternalServerError = "Internal Server Error",
    NotImplemented = "Not Implemented",
    BadGateway = "Bad Gateway",
    ServiceUnavailable = "Service Unavailable",
    GatewayTimeout = "Gateway Timeout",
    HTTPVersionNotSupported = "HTTP Version Not Supported",
    VariantAlsoNegotiates = "Variant Also Negotiates",
    InsufficientStorage = "Insufficient Storage",
    LoopDetected = "Loop Detected",
    NotExtended = "Not Extended",
    NetworkAuthenticationRequired = "Network Authentication Required"
}
