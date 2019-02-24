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
            location: dataBlock.location,
            finished: false,
            completedID: "",
            rank: 1

        }).then(function(result){
            fulfill(JSON.stringify({success: true, redirect: "/dashboard"}))
        }).catch(function(error){
            reject(JSON.stringify({success: false, redirect: "/dashboard"}))
        })
    })
    },
    getRequests(){
        return new Promise(function(fulfill, reject){
            results = new Array()
            db.collection("helpRequests").where("finished", "==", false).get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                    console.log(doc.data())
                    results.push(doc.data())
                 })
            }).then(function(){
                fulfill(results)
            }).catch(function(error){
                reject(error)
            })
        })
    },
    markComplete(dataBlock){
        return new Promise(function(fulfill, reject){

        db.collection("helpRequests").doc(dataBlock.docID).update({
            finished: true,
            completedID: dataBlock.completedBy
        }).then(function(){
            fulfill(JSON.stringify({success: true, redirect: "/dashboard"}))
        }).catch(function(error){
            fulfill(JSON.stringify({success: false, redirect: "/dashboard"}))
        })
    })
    }

}

module.exports = firebaseFunctions;