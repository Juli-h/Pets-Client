import React, { useState } from 'react';
import { useAuth } from "../../context/Auth";
import { updatePetStatus } from '../../lib/api';
import { Redirect } from 'react-router-dom'
import Modal from 'react-modal';

const PetPage = (props) => {
  const [isPetUpdated, setIsPetUpdated] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [isMessageNotHide, setIsMessageNotHide] = useState(false);
  const auth = useAuth()
  const petDetails = (props.location.petProps);

  function closeButton() {
    setIsMessageNotHide(false)
  }

  async function onReturnClicked() {
    try {
      await updatePetStatus(petDetails.id, "Available", null);
      setIsMessageNotHide(true)
      setIsPetUpdated(true);
      setLoginModalIsOpen(true);
    }
    catch (err) {
      alert(err)
    }
  }
  async function onFosterClicked() {
    try {
      await updatePetStatus(petDetails.id, "Fostered", auth.user.id)
      setIsMessageNotHide(true)
      setIsPetUpdated(true);
      setLoginModalIsOpen(true);
    }
    catch (err) {
      alert(err)
    }
  }

  async function onAdoptClicked() {
    try {
      await updatePetStatus(petDetails.id, "Adopted", auth.user.id)
      setIsMessageNotHide(true)
      setIsPetUpdated(true);
      setLoginModalIsOpen(true);
    }
    catch (err) {
      alert(err)
    }
  }

  if (isPetUpdated && !isMessageNotHide) {
    return <Redirect to='/pets' />
  }
  return (
    <>
      {petDetails &&
        <div className="container  ">
          <div className="mt-3 pt-3">
            <div className="mt-3 pt-2 text-center">
              <div className="d-flex justify-content-center align-items-center">
                <h1 className="fs-1 text-light p-5 bg-dark ">{petDetails.name}</h1>
                <img src={petDetails.picture_url} className=" d-block rounded ms-5" alt="" />
              </div>
              <h2 className="my-4 text-decoration-underline"> Additional details</h2>
              <h3 className="d-flex justify-content-center">Type:
          <p className="ms-2 fw-normal">{petDetails.pet_type}</p>
              </h3>
              {isMessageNotHide &&
                <div className="d-flex justify-content-center alert alert-warning mt-2 alert-dismissible fade show" role="alert">
                  {petDetails.name} adoption status updated.
                            <button type="button" className="btn-close"
                    onClick={closeButton}
                    aria-label="Close"></button>
                </div>}
              {!isMessageNotHide &&
                <h3 className="d-flex justify-content-center">Adoption Status:
          <p className="ms-2 fw-normal">{petDetails.adoption_status}</p>
                </h3>}
              <h3 className="d-flex justify-content-center">Height:
          <p className="ms-2 fw-normal ">{petDetails.pet_height}</p>
              </h3>

              <h3 className="d-flex justify-content-center">Weight:
          <p className="ms-2 fw-normal">{petDetails.pet_weight}</p>
              </h3>

              <h3 className="d-flex justify-content-center">Color:
          <p className="ms-2 fw-normal">{petDetails.color}</p>
              </h3>
              <h3 className="d-flex justify-content-center"> Hypoallergenic:
          <p className="ms-2 fw-normal">{petDetails.hypoallergenic ? 'yes' : 'no'}</p>
              </h3>
              <h3 className="d-flex justify-content-center"> Dietary restrictions:
          <p className="ms-2 fw-normal">{petDetails.dietary_restrictions}</p>
              </h3>
              <h3 className="d-flex justify-content-center"> Breed:
          <p className="ms-2 fw-normal">{petDetails.breed}</p>
              </h3>
              <h3 className="d-flex justify-content-center">Bio:
          <p className="ms-2 fw-normal">{petDetails.bio}</p>
              </h3>
              {auth && auth.user && (petDetails.userId === auth.user.id)
                && <button className="btn btn-dark rounded-pill me-2 mb-3" type="submit" onClick={async () => await onReturnClicked()}>return</button>}

              {auth && auth.user && !petDetails.userId && <button className="btn btn-dark me-2 mb-3 rounded-pill" type="submit" onClick={async () => await onFosterClicked()}  >foster</button>}

              {auth && auth.user && (petDetails.adoption_status === "Available" || petDetails.adoption_status === "Fostered")
                && <button className="btn btn-dark me-2 mb-3 rounded-pill" type="submit" onClick={async () => await onAdoptClicked()} >adopt</button>}

              <Modal
                isOpen={loginModalIsOpen}
                onRequestClose={() => setIsMessageNotHide(true)}
                ariaHideApp={false}
                className="pt-5 w-25 m-auto mt-5">
                <div className="d-flex justify-content-center alert alert-warning mt-2 alert-dismissible fade show" role="alert">
                  {petDetails.name} adoption status updated.
                            <button type="button" className="btn-close"
                    onClick={closeButton}
                    aria-label="Close"></button>
                </div>
              </Modal>
            </div>
          </div>
        </div>}
    </>
  )
}

export default PetPage;