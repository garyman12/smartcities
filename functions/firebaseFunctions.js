const db = require("../config/firebase");
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
        return new Promise(function(fulfill, reject){
        db.collection("users").where("email", "==" , dataBlock.email).where("password", "==", dataBlock.password).get().then(function(querySnapshot) {
            if(querySnapshot.docs.length == 0){
                reject(JSON.stringify({success: false , redirect: "/login"}))
            }else{
            querySnapshot.forEach(function(doc) {
                fulfill(JSON.stringify({success: true , redirect: "/dashboard"}))
        });
    }
    }).catch(function(error){
        console.log(error)
    })
})
    }

}

module.exports = firebaseFunctions;