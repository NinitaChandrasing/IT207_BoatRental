
//mpove these to each table file??

exports.add = function(db,obj,cb){
    let sql = `INSERT INTO sailingAdventure.reserves(S_id,B_id,Date)`
    +`VALUES(?,?,?)`;

    let values = [];
    values = [obj.S_id,obj.B_id,new Date(obj.Date)];

    db.query(sql,values,(err,results)=>{
        if (err) {
            cb(500,"internal error");
        };
        cb(200,"reservation added");
    });
    }


exports.display = function(db,cb){
    let sql = "SELECT * FROM sailingAdventure.reserves";
    db.query(sql,(err,results)=>{
        if (err) {
            cb(500,"internal error");
        };
        cb(200,results);
    });
}


exports.delete = function(db,obj,cb){
    let sql = "DELETE FROM sailingAdventure.reserves WHERE S_id = ? AND B_id = ? AND Date = ?";
    let values = [obj.S_id, obj.B_id, obj.Date];
    db.query(sql,values,(err,results)=>{
        if (err) {
            cb(500,"internal error");
        };
        cb(200,"reservation deleted");
    });

}

// exports.update = function(db,obj,cb){
//     let sql =  `SELECT * FROM sailingAdventure.boats WHEHRE B_id = \'${obj.B_id}\'`;
//     db.query(sql,(err,results)=>{
//       if(err){
//         cb(err.message);
//       }else if (results && results.length === 0){
//         cb('Sailor not found');
//       }else{
//         let keys = Object.keys(obj);
//         const name = keys.includes('B_name')? obj.B_name:results[0].B_name;
//         const type = keys.includes('type')? obj.B_type:results[0].B_type;

//         sql = "UPDATE sailiingAdventure.boats SET B_name = ?,B_type = ?, WHERE B_id = ?";
//         db.query(sql,[name,type,obj,B_id],(err,results)=>{
//             if(err) throw err 
//                 cb('sailor updated');
//                 cb(results);
//         })
//       }
//     });
// }
