import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('database.db')

export function create_DB_ToDo () {
    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists ToDoTable (id integer primary key not null, data text);"
        );
    })
    console.log("Base de datos creada")

}
export function insert_In_TableDB (data) {
    db.transaction(tx => {
        tx.executeSql(
            "insert into ToDoTable (data) values (?)",
            [data]
        );
        tx.executeSql("select * from ToDoTable", [], (_, { rows }) =>
        console.log("ToDo DB",JSON.stringify(rows))
      );
    });
}
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
}
export function delete_all_todo(){
    db.transaction(
        tx => {
          tx.executeSql(`delete from ToDoTable ;`);
          console.log("bd borrada")
        },
        null,
      )
}



