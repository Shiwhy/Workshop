import React from 'react';
import { NavLink } from 'react-router-dom';
import Shery from 'sheryjs';


export default function DashboardProps(props) {

  
  Shery.makeMagnet(".card", {
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });


  return (
    <>
      <div className="col">
        <NavLink to={props.path}>
          <div className="card">
            <div className="dashboard-icon">
              <p>{props.icon}</p>
            </div>
            <div className="card-title">
              <p>{props.title}</p>
            </div>
            <div className="card-value">
              <p>{props.value}</p>
            </div>
          </div>
        </NavLink>
    </div>
    </>
  )
}
