import { useState } from "react";
import bg from "../bg.jpg"
import Card from "../components/Card"

function MainPage({fruit}) {
  const [fruitCount, setFruitCount] = useState(3);

  const visibleFruit = fruit.slice(0, fruitCount);

  return (
    <>
      <div className='MainPage main-bg b' style={{backgroundImage:'url('+ bg +')', height:'300px'}}></div>

      <div className='container'>
        <div className='row'>
          {
            visibleFruit.map((data, i) => {
              return (
                <Card data={data} key={i}/>
              )
            })
          }
        </div>
      </div>

      {
        fruitCount > fruit.length ?
        <div className="alert alert-danger">더 이상 상품이 없습니다.</div>
        :
        <button onClick={() => {
          setFruitCount(fruitCount + 3)
        }}>3개 더보기</button>
      }
    </>
  )
}

export default MainPage