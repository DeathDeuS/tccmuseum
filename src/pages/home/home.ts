import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = 'tccmuseum.db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  tabBarElement: any;
  splash = true;
  private db: SQLiteObject;
  public total ;
  public event = [];
  public nb_checked;

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.tabBarElement = document.querySelector('.tabbar');
    this.createDatabaseFile();
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
    }, 4000);
  }
  
  private createDatabaseFile():void{
    this.sqlite.create({/*  */
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
    this.db.executeSql(' CREATE TABLE if not exists "arts" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `image` TEXT, `name` TEXT, `qrcode` INTEGER ,  `viewed` INTEGER )', {})
    .then((table) => {
      if(table.rows.length == 20){
        
      } else {
        console.log('Table "arts" créée');
        this.insertTableValues();
      }
      this.getArts();
    })
    .catch(e => console.log(e));
  }

   public insertTableValues(): void {
    this.db.executeSql('INSERT INTO "arts" values (1,  "photo", "Jean-Pierre ALVAREZ", 9213750369, 0),' +
    ' (2, "photo", "Poeragni ARAI", 6510403686, 0),' +
    ' (3, "photo", "Jerôme CHANSIN", 7216899933, 0),' +
    ' (4, "photo", "Jonas CHEUNG-SEN", 1629568455, 0),' +
    ' (5, "photo", "Heimana CUNY", 9266553664, 0),' +
    ' (6, "photo", "Nicola EBB", 1168085824, 0),' +
    ' (7, "photo", "Alexandre LEHARTEL", 2791010818, 0),' +
    ' (8, "photo", "Tetuaoro LENOIR", 4173047359, 0),' +
    ' (9, "photo","Manaarii LONGINE", 9782420312, 0),' +
    ' (10, "photo", "Joane LY", 6872232276, 0),' +
    ' (11, "photo", "Vaitare MONACO", 4653519064, 0),' +
    ' (12, "photo", "Ariipaea PAEAHI", 3658034121, 0),' +
    ' (13, "photo", "Aito PAMBRUN", 5175547403, 0),' +
    ' (14, "photo", "Hiomai PAMBRUN", 9520532017, 0),' +
    ' (15, "photo", "Rahiti PEREZ", 1228597258, 0),' +
    ' (16, "photo", "Matihamu PERRY", 5480211371, 0),' +
    ' (17, "photo", "Christian ROUSSEL", 2462643924, 0),' +
    ' (18, "photo","Tinirau TEHUPE", 5055364030, 0),' +
    ' (19, "photo","Tinirau TEMATAHOTOA", 6232447902, 0),' +
    ' (20, "photo", "Teparii TOOFA", 4235066246, 0);', {})
    .then(() => {
      console.log('insertion faite');
      
    })
    .catch(e => console.log(e));
  } 

  public getArts(){
    this.db.executeSql('SELECT image, name, qrcode, viewed  FROM "arts"', {})
    .then((data) => {
      this.total = data.rows.length; //nombre total d'oeuvres
        console.log(data.rows.item(0));
            console.log('data recupere avec getArts');
        if(data == null) {

            console.log('data null');
            return;
        }
            if(data.rows.length > 0 ) {
                console.log('data length :', data.rows.length );
                for(var i = 0; i < data.rows.length; i++)
                    {this.event.push(data.rows.item(i));
                  console.log('nom :', data.rows.item(i).name);};
                
            }
           this.nb_checked = this.db.executeSql('SELECT qrcode, count(*) as nb_checked from arts', {});
    });
    
}


}
