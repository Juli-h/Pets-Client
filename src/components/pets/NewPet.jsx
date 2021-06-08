import { useState } from 'react';
import Modal from 'react-modal';
import { useAuth } from "../../context/Auth";
import { createPet } from "../../lib/api";
import { Redirect } from 'react-router-dom'

const NewPet = () => {
    const auth = useAuth();
    const [isNotHideError, setIsNotHideError] = useState(false);
    const [isMessageNotHide, setIsMessageNotHide] = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [isPetAdded, setIsPetAdded] = useState(false);
    const [type, setType] = useState();
    const [name, setName] = useState();
    const [adoptionStatus, setAdoptionStatus] = useState();
    const [picture, setPicture] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [color, setColor] = useState();
    const [bio, setBio] = useState();
    const [hypoallergenic, setHypoallergenic] = useState();
    const [dietaryRestrictions, setDietaryRestrictions] = useState();
    const [breed, setBreed] = useState();

    async function addNewPet(petItem, picture) {
        const data = await createPet(petItem, picture, auth.token);
        return data;
    }

    function closeButton() {
        setIsNotHideError(false)
        setIsMessageNotHide(true)
    }

    function uploadPicture(file) {
        setPicture(file);
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        if (type && name && adoptionStatus && picture && height && weight && color && bio && hypoallergenic && dietaryRestrictions && breed) {
            try {
                const petItem = { type, name, adoptionStatus, height, weight, color, bio, hypoallergenic, dietaryRestrictions, breed }
                await addNewPet(petItem, picture);
                setLoginModalIsOpen(true);
                setIsPetAdded(true);
            } catch (err) {
                alert(err);
            }
        }
        else {
            setIsNotHideError(true)
        }
    }

    if (isPetAdded && isMessageNotHide) {
        return <Redirect to='/admin' />
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center p-5  mt-5">
                <div className="w-75">
                    <form className=" justify-content-center p-5 bg-white mt-2 " onSubmit={(event) => handleFormSubmit(event)}>
                        <h1 className="d-flex justify-content-center align-items-center mb-4">Add Pet</h1>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Type</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                    onChange={e => setType(e.target.value)}
                                    id="type" name="type" placeholder="Type ..." />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                    onChange={e => setName(e.target.value)}
                                    id="name" name="name" placeholder="Name ..." />
                            </div>
                        </div>
                        <div className="row mb-3 d-flex justify-content-between">
                            <label htmlFor="adoptionStatus" className="col-sm-2 col-form-label">Adoption Status</label>
                            <div className="col-sm-10">
                                <select type="text" className="form-select"
                                    onChange={e => setAdoptionStatus(e.target.value)}
                                    id="adoptionStatus" name="adoptionStatus" placeholder="Adoption Status ..." >
                                    <option value="" >Selcet Adoption Status</option>
                                    <option value="available" >Available</option>
                                    <option value="fostered" >Fostered</option>
                                    <option value="adopted" >Adopted</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Picture</label>
                            <div className="col-sm-10">
                                <div className="input-group mb-3">
                                    <input type="file" className="form-control"
                                        onChange={e => uploadPicture(e.target.files[0])}
                                        id="inputGroupFile02" />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Height</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setHeight(e.target.value)}
                                    id="height" name="height" placeholder="Height..." />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Weight</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setWeight(e.target.value)}
                                    id="weight" name="weight" placeholder="Weight..." />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Color</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setColor(e.target.value)}
                                    id="color" name="color" placeholder="Color..." />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Bio</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setBio(e.target.value)}
                                    id="bio" name="bio" placeholder="Bio..." />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="hypoallergenic" className="col-sm-2 col-form-label">Hypoallergenic</label>
                            <div className="col-sm-10 ">
                                <select type="text" className="form-select "
                                    onChange={e => setHypoallergenic(e.target.value)}
                                    id="hypoallergenic" name="hypoallergenic" placeholder="Hypoallergenic..." >
                                    <option value="">Selcet Hypoallergenic Status</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Dietary Restrictions</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setDietaryRestrictions(e.target.value)}
                                    id="dietaryRestrictions" name="dietaryRestrictions" placeholder="Dietary Restrictions..." />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Breed</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setBreed(e.target.value)}
                                    id="breed" name="breed" placeholder="Breed..." />
                            </div>
                        </div>
                        <div>
                            {isNotHideError &&
                                <div className="d-flex justify-content-center alert alert-danger mt-2 alert-dismissible fade show" role="alert">
                                    Please fill in all of the fields.
                            <button type="button" className="btn-close"
                                        onClick={closeButton}
                                        aria-label="Close"></button>
                                </div>}
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-dark rounded-pill mt-2 btn-lg" type="submit" >Add</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                isOpen={loginModalIsOpen}
                onRequestClose={() => setIsMessageNotHide(true)}
                ariaHideApp={false}
                className="pt-5 w-25 m-auto mt-5">
                <div className="d-flex justify-content-center alert alert-warning mt-2 alert-dismissible fade show" role="alert">
                    Created Pet!!
                            <button type="button" className="btn-close"
                        onClick={closeButton}
                        aria-label="Close"></button>
                </div>
            </Modal>
        </>
    )
}



export default NewPet;