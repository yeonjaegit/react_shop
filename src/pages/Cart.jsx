import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAge, changeNum, nPlusNum, plusNum } from "../redux/store";
import { addCount, removeCount, removeItem } from "../redux/cartSlice";

function Cart() {
  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();

  return (
    <Table>
      <thead>
        <tr>
          <th>번호</th>
          <th>상품명</th>
          <th>수량</th>
          <th>수량+</th>
          <th>수량-</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {
          cart.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.count}</td>
                <td><button onClick={() => {
                  dispatch(addCount(i))
                }}>+</button></td>
                <td><button onClick={() => {
                  dispatch(removeCount(i))
                }}>-</button></td>
                <td><button onClick={() => {
                  dispatch(removeItem(item))
                }}>x</button></td>
              </tr>
              
              )
          })
        }
      </tbody>
    </Table>
  )
}

export default Cart;