import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = 'data.db';
@Component({
  selector: 'page-sqlite',
  templateUrl: 'sqlite.html'
})
export class SQLitePage {

    private db: SQLiteObject;

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.createDatabaseFile();
  }
  private createDatabaseFile():void{
    this.sqlite.create({
        name: DATABASE_FILE_NAME,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
            console.log('Bdd créée !');
            this.db = db;
            this.createTables();
      
      
        })
        .catch(e => console.log(e));
  }

  private createTables(): void{
    this.db.executeSql('CREATE TABLE `arts` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT, `check` INTEGER, `image` TEXT, `qrcode` INTEGER )', {})
    .then(() => console.log('Table créée'))
    .catch(e => console.log(e));
  }

}
