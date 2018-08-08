import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { AngularFireDatabase, AngularFireList, snapshotChanges} from 'angularfire2/database';
import {AlertController,ActionSheetController} from 'ionic-angular'
import { query } from '../../../node_modules/@angular/core/src/render3/instructions';


/**
 * Generated class for the CrudFirebaseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'crud-firebase',
  templateUrl: 'crud-firebase.html'
})
export class CrudFirebaseComponent implements OnInit {
  //itemsRef: AngularFireList<any[]>;
  //itemsRef: AngularFireList<any>;
 // items: Observable<any>
 itemValue:any[];
 items :AngularFireList<any>;

 songs: AngularFireList<any>;
 songsRef:AngularFireList<any>;

 rootRef:AngularFireList<any>; 
 documentsRef:AngularFireList<any>;
 documentsQuery:any;

  text: string;
  itemsRef: string;
  itemRef: string;

  orderForm: FormGroup;

  documentsForm: FormGroup;

  datas: any;

  item:any;

  public songsItem:Array<any> = [];


 

  constructor(private af: AngularFireDatabase, private formBuilder:FormBuilder,public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController) {
    console.log('Hello CrudFirebaseComponent Component');

    let that = this;
   
    this.itemsRef = '/documents';
    this.itemRef = '/document';
    //console.info('this.items',this.items.valueChanges().map ((items) => console.log(items)));
    this.rootRef = this.af.list(that.itemsRef);
    this.documentsRef = this.af.list(that.itemsRef+that.itemRef);
    this.documentsQuery = this.documentsRef.query.limitToFirst(3);
    
    
    console.log('this.rootRef',this.rootRef);
    console.log('this.documentsRef ',this.documentsRef )
    console.log('this.documentsQuery',this.documentsQuery)

    this.documentsForm = this.formBuilder.group({
      name: ['haloo'],
      quantity: 0
    });

    this.item =({
      name: ['test'],
      quantity: 0
    });

    /*this.songsItem =({
      id:'',
      title:''
    })*/
  
   console.log('this.documentsForm',this.documentsForm.controls.name.value);
   var count =0;
  
    this.af.list('/songs').query.on("child_added",function(snapshot) {
    count++
    console.log('var count',count);

    var newValue = snapshot.val();
    //that.songsItem[count] = snapshot.toJSON();
    that.songsItem.push(snapshot.toJSON());

  
    console.log(newValue);
    console.log('that.songsItem',that.songsItem);
    // This will be called exactly two times (unless there are less than two
    // dinosaurs in the Database).
  
    // It will also get fired again if one of the first two dinosaurs is
    // removed from the data set, as a new dinosaur will now be the second
    // shortest.
    //that.songs.snapshotChanges. = snapshot.key
    console.log('child_added songs snapshot ',snapshot);
    console.log('child_added songs snapshot val ',snapshot.val());
    console.log('child_added songs snapshot val ',snapshot.toJSON());
      //that.songsItem = snapshot.toJSON()
      /*snapshot.forEach(actions=>{
        var test = actions.val().id;
       console.log('test',test);
      console.info('this.songsItem',that.songsItem)
      });*/
    console.log('child_added songs snapshot.key',snapshot.key);
  });

  

}

  ngOnInit(){
    this.items = this.af.list(this.itemsRef)
    this.songs = this.af.list('/songs');

    this.songsRef = this.af.list('/songs');
    // Use snapshotChanges().map() to store the key
    /*this.songsItem = this.songsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });*/

   

    
    

      //this.items$ = this.af.list('/items')
    console.info(this.items)

    console.info('this.songsItem',this.songsItem)


    console.info(this.items.query.on("child_added", function(snapshot) {
      // This will be called exactly two times (unless there are less than two
      // dinosaurs in the Database).
    
      // It will also get fired again if one of the first two dinosaurs is
      // removed from the data set, as a new dinosaur will now be the second
      // shortest.
      console.log('child_added snapshot.key',snapshot.key);
    }));


    console.info(this.items.query.on("child_changed", function(snapshot) {
      // This will be called exactly two times (unless there are less than two
      // dinosaurs in the Database).
    
      // It will also get fired again if one of the first two dinosaurs is
      // removed from the data set, as a new dinosaur will now be the second
      // shortest.
      console.log('child_changed snapshot.key',snapshot.key);
    }));

    var that = this;
    this.items.query.once("value")
    
      .then(function(snapshot) {
        var name = snapshot.child(that.itemsRef).val(); // {first:"Ada",last:"Lovelace"}
        var firstName = snapshot.child(that.itemsRef+'/first').val(); // "Ada"
        var lastName = snapshot.child(that.itemsRef).child("last").val(); // "Lovelace"
        var quantity = snapshot.child("quantity").val(); // null

        console.log('name',name,firstName,lastName,quantity);
      });



      this.items.query.once("value")
      .then(function(snapshot) {
        var a = snapshot.exists();  // true
        var b = snapshot.child(that.itemsRef).exists(); // true
        var c = snapshot.child(that.itemsRef+'/first').exists(); // true
        var d = snapshot.child(that.itemsRef+'/last').exists(); // false

        console.log(a,b,c,d);
      });


      // Write and then read back a JavaScript object from the Database.
      this.items.set(this.itemRef,{ name: "0398.F091/4", quantity: 3 })
      .then(function() {
      return that.items.query.once("value");
      })
      .then(function(snapshot) {
        var data = snapshot.val();
        // data is { "name": "Ada", "age": 36 }
        // data.name === "Ada"
        // data.age === 36
        console.log('data',data);
        that.datas = data;
      });


      

    }

    addSong(){
      let prompt = this.alertCtrl.create({
        title: 'Song Name',
        message: "Enter a name for this new song you're so keen on adding",
        inputs: [
          {
            name: 'title',
            placeholder: 'Title'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              const newSongRef = this.songs.push({});
             //this.af.list(this.itemRef).push({name: name, quantity: quantity });
              newSongRef.set({
                id: newSongRef.key,
                title: data.title
              });
            }
          }
        ]
      });
      prompt.present();
    }

    showOptions(songId, songTitle) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'What do you want to do?',
        buttons: [
          {
            text: 'Delete Song',
            role: 'destructive',
            handler: () => {
              this.removeSong(songId);
            }
          },{
            text: 'Update title',
            handler: () => {
              this.updateSong(songId, songTitle);
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }

    removeSong(songId: string){
      this.songs.remove(songId);
    }

    updateSong(songId, songTitle){
      let prompt = this.alertCtrl.create({
        title: 'Song Name',
        message: "Update the name for this song",
        inputs: [
          {
            name: 'title',
            placeholder: 'Title',
            value: songTitle
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              this.songs.update(songId, {
                title: data.title
              });
            }
          }
        ]
      });
      prompt.present();
    }
    

  
  pushItem(name,quantity) :void
  {
    let count;
    this.af.list(this.itemRef+count).push({name: name, quantity: quantity });
    //this.items.push({name: name, quantity: quantity });
    //this.itemValue ='';
    
    
  }
  addItem(name,quantity): void {
    //var messageListRef = this.documentsRef;
    let that = this;
    this.items.set(this.itemRef,{ name: name, quantity: quantity })
    .then(function() {
      console.log('Synchronization succeeded');
      return that.items.query.once("value");
    })
    .then(function(snapshot) {
      var data = snapshot.val();
      // data is { "name": "Ada", "age": 36 }
      // data.name === "Ada"
      // data.age === 36
      console.log('data',data);
      that.datas = data;
    })
    .catch(function(error) {
      console.log('Synchronization failed');
    });


  }
  
  toggleDone(item: any): void {
    this.af.object('/items/' + item.$key)
      .update({ content: item.content, done: !item.done });
  }
  updateitem(item: any, newValue: string): void {
    this.af.object('/items/' + item.$key)
      .update({ content: newValue, done: item.done });    
  }

  deleteitem(item: any): void {
    this.af.object( this.itemsRef +  this.itemRef).remove();
  }

}
