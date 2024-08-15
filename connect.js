const mysql = require ('mysql2');
const http = require ('http');
const {url} = require('url');
const sailors = require('./lib/sailors.js');
const boats = require('./lib/boats.js');
const reserves = require('./lib/reserves.js');

let db = mysql.createConnection({
    host :'localhost',
    user : 'root',
    password :'password1234'
});

db.connect((err)=>{
    if(err){
        return console.log('error:' + err.message);
    }
    console.log('connect to the mySQL server.');
});

//db.end((err)=>{
  //  if(err){
    //    return console.log('error:'+err.message);
    //}
    //console.log('close the database conection.');
//});


let database = "CREATE DATABASE IF NOT EXISTs sailingAdventure";
db.query(database,(err)=>{
    if(err)throw err;
    console.log('database created');
});

database = "CREATE TABLE IF NOT EXISTS sailingAdventure.sailors("
+ "S_id INT AUTO_INCREMENT PRIMARY KEY,"
+ "S_name VARCHAR(255),"
+ "B_date DATE,"
+ "Rate INT)";
db.query(database,(err)=>{
    if(err)throw err;
    console.log('sailor table created');
});

database = "CREATE TABLE IF NOT EXISTS sailingAdventure.boats("
+ "B_id INT AUTO_INCREMENT PRIMARY KEY,"
+ "B_name VARCHAR(255),"
+ "B_type VARCHAR(255))";

db.query(database,(err)=>{
    if(err)throw err;
    console.log('boat table created');
});

database = "CREATE TABLE IF NOT EXISTS sailingAdventure.reserves("
+ "S_id INT NOT NULL,"
+ "B_id INT NOT NULL,"
+ "Date DATE NOT NULL,"
+ "PRIMARY KEY(S_id,B_id,Date),"
+ "CONSTRAINT FOREIGN KEY (S_id) REFERENCES sailors(S_id) ON UPDATE CASCADE ON DELETE CASCADE,"
+ "CONSTRAINT FOREIGN KEY (B_id) REFERENCES boats(B_id) ON UPDATE CASCADE ON DELETE CASCADE)";

db.query(database,(err)=>{
    if(err)throw err;
    console.log('reserve table created');
});



//createing server 
//chagne pathname for each table???
//Handlers


const requestHandler = function (req, res){
    const baseURL = 'http://'+ req.headers.host + '/'; 
    //get the untrimed pathname from the url
    //Get the query string as an object
    const {pathname,searchParams} = new URL(req.url, baseURL); 
    //let table = pathname;
    let entries = searchParams.entries();
    let obj = Object.fromEntries(entries);
    

    //Get the HTTP method
    const method = req.method.toUpperCase();

    //Route based on the request method
    switch (method){
        case 'GET': if(pathname === '/sailors' || pathname === '/sailors/' ){
                        sailors.display(db,(statusCode,results)=>{
                            const resStr=results.map((element)=>
                            {
                                const values=Object.values(element);
                                return values.join(' ');
                            }).join("\n");

                            res.setHeader('content-type','text/plain; charset = "utf8');
                            res.writeHead(statuscode);

                            res.end(resStr);
                        });
                     } else if(pathname === '/boats' || pathname === '/boats/' ){
                        boats.display(db,(statusCode,results)=>{
                            const resStr=results.map((element)=>
                            {
                                const values=Object.values(element);
                                return values.join(' ');
                            }).join("\n");
                            res.setHeader('content-type','text/plain; charset = "utf8');
                            res.writeHead(statuscode);
                      
                            res.end(results);
                        });
                    
                     }else if (pathname === '/reserves' || pathname === '/reserves/' ){
                        reserves.display(db, (statuscode, results)=>{
                            res.setHeader('content-type','text/plain; charset = "utf8');
                            res.writeHead(statuscode);
                            
                            res.end(results);
                        });
                    
                    }else {
                        res.end("Bad request!");
                        }
                    
                break;

        case 'POST': if(pathname === '/sailors' || pathname === '/sailors/' ){
                        sailors.add(db, obj, (statuscode, results)=>{
                            res.setHeader('content-type','text/plain; charset = "utf8');
                            res.writeHead(statuscode);
                            
                            res.end(JSON.stringify(results));
                    });
                    }else if(pathname === '/boats' || pathname === '/boats/' ){
                        boats.add(db, obj, (statuscode,results)=>{
                            res.setHeader('content-type','text/plain; charset = "utf8');
                            res.writeHead(statuscode);
                            
                            res.end(JSON.stringify(results));
                        });
                    
                    }else if(pathname === '/reserves' || pathname === '/reserves/' ){
                        reserves.add(db, obj, (statusCode,results)=>{
                            res.setHeader('content-type','text/plain; charset = "utf8');
                            res.writeHead(statuscode);
                            res.end(JSON.stringify(results));
                        });
                    
                    }else{
                        res.end("Bad request!");
                        }
                    
                break;

        case'DELETE': if(pathname === '/sailors' || pathname === '/sailors/' ){
                        sailors.delete(db, obj, (statusCode,results)=>{
                            
                            res.setHeader('content-type','text/plain; charset = "utf8');
                            res.writeHead(statuscode);
                            res.end(JSON.stringify(results));
                    });
                    }else if(pathname === '/boats' || pathname === '/boats/' ){
                        boats.delete(db, obj, (statusCode,results)=>{
                            res.setHeader('content-type','text/plain; charset = "utf8');
                            res.writeHead(statuscode);
                            res.end(JSON.stringify(results));
                    });
                    
                    }else if(pathname === '/reserves' || pathname === '/reserves/' ){
                        reserves.delete(db, obj, (statuscode,results)=>{
                            
                            res.setHeader('content-type','text/plain; charset = "utf8');
                            res.writeHead(statuscode);
                            res.end(JSON.stringify(results));
                         });
                    
                    }else {
                        res.statusCode = 404;
                        res.end("Bad request!");
                    }
                    break;
        case 'PUT': if(pathname === '/sailors' || pathname === '/sailors/' ){
                        sailors.update(db, obj, (statuscode,results)=>{
                           
                            res.setHeader('content-type','text/plain; charset = "utf8');
                            res.writeHead(statuscode);
                            res.end(results);
                    });
                    }else if(pathname === '/boats' || pathname === '/boats/' ){
                        boats.update(db, obj, (statusCode,results)=>{
                            
                           res.setHeader('content-type','text/plain; charset = "utf8');
                           res.writeHead(statuscode);
                            res.end(JSON.stringify(results));
                    });
                    
                    } else {
                        res.statusCode = 404;
                        res.end("Invalid path");
                    }
                    break;
    }
}

const server = http.createServer(requestHandler);
server.listen(3030, function(){
    console.log('Server running on port 3030 ....');
});
