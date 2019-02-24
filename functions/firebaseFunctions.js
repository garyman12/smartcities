const db = require("../config/firebase");
var jwtFunctions = require("./jwtFunctions");
var firebaseFunctions = function() {};
var jwtInteractor = new jwtFunctions();
firebaseFunctions.prototype = {
  createUser(dataBlock) {
    return new Promise(function(fulfill, reject) {
      console.log(dataBlock);

      db.collection("users")
        .add({
          age: dataBlock.age,
          nameFirst: dataBlock.nameFirst,
          nameLast: dataBlock.nameLast,
          email: dataBlock.email,
          zipCode: dataBlock.zipCode,
          password: dataBlock.password,
          reward: 0
        })
        .then(function(docRef) {
          console.log(docRef);
          fulfill(JSON.stringify({ success: true, redirect: "/login" }));
        })
        .catch(function(error) {
          console.log(error);
          reject(JSON.stringify({ success: false, redirect: "/register" }));
        });
    });
  },

  authenticateUser(dataBlock) {
    return new Promise(function(fulfill, reject) {
      db.collection("users")
        .where("email", "==", dataBlock.email)
        .where("password", "==", dataBlock.password)
        .get()
        .then(function(querySnapshot) {
          if (querySnapshot.docs.length == 0) {
            reject(JSON.stringify({ success: false, redirect: "/login" }));
          } else {
            querySnapshot.forEach(function(doc) {
              userData = doc.data();
              jwtInteractor
                .createToken({
                  email: userData.email,
                  userID: doc.id,
                  nameFirst: userData.nameFirst
                })
                .then(function(result) {
                  fulfill(
                    JSON.stringify({
                      success: true,
                      redirect: "/dashboard",
                      jwtInfo: result
                    })
                  );
                });
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  },
  createRequest(dataBlock) {
      console.log(dataBlock.category)
    return new Promise(function(fulfill, reject) {
      db.collection("helpRequests")
        .add({
          body: dataBlock.description,
          title: dataBlock.title,
          image: dataBlock.imgURL,
          userID: dataBlock.userID,
          latitude: dataBlock.latitude,
          longitude: dataBlock.longitude,
          category: dataBlock.category,
          finished: false,
          completedID: "",
          rank: 1
        })
        .then(function(docRef) {
          console.log(docRef);
          fulfill(JSON.stringify({ success: true, redirect: "/" }));
        })
        .catch(function(error) {
          console.log(error);
          reject(JSON.stringify({ success: false, redirect: "/" }));
        });
    });
  },
  getRequests() {
    return new Promise(function(fulfill, reject) {
      results = new Array();
      db.collection("helpRequests")
        .where("finished", "==", false)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.data());
            results.push({ ID: doc.id, data: doc.data() });
          });
        })
        .then(function() {
          fulfill(results);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  getExactRequest(dataBlock) {
    return new Promise(function(fulfill, reject) {
      db.collection("helpRequests")
        .doc(dataBlock)
        .get()
        .then(function(result) {
          fulfill(JSON.stringify({ success: true, data: result.data() }));
        })
        .catch(function(error) {
          fulfill(JSON.stringify({ success: false }));
        });
    });
  },
  markComplete(dataBlock) {
    var points;
    return new Promise(function(fulfill, reject) {
      db.collection("users")
        .doc(dataBlock.completedBy)
        .get()
        .then(function(result) {
          block = result.data();
          console.log(block.reward);
          points = block.reward;
        });
      db.collection("helpRequests")
        .doc(dataBlock.docID)
        .update({
          finished: true,
          completedID: dataBlock.completedBy
        })
        .then(function() {
          db.collection("users")
            .doc(dataBlock.completedBy)
            .update({
              reward: points + 10
            });
        })
        .then(function() {
          fulfill(JSON.stringify({ success: true, redirect: "/dashboard" }));
        })
        .catch(function(error) {
          fulfill(JSON.stringify({ success: false, redirect: "/dashboard" }));
        });
    });
  },
  getInfo(userID) {
    return new Promise(function(fulfill, reject) {
      db.collection("users")
        .doc(userID)
        .get()
        .then(function(result) {
          fulfill(result.data());
        })
        .catch(function(error) {
          reject(JSON.stringify({ success: false, redirect: "/dashboard" }));
        });
    });
  },
  getInfobyEmail(email) {
    console.log(email);
    return new Promise(function(fulfill, reject) {
      db.collection("users")
        .where("email", "==", email)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            fulfill(JSON.stringify({ data: doc.data(), id: doc.id }));
          });
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  getInfobyJWT(JWT) {
    return new Promise(function(fulfill, reject) {
      jwtInteractor
        .getPayload(JWT)
        .then(function(result) {
          console.log(result.userID);
          db.collection("users")
            .doc(result.userID)
            .get()
            .then(function(doc) {
              fulfill(
                JSON.stringify({ success: true, data: doc.data(), ID: doc.id })
              );
            })
            .catch(function(error) {
              console.log(error);
              reject(
                JSON.stringify({ success: false, redirect: "/dashboard" })
              );
            });
        })
        .catch(function(error) {
          console.log(error);
          reject(JSON.stringify({ success: false, redirect: "/dashboard" }));
        });
    });
  }
};

module.exports = firebaseFunctions;
