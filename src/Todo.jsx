import React from "react";
import "./style.css";
import swal from "sweetalert";

function Todo() {
  //   function to get data from local storage

  const getLocalData = () => {
    const list = localStorage.getItem("todoItem");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = React.useState("");
  const [items, setItems] = React.useState(getLocalData());
  const [toggleButton, setToggleButton] = React.useState(false);
  const [editedItemId, setEditedItemId] = React.useState("");

  //   function to add items

  const addItem = () => {
    if (!inputData) {
      swal("Add the data first!🥲");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((currentElement) => {
          if (currentElement.id === editedItemId) {
            return { ...currentElement, name: inputData };
          }
          return currentElement;
        })
      );
      setInputData("");
      setToggleButton(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newInputData]);
      setInputData("");
      setToggleButton(false);
    }
  };

  //   function to delete items

  const deleteItem = (elementId) => {
    const updatedItem = items.filter((currentElement) => {
      return currentElement.id !== elementId;
    });
    setItems(updatedItem);
  };

  //   function to delete all the items

  const removeAll = () => {
    setItems([]);
    swal("Good job!", "You completed all of your tasks!", "success");
  };

  //   function to edit the items

  const editItem = (elementId) => {
    const edited_item = items.find((currentElement) => {
      return currentElement.id === elementId;
    });
    setInputData(edited_item.name);
    setToggleButton(true);
    setEditedItemId(elementId);
  };

  //   function to add data to local storage

  React.useEffect(() => {
    localStorage.setItem("todoItem", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            {/* <img src="https://www.pngall.com/wp-content/uploads/5/Vector-Checklist-PNG-HD-Image.png" /> */}
            {/* <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/todo-list-1540192-1305387.png" /> */}
            <img src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png" />
            <figcaption>Add your tasks here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              className="form-control"
              placeholder="Add Items ✍🏼"
              value={inputData}
              onChange={(event) => {
                setInputData(event.target.value);
              }}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-solid fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((currentElement) => {
              return (
                <div className="eachItem" key={currentElement.id}>
                  <h3>{currentElement.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => {
                        editItem(currentElement.id);
                      }}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(currentElement.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
