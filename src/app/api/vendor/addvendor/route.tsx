import Connect from "@/db/db"
import vendor from "@/models/vendermodel"

export async function POST(req:Request) {
  await Connect()
  const reqBody =  await req.json()
  const {name, type , criticality, status, email, serviceProvided} = reqBody
  
  const data = await vendor.create({name, type , criticality, status, email, serviceProvided })
  console.log(data)

  return Response.json({message :"success", data })
}


