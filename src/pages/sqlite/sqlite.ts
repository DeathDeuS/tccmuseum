import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = 'tccmuseum.db';
 
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
            this.createTable();
      
      
        })
        .catch(e => console.log(e));
  }

  private createTable(): void{
    this.db.executeSql(' CREATE TABLE if not exists "arts" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT, `image` TEXT, `viewed` INTEGER, `qrcode` INTEGER )', {})
    .then(() => {
                  console.log('Table "arts" créée');
                  this.insertTableValues();
                 })
    .catch(e => console.log(e));
  }

   public insertTableValues(): void {
    this.db.executeSql('INSERT INTO "arts" (image, name, qrcode, viewed ) values ( "photo", "Jean-Pierre ALVAREZ", 272727, 0),' +
    ' ("photo", "Poeragni ARAI", 6510403686, 0),' +
    ' ("photo", "Jerôme CHANSIN", 7216899933, 0),' +
    ' ("photo", "Jonas CHEUNG-SEN", 1629568455, 0),' +
    ' ("photo", "Heimana CUNY", 9266553664, 0),' +
    ' ("photo", "Nicola EBB", 1168085824, 0),' +
    ' ("photo", "Alexandre LEHARTEL", 2791010818, 0),' +
    ' ("photo", "Tetuaoro LENOIR", 4173047359, 0),' +
    ' ("photo","Manaarii LONGINE", 9782420312, 0),' +
    ' ("photo", "Joane LY", 6872232276, 0),' +
    ' ("photo", "Vaitare MONACO", 4653519064, 0),' +
    ' ("photo", "Ariipaea PAEAHI", 3658034121, 0),' +
    ' ("photo", "Aito PAMBRUN", 5175547403, 0),' +
    ' ("photo", "Hiomai PAMBRUN", 9520532017, 0),' +
    ' ("photo", "Rahiti PEREZ", 1228597258, 0),' +
    ' ("photo", "Matihamu PERRY", 5480211371, 0),' +
    ' ("photo", "Christian ROUSSEL", 2462643924, 0),' +
    ' ("photo","Tinirau TEHUPE", 5055364030, 0),' +
    ' ("photo","Tinirau TEMATAHOTOA", 6232447902, 0),' +
    ' ("photo", "Teparii TOOFA", 4235066246, 0);', {})
    .then(() => {
      console.log('insertion faite');
      this.getArts();}
  )
    .catch(e => console.log(e));
  } 

  public getArts(){
    this.db.executeSql('SELECT * FROM `arts`', {})
    .then((data) => {
        console.log('taille data',data.rows.length);
        let event = [];
        console.log('data : ', data);
        console.log(data.rows.item[0]);
        if(data == null) {
            console.log('data null');
            return;
        }
            if(data.rows.length > 0 ) {
                console.log('data lenght');
                for(var i = 0; i < data.rows.length; i++){
                    event.push(data.rows.item(i).lastname);
                    console.log('for',event);
                }
            }
    });
}
}
