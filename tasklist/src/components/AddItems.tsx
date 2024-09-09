import { useState, useRef, useEffect } from "react";
import { storeList } from "../store/List";
import { observer } from "mobx-react-lite";

const AddItems = () => {
  const [items, setItems] = useState<string>("");
  const [editTextId, setEditTextId] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleEditClick = (id: number) => {
    // console.log(inputRef.current) It is still null, so the ref here is not being updated.
    setEditTextId(id);
  };

  useEffect(() => {
    if (editTextId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editTextId]);

  return (
    <div>
      <input
        type="text"
        value={items}
        onChange={(e) => setItems(e.target.value)}
      />
      <button
        onClick={() => {
          storeList.addItem(items);
          setItems("");
        }}
      >
        Add Items
      </button>
      {storeList.list.map((item, index) => (
        <ul key={index}>
          <li>
            {" "}
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => storeList.toggleChecked(index)}
            />{" "}
            {editTextId === index ? (
              <input
                type="text"
                value={item.title}
                ref={inputRef}
                onChange={(e) => storeList.editItem(index, e.target.value)}
                onBlur={() => setEditTextId(-1)}
              />
            ) : (
              <span onClick={() => handleEditClick(index)}>{item.title}</span>
            )}
            <button
              style={{ marginLeft: "0.5rem" }}
              onClick={() => storeList.deleteItem(index)}
            >
              Delete
            </button>
          </li>
        </ul>
      ))}
      <p>Unfinished task:- {storeList.unfinishedTask}</p>
    </div>
  );
};

export default observer(AddItems);
