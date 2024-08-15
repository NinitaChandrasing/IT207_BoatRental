
//mpove these to each table file??
exports.add = function(db,obj,cb){
    let sql = `INSERT INTO sailingAdventure.sailors(S_name, B_date, Rate) VALUES(?,?,?)`;

    let values = [];
    values = [obj.S_name,new Date(obj.B_date),obj.Rate];

    db.query(sql,values,(err,results)=>{
        if (err) {
            cb(500,"internal error");
        };
        cb(200,"sailor added");
        
    });
    }


exports.display = function(db,cb){
    let sql = "SELECT * FROM sailingAdventure.sailors";
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
    let sql = "DELETE FROM sailingAdventure.sailors WHERE S_id = ?";
    let values = [obj.S_id];
    db.query(sql,values,(err,results)=>{
        if (err) {
            cb(500,"internal error");
        };
        cb(200,"sailor deleted");
    });

}

exports.update = function(db,obj,cb){
    let sql =  `SELECT * FROM sailingAdventure.sailors WHERE S_id = \'${obj.S_id}\'`;
    let values = [obj.S_id];
    db.query(sql,(err,results)=>{
      if(err){
        cb(err.message);
      }else if (results && results.length === 0){
        cb('Sailor not found');
      }else{
        let keys = Object.keys(obj);
        const name = keys.includes('S_name')? obj.S_name:results[0].S_name;
        const date = keys.includes('B_date')? obj.B_date:results[0].B_date;
        const rate = keys.includes('Rate')? obj.Rate:results[0].Rate;

        sql = "UPDATE sailiingAdventure.sailors SET S_name = ?, B_date = ?, Rate = ?, WHERE S_id = ?";
        db.query(sql,[name,date,rate,obj,S_id],(err,results)=>{
            if(err) throw err 
                cb('sailor updated');
                //cb(results);
        })
      }
    });
    
    

}
