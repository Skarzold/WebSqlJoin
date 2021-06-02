export class Handler {
  /**
   * class through which all database transactions should be done.
   * This will allow us to move to sqlite3 as quickly as possible when we get
   * that functionality.
   */

  static db = (<any>window).openDatabase(
    'stats',
    '1.0',
    'maths',
    5 * Math.pow(10, 7) /*50mb*/
  );

  /**
   *
   * @param {string[]} sqlStrings each sql statement you want to execute in the transaction
   * @param {string[][]} variables each set of variables you want substituted in the sql string of the same index.
   * @param {function[]} callbacks  the callback function that you want to be called for that sql statement
   * @param {function[]} callbacksFail  the callback function that you want to be called for that sql statement
   */
  static executeSqlTransation(
    sqlStrings: String[],
    variables: String[][],
    callbacks: Function[],
    callBacksFail: Function[]
  ): void {
    this.db.transaction(function (tx: any) {
      for (var i = 0; i < sqlStrings.length; i++) {
        tx.executeSql(
          sqlStrings[i].replace(/(\r\n|\n|\r)/gm, ''),
          variables[i],
          callbacks[i],
          callBacksFail[i]
        );
      }
    });
  }
  strings = [
    'CREATE TABLE IF NOT EXISTS Hero_Table (id unique, gid, Accuracy)',
    'CREATE TABLE IF NOT EXISTS Accuracy_Table (gid unique, Victory, Accuracy)',
    'insert into Hero_Table( ?, ?, ?',
    'insert into Hero_Table( ?, ?, ?)',
    'insert into Hero_Table( ?, ?, ?)',
    'insert into Hero_Table( ?, ?, ?)',
    'insert into Hero_Table( ?, ?, ?)',
    'insert into Accuracy_Table( ?, ?,? )',
    'insert into Accuracy_Table( ?, ?, ?)',
    'insert into Accuracy_Table( ?, ?, ?)',
    'insert into Accuracy_Table( ?, ?, ?)',
    'SELECT Hero_Table.gid, Accuracy_Table.Accuracy,Accuracy_Table.Victory FROM Hero_Table INNER JOIN Accuracy_Table ON Hero_Table.gid=Accuracy_Table.gid'
  ];
  vars = [
    [],
    [],
    [1, 1, 44],
    [2, 1, 44],
    [1, 2, 37],
    [2, 3, 48],
    [1, 4, 32],
    [1, 1, 44],
    [2, 0, 37],
    [3, 1, 48],
    [4, 1, 32],
  ];
  cbs=[ 
      ()=>console.log("created heroes table"),
      ()=>console.log("created accuracy table"),
      ()=>console.log("created first hero"),
      ()=>console.log("created second hero"),
      ()=>console.log("created third hero"),
      ()=>console.log("created fourfth hero"),
      ()=>console.log("recorded first game"),
      ()=>console.log("recorded second game"),
      ()=>console.log("recorded third game"),
      ()=>console.log("recorded fourfth game"),
      ()=>console.log("returned all heroes a game was won with, and relevant records"),
  ]
  cbfs=[
    ()=>console.log("failed at creating heroes table"),
    ()=>console.log("failed at creating accuracy table"),
    ()=>console.log("failed at creating first hero"),
    ()=>console.log("failed at creating second hero"),
    ()=>console.log("failed at creating third hero"),
    ()=>console.log("failed at creating fourfth hero"),
    ()=>console.log("failed at recording first game"),
    ()=>console.log("failed at recording second game"),
    ()=>console.log("failed at recording third game"),
    ()=>console.log("failed at recording fourfth game"),
    ()=>console.log("Failed to return relevant records"),
  ]
  
  /**
   *
   * @param {string} sqlStrings the sql statement you want to execute
   * @param {string[]} variables the set of variables you want subsititured in the sql string.
   * @param {function} callback  the callback function that you want to be called for that sql statement
   * @param {function[]} callbackFail  the callback function that you want to be called for that sql statement
   
  static executeSqlStatement(
    sqlString: String,
    variables: String[],
    callback: Function,
    callBackFail: Function
  ): void {
    this.db.transaction(function (tx: any) {
      tx.executeSql(
        sqlString.replace(/(\r\n|\n|\r)/gm, ''),
        variables,
        callback,
        callBackFail
      );
    });
  }*/
}
