import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';



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

 rootRef:AngularFireList<any>; 
 documentsRef:AngularFireList<any>;
 documentsQuery:any;

  text: string;
  itemsRef: string;
  itemRef: string;

  orderForm: FormGroup;

  documentsForm: FormGroup;

  datas: any;


 

  constructor(private af: AngularFireDatabase, private formBuilder:FormBuilder) {
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
  
   console.log('this.documentsForm',this.documentsForm.controls.name.value);

  }


  ngOnInit(){
    this.items = this.af.list(this.itemsRef)

    
    

      //this.items$ = this.af.list('/items')
    console.info(this.items)


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

  
  inFormation()
  {
    //this.af.list('/items').push({content: this.itemValue});
    //this.itemValue ='';
    console.info('child_changed',this.items.valueChanges(['child_changed']))
    console.info('child_added',this.items.valueChanges(['child_added']).map(result => console.log('chnged')));
  }
  additem(name,quantity): void {
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
