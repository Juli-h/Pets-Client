import { useState } from "react";
import Modal from 'react-modal';
import { useAuth } from "../context/Auth";
import { Redirect } from 'react-router-dom'
import { updateProfile, getUserById } from "../lib/api";

const ProfileSettings = () => {
    const auth = useAuth();
    const [firstName, setFirstName] = useState(auth?.user?.firstName);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [isMessageNotHide, setIsMessageNotHide] = useState(false);
    const [lastName, setLastName] = useState(auth?.user?.lastName);
    const [phoneNumber, setPhoneNumber] = useState(auth?.user?.phoneNumber);
    const [bio, setBio] = useState(auth?.user?.bio);

    function closeButton() {
        setIsMessageNotHide(true)
    }


    async function handleFormSubmit(event) {
        event.preventDefault();
        if (firstName && lastName && phoneNumber) {
            try {
                await updateUser(firstName, lastName, phoneNumber, bio);
                const updatedUser = await getUserById(auth.user.id);
                await auth.updateUserContext(updatedUser);
                setLoginModalIsOpen(true);
            } catch (err) {
                alert(err);
            }
        }
    }

    async function updateUser(firstName, lastName, phoneNumber, bio) {
        const data = await updateProfile(auth.user.id, firstName, lastName, phoneNumber, bio);
        return data;
    }

    if (isMessageNotHide) {
        return <Redirect to='/' />
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center p-5 mt-5 ">
                <div className=" w-75">
                    <form className=" justify-content-center p-5 mt-5 bg-white" onSubmit={(event) => handleFormSubmit(event)}>
                        <h1 className="d-flex justify-content-center align-items-center mb-4">Profile Settings</h1>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Last name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                    onChange={e => setLastName(e.target.value)}
                                    id="lname" name="lname" value={lastName} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">First name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                    onChange={e => setFirstName(e.target.value)}
                                    id="fname" name="fname" value={firstName} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Phone</label>
                            <div className="col-sm-10">
                                <input type="tel" className="form-control"
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    id="phone" name="phone" value={phoneNumber} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Bio</label>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control "
                                    onChange={e => setBio(e.target.value)}
                                    id="bio" name="bio" value={bio} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center ">
                            <button className="btn btn-dark rounded-pill mt-3 px-5" type="submit" >Save</button>
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
                    Updated!
                            <button type="button" className="btn-close"
                        onClick={closeButton}
                        aria-label="Close"></button>
                </div>
            </Modal>
        </>
    )
}



export default ProfileSettings;



