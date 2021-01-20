import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from "socket.io-client/dist/socket.io";
const ENDPOINT = "http://127.0.0.1:4000";

function Item() {
   const { id } = useParams();
   const [response, setResponse] = useState([]);

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
         <p>{response.name}</p>
         <p>{response.quote}</p>
      </div>
   );
}

export default Item;
