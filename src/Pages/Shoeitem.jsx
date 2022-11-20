 const Shoes = ({shoe}) => {
    return (
        <div>
        <h3>{shoe.name}</h3>
         <p>{shoe.price}</p>
         <img src={shoe.avatar} alt=""/>
   </div> )
}
export default Shoes