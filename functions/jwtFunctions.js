var key = "asdasfkajosbdhaisjlfakspkfljnbuqhip2ow3asdjnasl"
var jwt = require('jsonwebtoken');
var jwtFunctions = function(signKey){
    // Assign our generated Secret.
}

jwtFunctions.prototype = {

    createToken(data){
        return new Promise(function(fulfill , reject){
            jwt.sign(data, key, { expiresIn: '1h' }, function(error, token){
                if(error){
                    reject(error)
                }else{
                    fulfill(token)
                console.log("Token Created!");
                }
            });
            
        })

    },
    getPayload(token){
        return new Promise(function(fulfill, reject){
            jwt.verify(token, key, function(error, decodedPayload){
                if(error){
                    reject(error)
                }else{
                    fulfill(decodedPayload)
                }
            })
        })
    }



}
module.exports = jwtFunctions