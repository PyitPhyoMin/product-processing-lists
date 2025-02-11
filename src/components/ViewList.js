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
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.discount}</td>
              <td>{item.total.toFixed(2)}</td>
              <td onClick={() => handlerEditItem(item.id)}>✏️</td>
              <td onClick={() => handlerDeleteItem(item.id)}>❌</td>
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
