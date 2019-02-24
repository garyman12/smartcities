const db = require("../config/firebase");
var firebaseFunctions = function(){

}

firebaseFunctions.prototype = {

    createUser(dataBlock){
        return new Promise(function(fulfill, reject){
            console.log(dataBlock)
        
        db.collection("users").add({
            age: dataBlock.age,
            nameFirst: dataBlock.nameFirst,
            nameLast: dataBlock.nameLast,
            email: dataBlock.email,
            zipCode: dataBlock.zipCode,
            password: dataBlock.password

        }).then(function(docRef) {
            console.log(docRef)
            fulfill(JSON.stringify({success: true, redirect: "/login" }))
        }).catch(function(error){
            console.log(error)
            reject(JSON.stringify({success: false, redirect: "/register"}))
        })
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
},
    createRequest(dataBlock){
        return new Promise(function(fulfill, reject){

       
        db.collection("helpRequests").add({
            body: dataBlock.description,
            title: dataBlock.title,
            image: dataBlock.image,
            userID: dataBlock.userID,
            location: dataBlock.location
        }).then(function(result){
            fulfill(JSON.stringify({success: true, redirect: "/dashboard"}))
        }).catch(function(error){
            reject(JSON.stringify({success: false, redirect: "/dashboard"}))
        })
    })
    }

}

module.exports = firebaseFunctions;