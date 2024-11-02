import Connect from "@/db/db";
import vendor from "@/models/vendermodel";




export async function GET ( ){
    try {
    await Connect()
        const getres = await vendor.find()

      return Response.json({success : true , message : "get vendors", getres  })      
    } catch (error) {
        console.log(error);
        
    }
}
