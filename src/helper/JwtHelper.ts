import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { configDotenv } from 'dotenv';
configDotenv()
interface User {
  email: string;
  password: string;
}

export interface IJwtHelper{
    generateToken:(user:User)=>Promise<string>
    verifyToken:(token:string)=>User | null
}

class JwtHelper implements IJwtHelper{
  private  secretKey = process.env.JWT_SECRET!; 
  public  async generateToken(user: User): Promise<string> {
    const { email, password } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = { email, password: hashedPassword };

    const token = jwt.sign(payload, this.secretKey, {
      expiresIn: '1h', 
    });

    return token;
  }

  public verifyToken(token: string): User | null {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      if(decoded){
        return decoded as User
      }else{
        return null
      }
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

export default new JwtHelper();
