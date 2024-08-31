export default function AlertMarker(props) {

    // export default function AlertMarker(data) {
   // const lat = data.locationData.latitude
   // const long = data.locationData.longitude
   // console.log(data.locationData)
   // <img  className="alert--img" src={data.img} alt="something"/>

   
 return (
   <div className='alert--marker'>
       <ul>
           <h4>{props.title}</h4>
           <h5>{props.description}</h5>
           <h5>{props.latitude} - {props.longtitude}</h5> 
           <h5>{props.postedBy}</h5>

       </ul>   
        
           
   </div>
 )
}

