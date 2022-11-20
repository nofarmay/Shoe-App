import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

export default function ShoePage(props) {
    const shoeid = useParams()
    const [specificShoeData, setSpecificShoeData] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [brand, setBrand] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")





    useEffect(() => {

        const fetchDataForId = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`https://637389a9348e9472990f6169.mockapi.io/shoes/${shoeid.shoeid}`);
                setSpecificShoeData(data);
                setIsLoading(false);


            } catch (e) {
                setErrorMessage(e.message);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 1500);
            }
        };
        fetchDataForId();
    }, [shoeid,isEditing]);

    //*delete*//
    const handleDelete = async (shoeid) => {
        try {
            const { data } = await axios.delete(
                `https://637389a9348e9472990f6169.mockapi.io/shoes/${shoeid.shoeid}`
            );
                console.log(data);
        } catch (e) {
            setErrorMessage(e.message);
            setTimeout(() => {
                setErrorMessage(null);
            }, 30000);
        }
        setIsDeleted(true)
    };


    //* edit*//
    function handleEditClick(shoeid) {
        setIsEditing(true)
        setBrand(specificShoeData.brand)
        setName(specificShoeData.name)
        setPrice(specificShoeData.price)
        setImage(specificShoeData.image)
    }


    function handleEditSubmit(e) {
        e.preventDefault();
        handleUpdate(shoeid)
    }

    async function handleUpdate() {
        try {
            const { data } = await axios.put(`https://637389a9348e9472990f6169.mockapi.io/shoes/${shoeid.shoeid}`, {
                brand: brand,
                name: name,
                price: price,
                image: image
            });
            console.log(data);
            setIsEditing(false)
        } catch (e) {
            setErrorMessage(e.message);
            setTimeout(() => {
                setErrorMessage(null);
            }, 1500);
        }

    }




    return (<div className="shoePage">
        {isEditing ? <form onSubmit={handleEditSubmit}>
            <label htmlFor="brand"> Brand</label>
            <input type="text" value={brand} onChange={({ target: { value } }) => setBrand(value)}></input>
            <label htmlFor="name"> Name</label>
            <input type="text" value={name} onChange={({ target: { value } }) => setName(value)}></input>
            <label htmlFor="price"> Price</label>
            <input type="number" name="price" value={price} onChange={({ target: { value } }) => setPrice(value)}></input>
            <label htmlFor="image"> Image</label>
            <input type="text" name="image" value={image} onChange={({ target: { value } }) => setImage(value)}></input>
            <button type="submit">Save</button>
            <button onClick={() => setIsEditing(false)}>cancel</button>
        </form> : ""}
        {isLoading && <h1 className='spinner'>loading</h1>}
        {errorMessage ? <h4>{errorMessage}</h4> : ""}
        {specificShoeData.length !== 0 && !isEditing ?
            <div className="shoePageDiv">
                <h3>{specificShoeData.brand}</h3>
                <h3>{specificShoeData.name}</h3>
                <h3>price:{specificShoeData.price}$</h3>
                <img src={specificShoeData.image} alt="" width="350px" ></img>
                <button onClick={() => { handleEditClick(shoeid) }}>edit</button>
                <button onClick={() => {
                    handleDelete(shoeid);
                }}>delete</button>
            </div> : ""
        }
        {isDeleted ? <div> <h4>Item deleted successfully</h4>
            <Link to='/shoes/'>Return to All shoes</Link>
        </div>
            : ""}



    </div>)
}