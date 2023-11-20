import React from 'react';

export default function DashboardProps(props) {
  return (
    <>
      <div className="col">
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
    </div>
    </>
  )
}
