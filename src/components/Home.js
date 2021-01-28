import React, {useEffect, useState} from "react";
import socketIOClient from "socket.io-client/dist/socket.io";
import {Link} from "react-router-dom";
const ENDPOINT = "https://poject-sahara-api.vercel.app/";

function Home() {

   const [response, setResponse] = useState([]);
   const [formDataName, setFormDataName] = useState('')
   const [formDataQuote, setFormDataQuote] = useState('')


   const handleSubmit = e => {
      e.preventDefault()
      const socket = socketIOClient(ENDPOINT);
      console.log('name ' + formDataName);
      console.log('quote ' + formDataQuote)
      socket.emit("change getFormData", formDataName, formDataQuote);
   }

   const handleDelete = (e) => {
      const socket = socketIOClient(ENDPOINT);
      console.log(e.target.id);
      socket.emit("change deleteItem", e.target.id);
   }

   useEffect(() => {
      const socket = socketIOClient(ENDPOINT);
      socket.on("getAllQuotes", data => {
         setResponse(data);
      });
   }, []);

   return (
      <div>
         <header>
            <nav>
               <ul>
                  <li>
                     <Link to='/'>Home</Link>
                  </li>
               </ul>
            </nav>
         </header>

         <form action="" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="">
               Name
               <input type="text" name="name" placeholder="Name" onChange={e => setFormDataName(e.target.value)}/>
            </label>

            <label htmlFor="">
               Quotes
               <input type="text" name="quote" placeholder="Quote" onChange={e => setFormDataQuote(e.target.value)}/>
            </label>

            <button type="submit">Send</button>
         </form>


         <ul>
            {response.map((data, key) => {
               return (
                  <li key={key}>
                     <p>{data.name}</p>
                     <p>{data.quote}</p>
                     <Link to={'/item/' + data._id}>Learn more</Link>
                     <Link to={'/update/' + data._id}>Update</Link>
                     <button id={data._id} type="button" onClick={handleDelete}>Delete</button>
                  </li>
               )
            })}
         </ul>
      </div>
   );
}

export default Home;
