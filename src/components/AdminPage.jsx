import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <>
      <div className="mt-5 mx-5 pt-5">
        <h1 className="text-center">
          Admin
        </h1>
        <div className="d-flex mt-5">
          <div className=" w-25 me-5">
            <Link className=" text-decoration-none text-dark" to="/newpet">
              <div className="card" >
                <img src="/images/1.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h1 className="card-title  text-center">Add Pet</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-25 me-5">
            <Link className=" text-decoration-none text-dark" to="/listpets">
              <div className="card" >
                <img src="/images/1.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h1 className="card-title  text-center">List of Pets</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className=" w-25">
            <Link className=" text-decoration-none text-dark" to="/user">
              <div className="card" >
                <img src="/images/1.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h1 className="card-title  text-center">List of users</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminPage;
