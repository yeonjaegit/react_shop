import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TabContent from "../components/TabContent";

function Detail({fruit}) {
  const { id } = useParams();
  const [num, setNum] = useState(0);
  const [num2, setNum2] = useState(0);
  const [alert, setAlert] = useState(true);
  const [tabNumber, setTabNumber] = useState(0);

  const selectedFruit = fruit[id];

  // useEffect는 html이 전부 다 렌더링이 완료된 후 실행됌
  useEffect(() => {
    // 여기에 작성된 모든 코드들은 마운트, 업데이트될 때 실행
    console.log('useEffect영역')

    let timer = setTimeout(() => {
      console.log('setTimeout 종료')
      setAlert(false);
    }, 5000)

    return () => {
      console.log('clean-up-fn')
      clearTimeout(timer)
    }

  }, []) // 의존성 배열에 빈 배열을 넣으면 마운트 시 한 번만 실행됌
  // 의존성 배열 - 변경감지된 state, props 설정하는거에 따라
  //             실행여부가 결정됌

  // 의존성 배열이 없으면 마운트, 업데이트마다 실행됌
  // 의존성 배열이 빈 배열이면 마운트 시 한 번만 실행됌
  // 의존성 배열에 특정 state, props가 있으면
  // 마운트될 때와 해당 state, props가 업데이트될 때 실행됌
  useEffect(() => {
    console.log('useEffect 확인용 콘솔')
  }, [num])

  if(!selectedFruit) {
    return(
    <div>해당 상품이 없습니다.</div>
  )}

  return(
    <div className="container mt-3">
      <button onClick={() => {
        setNum(num + 1)
      }}>버튼</button>{num}

      <button onClick={() => {
        setNum2(num2 + 1)
      }}>버튼2</button>{num2}
      {
        
        alert ? 
      <div className="alert alert-danger">
        5초 안에 구매하면 공짜
      </div>
      : ''
      }

      <div className="row">
        <div className="col-md-6">
          <img src={`https://raw.githubusercontent.com/ghkdss/react_sample_data/main/img/${fruit[id].title}.jpg`} alt="" width='50%'/>
        </div>
        <div className="col-md-6">
          <h4>{fruit[id].title}</h4>
          <p>{fruit[id].content}</p>
          <p>{fruit[id].price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" justify defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => {
            setTabNumber(0);
          }}>상세정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => {
            setTabNumber(1);
          }}>리뷰</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => {
            setTabNumber(2);
          }}>반품, 교환정보</Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tabNumber={tabNumber}/>
    </div>
  )
}

export default Detail;