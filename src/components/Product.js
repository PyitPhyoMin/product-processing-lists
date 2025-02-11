import { useState, useContext, useMemo } from "react";
import { v4 as uuid } from "uuid";

import styles from "./Product.module.css";
import Card from "./Card";
import ViewList from "./ViewList";

import ProductContext from "../context/ProductContext";
import ModeContext from "../context/ModeContext";
import EditForm from "./EditForm";

function Product() {
  const ctx = useContext(ProductContext);
  const modeCtx = useContext(ModeContext);
  const [list, setList] = useState([]);

  //the state to check if the user is editing an item.[PhyoMin]
  const [isEditing, setIsEditing] = useState(false);
  const [editModeMessage, setEditModeMessage] = useState("");
  const editMessageBlock =
    "You are editing an item. Please exit from edit mode to delete an item.";

  //State to store the form values for editing the item.[PhyoMin]
  const blankForm = {
    index: 0,
    name: "",
    quantity: 0,
    price: 0,
    discount: 0,
  };
  const [form, setForm] = useState(blankForm);

  //useMemo to calculate the total sum of the products in the list.[PhyoMin]
  const sumTotal = useMemo(() => {
    const result = list.reduce((acc, item) => {
      return acc + item.total;
    }, 0);
    return result;
  }, [list]);

  /*
    CREATE: Add a new product into the list
  */
  const handlerAddProduct = () => {
    const newItem = {
      id: uuid(),
      name: ctx.name,
      quantity: ctx.count,
      price: ctx.price,
      discount: ctx.discount,
      total: (ctx.count * ctx.price * (100 - ctx.discount)) / 100,
    };
    const newList = [...list, newItem];
    setList(newList);
  };
  //Handler to show the edit form with the selected item values.[PhyoMin]
  const handlerEditItem = (id) => {
    const i = list.findIndex((item) => item.id === id);
    const editValues = {
      index: i,
      name: list[i].name,
      quantity: list[i].quantity,
      price: list[i].price,
      discount: list[i].discount,
    };
    setForm(editValues);
    setIsEditing(true);
  };

  //Update edit form before submitting for update.[PhyoMin]
  const handlerUpdateForm = (event, key) => {
    const value = event.target.value;
    const updatedForm = { ...form, [key]: value };
    setForm(updatedForm);
  };

  //Update edit form values into current item in product list.[PhyoMin]
  const handlerSubmitForm = (event) => {
    event.preventDefault();

    // Create new item and copy values from form
    const newItem = { ...list[form.index] };
    newItem.name = form.name;
    newItem.quantity = form.quantity;
    newItem.price = form.price;
    newItem.discount = form.discount;
    newItem.total = (form.quantity * form.price * (100 - form.discount)) / 100;

    // Copy current list and replace edited item
    const newList = [...list];
    newList[form.index] = newItem;
    setList(newList);

    setIsEditing(false);
    setEditModeMessage("");
  };

  const handlerCancelEdit = () => { 
    setIsEditing(false);
    setEditModeMessage("");
  };

  /*
    DELETE a product from the list according to the given ID
  */
  const handlerDeleteProduct = (id) => {
    // Create a new item list with everything, except the item with matching ID
    if (isEditing === false) {
      const newList = list.filter((item) => item.id !== id);
      setList(newList);
    } else {
      setEditModeMessage(editMessageBlock);
    }
  };

  //---------------------------------------------------------------------------

  return (
    <div className={`${styles.container} ${modeCtx.isDark && styles.dark}`}>
      <Card handlerAddProduct={handlerAddProduct} />
      <ViewList
        list={list}
        sum={sumTotal}
        handlerEditItem={handlerEditItem}
        handlerDeleteItem={handlerDeleteProduct}
        editModeMessage={editModeMessage}
      />
      {/*Use EditForm as a separate component and pass the props.[PhyoMin]*/}
      <EditForm
        form={form}
        handlerUpdateForm={handlerUpdateForm}
        handlerSubmitForm={handlerSubmitForm}
        isEditing={isEditing}
        handlerCancelEdit={handlerCancelEdit}
      ></EditForm>
    </div>
  );
}

export default Product;
