import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/Home";
import Item from "./components/Item";
import EditItem from "./components/EditItem"

function App() {

   return (
      <BrowserRouter>
         <Route exact path='/' component={Home}/>
         <Route path='/item/:id' component={Item}/>
         <Route path='/update/:id' component={EditItem}/>
      </BrowserRouter>
   );
}

export default App;
