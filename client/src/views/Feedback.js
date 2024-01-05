import React,{useEffect,useState} from 'react'
import axios from 'axios'

import {VscFeedback} from 'react-icons/vsc'

const Feedback = () => {

  const [feedback,setfeedback] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/feedback')
    .then((res) => {
      setfeedback(res.data);
    })
  }, [])


  return (
    <>
    <div className="heading-div">
      <p className="heading">< VscFeedback/> Feedback</p>
    </div>
    <div className="mainDivision">
      {feedback.map((feedback) => {
        return <div className="view" key={feedback.feedback_id}>
          <div className="view-card">
            <p>
              <span>Name :&nbsp; </span>{feedback.customer_name}
            </p>
            <p>
              <span>Feedback :&nbsp; </span>{feedback.feedback}
            </p>
            <p>
              <span>Email :&nbsp; </span>{feedback.email}
            </p>
          </div>
        </div>
      })}  
    </div>
    </>
  )
}

export default Feedback
