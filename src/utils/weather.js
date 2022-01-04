const request=require('request')

const weather=(latitude, longitude, callback)=>{
     const url ='http://api.weatherstack.com/current?access_key=c58c304b21171c34278e2fdb4c509cce&query=. '+ latitude + ',' + longitude
     request({url, json:true },(error,{body}={})=>{
        if(error){
                    callback('Unable to connect')
            
                 }else if(body.error){
            
                     callback('Unable to find location')
                 }
                 else{   callback(undefined,'Sky is '+body.current.weather_descriptions+ '. It is currently ' +body.current.temperature+ ' degrees celsius out. The humidity is '+body.current.humidity+'%.')
            
            
                 }


    })
}
 module.exports= weather