import { use, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TabContent from "../components/TabContent";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { setWatched } from "../redux/watchedSlice";

function Detail({fruit}) {
  const { id } = useParams();
  const [num, setNum] = useState(0);
  const [num2, setNum2] = useState(0);
  const [alert, setAlert] = useState(true);
  const [tabNumber, setTabNumber] = useState(0);
  const dispatch = useDispatch();

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
    // 방금 본 상품의 id를 로컬스토리지에 추가할 예정
    let watched = localStorage.getItem('watched')
    watched = JSON.parse(watched);

    // includes : 해당 배열에 값이 있으면 true, 없으면 false

    // 이미 최근 본 상품이 3개일 때 새로운 걸 추가해야 하므로 기존거 하나 지우고 추가
    // 이미 들어있는거면 안지워도 됌
    if(watched.length === 3 && !watched.includes(id)) {
      watched.pop();
    }
      watched = [id, ...watched];

      watched = new Set(watched);
    

    // set은 배열이 아니기 때문에 중복 제거 후 다시 배열로 변환해야 함
    watched = Array.from(watched);

    localStorage.setItem('watched', JSON.stringify(watched));
    dispatch(setWatched(watched))
    
  }, [])

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
          <button className="btn btn-danger" onClick={() => {
            const item = {
              id: id,
              title: fruit[id].title,
              count: 1,
            }
            dispatch(addItem(item))
            window.alert('장바구니에 추가되었습니다.')
          }}>주문하기</button>
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