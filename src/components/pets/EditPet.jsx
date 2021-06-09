import { useState } from 'react';
import Modal from 'react-modal';
import { useAuth } from "../../context/Auth";
import { Redirect } from 'react-router-dom'
import { deletePet, updatePet } from '../../lib/api'

const EditPet = (props) => {
    const auth = useAuth();
    const petDetails = (props.location.petProps);
    const [isNotHideError, setIsNotHideError] = useState(false);
    const [isMessageNotHide, setIsMessageNotHide] = useState(false);
    const [updatedPetModalIsOpen, setUpdatedPetModalIsOpen] = useState(false);
    const [type, setType] = useState(petDetails?.pet_type);
    const [name, setName] = useState(petDetails?.name);
    const [height, setHeight] = useState(petDetails?.pet_height);
    const [weight, setWeight] = useState(petDetails?.pet_weight);
    const [color, setColor] = useState(petDetails?.color);
    const [bio, setBio] = useState(petDetails?.bio);
    const [dietaryRestrictions, setDietaryRestrictions] = useState(petDetails?.dietary_restrictions);
    const [breed, setBreed] = useState(petDetails?.breed);

    async function editPet(petItem) {
        const data = await updatePet(petDetails.id, petItem);
        return data;
    }

    function closeButton() {
        setIsMessageNotHide(true)
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        if (type && name  && height && weight && color && bio  && dietaryRestrictions && breed) {
            try {
                const petItem = { type, name, height, weight, color, bio, dietaryRestrictions, breed }
                await editPet(petItem);
                setUpdatedPetModalIsOpen(true);
            } catch (err) {
                alert(err);
            }
        }
        else {
            setIsNotHideError(true)
        }
    }

    async function removePet() {
        try {
            await deletePet(petDetails.id, auth.token);
            setUpdatedPetModalIsOpen(true)
        } catch (err) {
            alert(err);
        }
    }

    if (isMessageNotHide) {
        return <Redirect to='/admin' />
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center p-5  mt-5">
                <div className="w-75">
                    <form className=" justify-content-center p-5 bg-white mt-2 " onSubmit={(event) => handleFormSubmit(event)}>
                        <h1 className="d-flex justify-content-center align-items-center mb-4">Edit Pet</h1>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Type</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                    onChange={e => setType(e.target.value)}
                                    id="type" name="type" placeholder="Type ..."
                                    value={type} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                    onChange={e => setName(e.target.value)}
                                    id="name" name="name" placeholder="Name ..."
                                    value={name} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Height</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setHeight(e.target.value)}
                                    id="height" name="height" placeholder="Height..." value={height} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Weight</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setWeight(e.target.value)}
                                    id="weight" name="weight" placeholder="Weight..." value={weight} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Color</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setColor(e.target.value)}
                                    id="color" name="color" placeholder="Color..." value={color} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Bio</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setBio(e.target.value)}
                                    id="bio" name="bio" placeholder="Bio..." value={bio} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Dietary Restrictions</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setDietaryRestrictions(e.target.value)}
                                    id="dietaryRestrictions" name="dietaryRestrictions" placeholder="Dietary Restrictions..."
                                    value={dietaryRestrictions}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Breed</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setBreed(e.target.value)}
                                    id="breed" name="breed" placeholder="Breed..."
                                    value={breed} />
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
                                <button className="btn btn btn-danger btn-lg p-2 mt-2 rounded-pill me-5" type="submit" onClick={async e => await removePet(e.target.value)}>Delete Pet</button>
                                <button className="btn btn-dark rounded-pill mt-2 btn-lg ms-5" type="submit" >Edit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                isOpen={updatedPetModalIsOpen}
                onRequestClose={() => setIsMessageNotHide(true)}
                ariaHideApp={false}
                className="pt-5 w-25 m-auto mt-5">
                <div className="d-flex justify-content-center alert alert-warning mt-2 alert-dismissible fade show" role="alert">
                    Edit Pet!
                            <button type="button" className="btn-close"
                        onClick={closeButton}
                        aria-label="Close"></button>
                </div>
            </Modal>
        </>
    )
}



export default EditPet;