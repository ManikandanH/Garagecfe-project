import * as firebase from 'firebase';

export class MyService {

  constructor() {}

  items(item) {
    if (item.category === "Juices") {
      return firebase.
      database().ref('items/Juices').child(item.name)
        .set({
          name: item.name,
          category: item.category,
          price: item.price,
        });
    } else if (item.category === "Chats") {
      return firebase.database().ref('items/Chats').child(item.name)
        .set({
          name: item.name,
          category: item.category,
          price: item.price,
        });
    } else if(item.category === 'Shawarma'){
      return firebase.database().ref('items/Shawarma').child(item.name)
        .set({
          name: item.name,
          category:item.category,
          price: item.price,
        })
    } else {
      return firebase.database().ref('items/Grill').child(item.name)
        .set({
          name: item.name,
          category: item.category,
          price: item.price,
        });
    }
  }
 
  stats(stats,date,time) {
    return firebase.database().ref('stats').child(date).child(time)
    .set({
      item: stats
    })
  }

  billNumber(count) {
    return firebase.database().ref('billNumber').set({
      billNo : count
    })
  }

  getBillNumber() {
    return firebase.database().ref('billNumber');
  }

  getDate(date) {
    return firebase.database().ref('stats').child(date);
  }

  getCategory(date,category) {
    return firebase.database().ref('stats').child(date).child(category);
  }
  juiceItems() {
      return firebase.database().ref('items/Juices');
  }

  grillItems(){
      return firebase.database().ref('items/Grill');
  }

  chatItems(){
      return firebase.database().ref('items/Chats');
  }
  shawarmaItems(){
    return firebase.database().ref('items/Shawarma');
  }
}
