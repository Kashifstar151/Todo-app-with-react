import React, { useState } from 'react'
import { useEffect } from 'react'
import "./style.css"
 const getlocaldata=localStorage.getItem('mytodolist')
 const list=localStorage.getItem('mytodolist')

export const Todo = () => {
    const [InputData, setInputData] = useState("");
    const [Item, setItem] = useState([])
    const [edititem, seteditItem] = useState(getlocaldata)
     const [toggleButton, setToggleButton] = useState(false)
    // function for add item
    const addItem = () => {
        if (!InputData) {
            alert("please fill name")
        }
        else if(InputData&&toggleButton){
            setItem(
                Item.map((curElem)=>{
                    if(curElem.id===edititem){
                        return {...curElem,name:InputData}
                    }
                    return curElem
                })
            )
            setInputData([])
        seteditItem(null);
        setToggleButton(false);

        }
        else {
            const mynewInputdata = {
                id: new Date().getTime().toString(),
                name: InputData,

            }
            setItem([...Item, mynewInputdata])
            setInputData("")
        }

    }
    // setInputData([])
    //function for edit item
    const editItem = (index) => {
        const editedItem = Item.find((curElem) => {
            return curElem.id === index;
        })
        setInputData(editedItem.name)
        seteditItem(index);
        setToggleButton(true);

    }

    // function for DeleteItem
    const DeleteItem = (index) => {
        const UpdatedItem = [...Item].filter((curElem) => {
            return curElem.id !== index

        })

        setItem(UpdatedItem)
    }
    const removeall = () => {
        setItem([])
    }

    // adding localstorage
    useEffect(() => {
        localStorage.setItem('mytodolist', JSON.stringify(Item))
    }, [Item])


    return (

        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src=".E:\todoProject\project1\public\todologo" alt="todologo" />
                        <figcaption>Add Your Todo List</figcaption>
                    </figure>
                    <div className="Additem">
                        <input type="text" placeholder="Add Item" className="form-control" value={InputData}
                            onChange={(event) => setInputData(event.target.value)} />
                            {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem} > </i>):
                        (<i className="fa fa-plus add-btn" onClick={addItem} > </i>)
                            }

                    </div>
                    {/* {code for show item} */}
                    <div className="showItem">
                        {Item.map((curElem) => {
                            return (


                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>

                                    <div className="todo-button">
                                        <i className="far fa-edit add-btn" onClick={() =>
                                            editItem(curElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => {
                                            DeleteItem(curElem.id)
                                        }}></i>
                                    </div>
                                </div>
                            );
                        })}




                    </div>
                    <div className="showItem">
                        <button className="btn effect04" data-sm-link-text="Remove All">
                            <span>CHECK LIST</span>
                        </button>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Todo;
