import mysql from "mysql2/promise"


export const db = mysql.createPool({
    host:'mx130.hostgator.mx',        
    user:'jeussval_admin',
    password:'Admin@234',        
    database: 'jeussval_aquadb',     
})
export async function query(sql:string, values?:any[]){
   
    try{    
        const [rows] = await db.execute(sql,values);                
        return rows
    }catch(error){
        console.error("Error ", error);        
        return {error};
    }
    
}
