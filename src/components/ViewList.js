import styles from "./ViewList.module.css";

import { useContext } from "react";
import ModeContext from "../context/ModeContext";

//Added Handler Edit for editing each item.[PhyoMin]
function ViewList({ list, sum, handlerDeleteItem, handlerEditItem, editModeMessage }) {
  const modeCtx = useContext(ModeContext);
  return (
    <div className={styles.tableSection}>
      <table className={`${styles.table} ${!modeCtx.isLight && styles.dark}`}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Disc %</th>
            <th>Total $</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td data-label="Product:">{item.name}</td>
              <td data-label="Qty:">{item.quantity}</td>
              <td data-label="Price:">{item.price}</td>
              <td data-label="Disc%:">{item.discount}</td>
              <td data-label="Total$:">{item.total.toFixed(2)}</td>
              <td data-label="Edit:" onClick={() => handlerEditItem(item.id)}>✏️</td>
              <td data-label="Delete:" onClick={() => handlerDeleteItem(item.id)}>❌</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.containerSum}>
        Total sum: <span className={styles.sum}>{sum.toFixed(2)}</span>
      </div>
      <p className={styles.editModeMessage}>{editModeMessage}</p>
    </div>
  );
}
export default ViewList;
