import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('database.db')

export function create_DB_ToDo () {
    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists task (id integer primary key not null, date text,startingDay boolean, endingDay boolean, color text, uid text);"
        );
    })
    console.log("Base de datos ToDo creada")

}
export function create_DB_infoTask () {
  db.transaction(tx => {
      tx.executeSql(
          "create table if not exists infotask (id integer primary key not null,title text, dateStart text,dateEnd text,color text, uid text,note text,friends text,songs text,groups text);"
      );
  })
  console.log("Base de datos infoTask creada")

}
export function create_DB_avatarUri () {
  db.transaction(tx => {
      tx.executeSql(
          "create table if not exists avatarUri (id integer primary key not null,email text,uri text );"
      );
  })
  console.log("Base de datos avatarUri creada")

}
export function insert_In_Periodics(date,startingDay,endingDay,color,token) {
    db.transaction(tx => {
        tx.executeSql(
            "insert into task (date,startingDay,endingDay,color,uid) values (?,?,?,?,?)",
            [date,startingDay,endingDay,color,token]
        );
        tx.executeSql("select * from task", [], (_, { rows }) =>
        console.log("ToDo DB",JSON.stringify(rows))
      );
    });
}
export function insert_In_infoTask(title,dateStart,dateEnd,color,token,note,friends,songs,groups) {
  db.transaction(tx => {
      tx.executeSql(
          "insert into infotask (title,dateStart,dateEnd,color,uid,note,friends,songs,groups) values (?,?,?,?,?,?,?,?,?)",
          [title,dateStart,dateEnd,color,token,note,friends,songs,groups]
      );
      tx.executeSql("select * from infotask", [], (_, { rows }) =>
      console.log("infotask DB",JSON.stringify(rows))
    );
  });
}

export function insert_In_avatarUri(email,uri) {
  db.transaction(tx => {
      tx.executeSql(
          "insert into avatarUri (email,uri) values (?,?)",
          [email,uri]
      );
      tx.executeSql("select * from avatarUri", [], (_, { rows }) =>
      console.log("avatarUri DB",JSON.stringify(rows))
    );
  });
}

export function select(){ 
  return new Promise((resolve, reject) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM task;', [], (tx, rows) => {
      //1 consulta general de datos de tabla 
      let results  = rows.rows._array;    
      console.log("result",results)
      let list_dates=[];
      //2 eliminamos la fechas repedidas 
      results.map((data,index)=>{         
        list_dates.push(data.date)
      }); 
      //limpiar valores repetidos
      Array.prototype.unique=function(a){
        return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
      });
     
      console.log( list_dates.unique() ); 
      //4 agrupamos
      let list_query = list_dates.unique();
      let obj_date ='';
      let group ='';
      let val = '';
      let array_group =[]
      list_query.map((date,index)=>{
        group =  groups(date).then((data) => {
          console.log("data select =>",data)
          let final= data.length
          let str = data.substring(1,final-1)      
          val =val.concat([str ]+ ',')
         return val
        })
       
      })
      group.then((groups) => {
      
          console.log("concatenacion",groups)
          let quit_coma = val.substring(0,groups.length - 1)
          let obj ="{"+quit_coma+"}"
          /* let final = JSON.parse(obj) */
          console.log("final",obj)
          resolve(obj);

      })
    
  
   
      
});

})
})
}

function groups(date){
  return new Promise((resolve, reject) => {
  db.transaction(tx => {
  tx.executeSql('SELECT * FROM task where date = ?;', [date], (tx, rows) => {
    /* console.log("fecha",date,"->",rows._array ) */
    /* console.log("fecha",date,"->",rows.rows._array)*/
    let objDate={
      [date]:{
      periods:rows.rows._array
    }}

    resolve(JSON.stringify(objDate))
})
})
})
}
/* 
export function select(){ 
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM ToDoTable;', [], (tx, rows) => {
            let results  = rows.rows._array;    
            console.log("result", results)
            let todo = [];
            let todoObj = {};
            let val = "";
            results.map((data,index)=>{         
              let final= data.data.length
              let str = data.data.substring(1,final-1)      
              val =val.concat([str ]+ ',')

            }); 
           
            let cosa = val.substring(0,val.length - 1)
            let obj = JSON.stringify("{"+cosa+"}")
            let final = JSON.parse(obj)
            console.log("final",final)
            resolve(final);
         
       
      });
    })
  })
} */
export function select_InfoTask(){ 
  return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM infotask;', [], (tx, rows) => {
          let result = rows.rows._array; 
          console.log("infotask",result)
          resolve(result);
       
     
    });
  })
})
} 
export function select_avatarUri(){ 
  return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM avatarUri;', [], (tx, rows) => {
          let result = rows.rows._array; 
          console.log("avatarUri select",result)
          resolve(result);
    });
  })
})
} 
export function delete_all_todo(){
    db.transaction(
        tx => {
          tx.executeSql("drop table if exists task");
          console.log("bd borrada")
          tx.executeSql("drop table if exists infotask");
          console.log("bd infotask")
          tx.executeSql("drop table if exists avatarUri");
          console.log("bd avatarUri")
        },
        null,
      )
}


export function closeDatabase(){
  if (db) {
    db._db.close();
  } else {
      console.log("Database no estaba abierta");
  }
}
