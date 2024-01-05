import React,{useEffect,useState} from 'react'
import axios from 'axios'
import '../css/views_css/addstock.css'
// import Searchbar from '../Utils/Searchbar';
// import { FiPlus } from "react-icons/fi";

import { TbSettingsCog } from 'react-icons/tb'
import { AiFillPlusSquare } from "react-icons/ai";

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
  



  const [showInput, setShowInput] = useState({});
  const handleUnitInput = (partId, partName) => {
    setShowInput((prev) => ({  [partId]: !prev[partId] }));
  };

  // const handleUnitInput = () => {
  //   if(unitInput.style.display === 'none') {
  //     unitInput.style.display = 'block';
  //   } else {
  //     unitInput.style.display = 'none'
  //   }
  // }



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
    try{
      await axios.post('http://localhost:5001/addpart', partData,{
        headers:{ 
          "Content-Type":"application/json"
        }
      })
    }catch(err){
        console.log(err)
      }
    }
    // const partName = stock.find((part_Name) => {return part_Name.part_name})
    // console.log(partName)

    

  
  const [addUnit, setAddUnit] = useState({ addunit: ''})
  
  const handleAddUnit = async (partId, partName) => {
    try {
      await axios.post('http://localhost:5001/addPartUnit', {addUnit, partName});
    }catch(err)
    {
      console.log(err)
    }
  }
  
  const handleChange = (e) => {
    setPartData({...partData,[e.target.name]:e.target.value})
  }

  
  return (
    <>



    <div className="heading-div">
      <p className="heading"><TbSettingsCog/> Stock</p>
      <button id='addpartmenuBtn' onClick={showMenu}>Add New Part</button>
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
            <input type="number" placeholder='only number' name='partprice' value={partData.partprice} onChange={handleChange}/>
          </td>
        </tr>
        <tr>
          <th>Unit: </th>
          <td>
            <input type="number"  placeholder='only number' name='partunit' value={partData.partunit} onChange={handleChange}/>
          </td>
        </tr>
      </table>

      <div className="partbtn">
        <button className='addpartbtn' onClick={addPart}>Add</button> 
        <p id='error'></p>

      </div>
    </div>


    <div className="mainDivision">
      {stock.map((parts) => {
        return <div className="view" key={parts.part_id}>

          <div className="view-card">
            <p>
              <span>Part :&nbsp; </span> <span id='partName'>{parts.part_name}</span>
            </p>
            <p>
              <span>Price :&nbsp; </span>{parts.price}
            </p>
            <p>
              <span>Units :&nbsp; </span>{parts.units}

              <div className="unitbtn-input">
                <button className="unitbtn" onClick={ () => handleUnitInput(parts.part_id) }><AiFillPlusSquare/></button>

                {/* <div className="unitinput" id={`unitinput_${parts.part_id}`}>
                  <input type="text" />
                  <button className='unitbtnPlus'>ADD</button>
                </div> */}

                {showInput[parts.part_id] && (
                  <div className="unitinput" id={`unitinput_${parts.part_id}`}>
                    <input type="number" name='addunit' value={ addUnit.addunit } onChange={ (e) => setAddUnit({...addUnit,[e.target.name]:e.target.value}) } />
                    <button className="unitbtnPlus" onClick={ () => handleAddUnit(parts.part_id, alert(parts.partName)) }>ADD</button>
                  </div>
                )}

              </div>



            </p>
          </div>
        </div>
      })}
    </div>
    </>
  )
}

export default Stock;
