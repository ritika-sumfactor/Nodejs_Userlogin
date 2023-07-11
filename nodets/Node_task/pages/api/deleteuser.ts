import { NextApiRequest,NextApiResponse } from "next";
 
import { executeQuery } from "../../lib/Database/connectDatabase"
  export default async function deleteUser(req:NextApiRequest,res:NextApiResponse){
 if(req.method==='POST'){
  try {
    const {email}=req.body;
    const getRecord = `delete from user where email='${email}';`
    const resultset: any = await executeQuery(getRecord);
    res.status(200).send({resultset,done:true});
}
catch (error) {
  res.status(500).send('Internal Server Error');

 }
 }
 else{
  res.status(400).json({ message: 'Bad Request' });
}
}