import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from "socket.io-client/dist/socket.io";
const ENDPOINT = "http://127.0.0.1:4000";

function EditItem() {
   const { id } = useParams();
   const [response, setResponse] = useState([]);
   const [formDataName, setFormDataName] = useState('')
   const [formDataQuote, setFormDataQuote] = useState('')

   const handleSubmit = e => {
      e.preventDefault()
      const socket = socketIOClient(ENDPOINT);
      console.log('name ' + formDataName);
      console.log('quote ' + formDataQuote)
      socket.emit("change getFormDataAndUpdate", id, formDataName, formDataQuote);
   }

   useEffect(() => {
      const socket = socketIOClient(ENDPOINT);
      socket.emit("sendItemId", id)

      socket.on("getOneItem", data => {
         setResponse(data);
      });
   }, []);

   return (
      <div>
         <p>{response._id}</p>

         <form action="" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="">
               Name
               <input type="text" name="name" placeholder="Name" defaultValue={response.name} onChange={e => setFormDataName(e.target.value)}/>
            </label>

            <label htmlFor="">
               Quotes
               <input type="text" name="quote" placeholder="Quote" defaultValue={response.quote} onChange={e => setFormDataQuote(e.target.value)}/>
            </label>

            <button type="submit">Submit</button>
         </form>
      </div>
   );
}

export default EditItem;
