import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const Homepage = () => {
  let auth = useAuth();
  return (
    <>
      <div className=" mt-5 pt-5  justify-content-center align-items-center
      ">
        <div className="">
          <h1 className="text-center">
            <span className="material-icons me-2 ">pets</span>
          Welcome {auth.user?.firstName} {auth.user?.lastName}
            <span className="material-icons ms-2">pets</span>
          </h1>
          <p className="fst-italic text-center mt-4 fs-2"> Everybody needs a friend. There's no better friend than a pet. </p>
          <p className="fst-italic text-center fs-2">This Pet Adoption Platform let you easily search, find and adopt your new best friend ever!!!</p>
          <div className="d-flex justify-content-center align-items-center ">
            <div id="carouselExampleCaptions" className="mt-5 carousel slide w-75 mb-5" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="/images/1.1.jpg" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block text-light ">
                    <h1 className="fw-bolder fs-2 "> Search your new friend now!</h1>
                    <Link className=" nav-link text-white" to="/search">
                      <span className="fw-bolder fs-5 btn-sm  nav-link  btn btn-sm btn-outline-light rounded-pill ">Search</span>
                    </Link>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="/images/dog_image.jpg" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block ">
                    <h1 className="fw-bolder fs-2 ">{auth.user ? `Go to your pet page` : `Login to get a Dog to your family`}</h1>
                    {auth.user && <Link className=" nav-link text-white" to="/pets">
                      <span className="fw-bolder fs-5 btn-sm  nav-link  btn btn-sm btn-outline-light rounded-pill ">My Pets</span>
                    </Link>}
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="/images/cat_image.jpg" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block  ">
                    <h1 className="fw-bolder fs-2 text-dark">{auth.user ? `Go to your settings` : `Your new Cat fried is waiting for you`}</h1>
                    {auth.user && <Link className=" nav-link " to="/settings">
                      <span className="fw-bolder fs-5 nav-link  btn btn-outline-dark  rounded-pill ">Settings</span>
                    </Link>}
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage;
