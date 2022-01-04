const request=require('request')

const weather=(latitude, longitude, callback)=>{
     const url ='http://api.weatherstack.com/current?access_key=c58c304b21171c34278e2fdb4c509cce&query=. '+ latitude + ',' + longitude + '&units=f'
     request({url, json:true },(error,{body}={})=>{
        if(error){
                    callback('Unable to connect')
            
                 }else if(body.error){
            
                     callback('Unable to find location')
                 }
                 else{   callback(undefined,body.current.weather_descriptions+ '. It is currently ' +body.current.temperature+ ' degrees out. There is a  '+body.current.precip+' % chance of rain')
            
            
                 }


    })
}
 module.exports= weather