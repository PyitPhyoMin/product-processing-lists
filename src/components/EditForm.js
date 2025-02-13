import styles from "./Product.module.css";
import Button from "./Button";
/* EditForm component to edit and update a product details.[PhyoMin]
setEditModeMessage is a function to show message for delete restriction on list while in editing
for an item.[PhyoMin] */
function EditForm({
  form,
  handlerUpdateForm,
  handlerSubmitForm,
  isEditing,
  handlerCancelEdit
}) {
  return (
    <>
      {isEditing && (
        <form className={styles.form} onSubmit={handlerSubmitForm}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Disc %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Product:">
                  <input
                    value={form.name}
                    type="text"
                    onChange={(e) => handlerUpdateForm(e, "name")}
                  />
                </td>
                <td data-label="Qty:">
                  <input
                    value={form.quantity}
                    type="number"
                    min={1}
                    onChange={(e) => handlerUpdateForm(e, "quantity")}
                  />
                </td>
                <td data-label="Price:">
                  <input
                    value={form.price}
                    type="number"
                    min={0}
                    step={0.01}
                    onChange={(e) => handlerUpdateForm(e, "price")}
                  />
                </td>
                <td data-label="Disc%:">
                  <input
                    value={form.discount}
                    type="number"
                    min={0}
                    onChange={(e) => handlerUpdateForm(e, "discount")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" />
          <Button
            label="Cancel"
            onClick={handlerCancelEdit}
          />
        </form>
      )}
    </>
  );
}

export default EditForm;
