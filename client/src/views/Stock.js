import React,{useEffect,useState} from 'react'
import axios from 'axios'
import '../css/views_css/addstock.css'

import { TbSettingsCog } from 'react-icons/tb'

const Stock = () => {

  const [stock,setstock] = useState([]) 

  useEffect (() => {
    axios.get('http://localhost:5000/parts')
    .then((res) => {
      setstock(res.data);
    })
  },[]);

  const part = {
    partname : '',
    partprice : '',
    partunit : '',

  }
  const [partData, setPartData] = useState(part)

  const handleChange = (e) => {
    setPartData({...partData,[e.target.name]:e.target.value})
  }



  const showMenu = () => {
    var addpart = document.getElementById('addpartView');
    var btntext = document.getElementById('addpartmenuBtn')
    if (addpart.style.display === 'none')
    {
      addpart.style.display = 'block';
      btntext.innerHTML = 'Close Menu'
    }else{
      addpart.style.display = 'none';
      btntext.innerHTML = 'Add Part';
    }
  }

  const addPart = async () => {
    
  }

  return (
    <>
    <div className="heading-div">
      <p className="heading"><TbSettingsCog/> Stock</p>
      <button id='addpartmenuBtn' onClick={showMenu}>Add part</button>
    </div>

    <div id="addpartView">

      <table id="addpartTable">
        <tr>
          <th>Part: </th>
          <td>
            <input type="text" name='partname' value={partData.partname} onChange={handleChange}/>
          </td>
        </tr>
        <tr>
          <th>Price: </th>
          <td>
            <input type="text" name='partprice' value={partData.partprice} onChange={handleChange}/>
          </td>
        </tr>
        <tr>
          <th>Unit: </th>
          <td>
            <input type="text" name='partunit' value={partData.partunit} onChange={handleChange}/>
          </td>
        </tr>
      </table>
      <button className='addpartbtn'  onClick={addPart}>Add</button>
    </div>


    <div className="mainDivision">
      {stock.map((parts) => {
        return <div className="view" key={parts.part_id}>
          <div className="view-card">
            <p>
              <span>Part :&nbsp; </span>{parts.part_name}
            </p>
            <p>
              <span>Price :&nbsp; </span>{parts.price}
            </p>
            <p>
              <span>Units :&nbsp; </span>{parts.units}
            </p>
          </div>
        </div>
      })}
    </div>
    </>
  )
}

export default Stock
