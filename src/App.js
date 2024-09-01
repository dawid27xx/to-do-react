import "./App.css";
import { useState } from "react";
import { GoArrowRight, GoArrowDown } from "react-icons/go";
import  Header from "./Components/Header.js";

function App() {
  // const [age, setAge] = useState(0);
  // const [state, setState] = useState(initial state)
  const [items, setItems] = useState([]);
  const [completed, setCompleted] = useState([]);

  // define your setter function using the following syntax
  // this is a prop that is passed to the child component
  // const setState = ()
  const addItem = (text, color) => {
    // create the new state
    const newItem = { id: Date.now(), text, color };
    const newItems = items.concat(newItem);
    // update the new state
    setItems(newItems);
  };

  // const functioname = (params) => (function body)
  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    const newCompleted = items.filter((item) => item.id === id);
    setCompleted(completed.concat(newCompleted));
    setItems(newItems);
  };

  const deleteCompleted = (id) => {
    const newCompleted = completed.filter((item) => item.id !== id);
    setCompleted(newCompleted);
  };

  // returns template in a sense
  return (
    <div className="App">
      <Header />
      <CreateItem onClick={addItem} />
      <List
        items={items}
        completed={completed}
        onDelCom={deleteCompleted}
        onDelete={deleteItem}
        setItems={setItems}
      />
    </div>
  );
}



// {props passed from parent component}
function CreateItem({ onClick }) {
  // another state but for the input variable
  const [inputValue, setInputValue] = useState("");
  const [color, setColor] = useState("black");

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  // updates the inputValue state
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // calls the onclick function which is the additem function
  const handleClick = () => {
    if (!inputValue.trim()) return;
    onClick(inputValue, color);
    setInputValue("");
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Add new element"
        class="border border-gray-400 w-5/12 rounded-lg p-2"
      />
      <select
        onChange={handleColorChange}
        class="border border-gray-400 w-1/12 rounded-lg p-2"
      >
        <option value="Black">Black</option>
        <option value="Green">Green</option>
        <option value="Red">Red</option>
        <option value="Purple">Purple</option>
      </select>

      <button
        onClick={handleClick}
        class="bg-gray-700 text-white p-2 w-1/12 rounded-lg"
      >
        Add
      </button>
    </div>
  );
}
// {props passed from parent component}
// {props passed from parent component}
function List({ items, completed, onDelete, onDelCom }) {
  const [showCompleted, setShowCompleted] = useState(true);

  const handleClick = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <div className="flex flex-col items-center">
      {items.length === 0 ? (
        <h1 className="text-2xl py-1 pt-4">No items</h1>
      ) : (
        <h1 className="text-2xl py-1 pt-4">Items: </h1>
      )}
      <ul className="py-4 w-full flex flex-col items-center">
        {items.map((item) => (
          <ListElement
            color={item.color}
            key={item.id}
            id={item.id}
            text={item.text}
            onDelete={onDelete}
          />
        ))}
      </ul>

      {showCompleted ? (
        <h1 className="text-2xl py-1 pt-4 text-green-900">
          <span className="inline-flex items-center" onClick={handleClick}>
            Completed <GoArrowDown className="ml-2" />
          </span>
        </h1>
      ) : (
        <h1 className="text-2xl py-1 pt-4 text-green-900">
          <span className="inline-flex items-center" onClick={handleClick}>
            Completed <GoArrowRight className="ml-2" />
          </span>
        </h1>
      )}

      <ul className="py-4 w-full flex flex-col items-center">
        {showCompleted &&
          completed.map((item) => (
            <DoneElement
              key={item.id}
              id={item.id}
              text={item.text}
              onDelCom={onDelCom}
            />
          ))}
      </ul>
    </div>
  );
}

// onDelete further passed into child of child
function ListElement({ id, text, onDelete, color }) {
  // Construct a custom box-shadow value using the color prop
  // Example shadow value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  // You might want to adjust the spread, blur radius, and opacity as per your design needs
  const customShadow = `2px 4px 10px -6px ${color}, 0 3px 5px -2px ${color}`;

  return (
    <li
      className="w-7/12 p-2 rounded-md text-center flex justify-between items-center mb-4"
      style={{
        borderColor: color,
        boxShadow: customShadow,
      }}
    >
      <span>{text}</span>
      <button
        onClick={() => onDelete(id)}
        className="bg-green-700 text-white p-2 rounded-lg"
      >
        Done
      </button>
    </li>
  );
}

function DoneElement({ id, text, onDelCom }) {
  return (
    <li class="w-7/12 p-2 shadow-md rounded-md border border-gray-400 text-center flex justify-between items-center mb-4">
      <span>{text}</span>
      <button
        onClick={() => onDelCom(id)}
        class="bg-red-400 text-white p-2 rounded-lg"
      >
        Delete
      </button>
    </li>
  );
}

export default App;
