import bg from "../bg.jpg"
import Card from "../components/Card"

function MainPage({fruit}) {
  return (
    <>
      <div className='main-bg' style={{backgroundImage:'url('+ bg +')'}}></div>

      <div className='container'>
        <div className='row'>
          {
            fruit.map((data, i) => {
              return (
                <Card data={data} key={i}/>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default MainPage