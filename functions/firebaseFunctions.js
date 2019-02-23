import db from "../config/firebase";
var ref = db.database().ref("users");
var firebaseFunctions = function(){

}

firebaseFunctions.prototype = {

    createUser(dataBlock){
        db.collection("users").add({
            age: dataBlock.age,
            nameFirst: dataBlock.nameFirst,
            nameLast: dataBlock.nameLast,
            email: dataBlock.email,
            zipCode: dataBlock.zipCode,
            password: dataBlock.password

        }).then(function(docRef) {
            console.log("Created user in firebase Storage with ID: ", docRef.id);
        }).catch(function(error){
            console.log("User creation function threw error: ", error);
        })
    },

    authenticateUser(dataBlock){
        ref.orderByChild('email').equalTo(dataBlock.email).on("value", function(snapshot) {
            console.log(snapshot.val());
            snapshot.forEach(function(data) {
                console.log(data.key);
            });
        });
    }

}