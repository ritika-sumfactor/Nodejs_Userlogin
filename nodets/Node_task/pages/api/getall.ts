import { NextApiRequest,NextApiResponse } from "next";
import { verifyToken } from "../../lib/JWT-token/service";
import * as jwt from 'jsonwebtoken';
import { executeQuery } from "../../lib/Database/connectDatabase";
const secret=process.env.JWT_SECRET_KEY as string;
 export default async function getAllUser(req:NextApiRequest,res:NextApiResponse){
 if(req.method==='GET'){
  try {
    verifyToken(req, res, async() => {
    const getRecord = `select * from user_table;`
    const resultset: any = await executeQuery(getRecord);
    res.status(200).send({userlist:resultset,done:true});
    });
}
catch (error) {
  res.status(500).send('Server Error');

 }
 }
 else{
  res.status(400).json({ message: 'Bad Request' });
}
}