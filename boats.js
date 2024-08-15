
//mpove these to each table file??
exports.add = function(db,obj,cb){
    let sql = `INSERT INTO sailingAdventure.boats(B_name,B_type)`
    +`VALUES(?,?)`;

    let values = [];
    values = [obj.B_name,obj.B_type];

    db.query(sql,values,(err,results)=>{
        if (err) {
            cb(500,"internal error");
        };
        cb(200,"boat added");
    });
    }


exports.display = function(db,cb){
    let sql = "SELECT * FROM sailingAdventure.boats";
    db.query(sql,(err,results)=>{
        if (err) {
            cb(500,"internal error");
        };
        
        // let display = '';
        // results.forEach((element) => {
        //     display += element.S_id +', '+element.S_name +', '+element.B_date +', '+element.Rate+"\n";
        // });
        cb(200,results);
    }); 
}

exports.delete = function(db,obj,cb){
    let sql = "DELETE FROM sailingAdventure.boats WHERE B_id = ?";
    let values = [obj.B_id];
    db.query(sql,values,(err,results)=>{
        if (err) {
            cb(500,"internal error");
        };
        cb(200,"boat deleted");
    });

}

exports.update = function(db,obj,cb){
    let sql =  `SELECT * FROM sailingAdventure.boats WHERE B_id = \'${obj.B_id}\'`;
    let values = [obj.B_id];
    db.query(sql,(err,results)=>{
      if(err){
        cb(err.message);
      }else if (results && results.length === 0){
        cb('boats not found');
      }else{
        let keys = Object.keys(obj);
        const name = keys.includes('B_name')? obj.B_name:results[0].B_name;
        const type = keys.includes('type')? obj.B_type:results[0].B_type;

        sql = "UPDATE sailiingAdventure.boats SET B_name = ?,B_type = ?, WHERE B_id = ?";
        db.query(sql,[name,type,obj,B_id],(err,results)=>{
            if(err) throw err 
                cb('boats updated');
               //cb(results);
        })
      }
    });
    
    

}
