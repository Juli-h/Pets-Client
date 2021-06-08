import { useEffect, useState } from 'react';
import { getMyPets } from '../lib/api'
import { useAuth } from "../context/Auth";
import { deleteUser } from '../lib/api';
import { Redirect } from 'react-router-dom'
import Modal from 'react-modal';
import CardItem from './shared/CardItem';


const UserPage = (props) => {
    const auth = useAuth();
    const [pets, setPets] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [isMessageNotHide, setIsMessageNotHide] = useState(false);
    const userDetails = (props.location.userProps);

    function closeButton() {
        setIsMessageNotHide(true)
    }

    async function getUserPetsPage() {
        try {
            const data = await getMyPets(userDetails.id);
            return data;
        }
        catch (err) {
            alert(err)
        }
    }

    async function removeUser() {
        try {
            await deleteUser(userDetails.id, auth.token);
            setLoginModalIsOpen(true)
        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        async function loadData() {
            setIsLoading(true)
            const petsRes = await getUserPetsPage();
            setPets(petsRes);
            setIsLoading(false)
        }
        loadData()
    }, []);

    if (isMessageNotHide) {
        return <Redirect to='/user' />
    }
    return (
        <>
            {isLoading && <div class="spinner-border text-dark  mx-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {userDetails &&
                <div className="container  ">
                    <div className="mt-5 pt-5">
                        <div className="mt-5 pt-2 text-center">
                            <h1 className="fs-1 text-light mt-5  bg-dark d-inline p-2">{userDetails.firstName} {userDetails.lastName}</h1>
                            <ul className="m-5 list-group d-flex justify-content-center">
                                <li className="fs-2 list-group-item  d-flex justify-content-center mx-5"><div className="fw-bold me-2">Email: </div>{userDetails.email} </li>
                                <li className=" fs-2 list-group-item  d-flex justify-content-center mx-5"> <div className="fw-bold me-2"> PhoneNumber: </div>  {userDetails.phoneNumber} </li>
                                <li className=" fs-2 list-group-item  d-flex justify-content-center mx-5" > <div className="fw-bold me-2"> Bio: </div>{userDetails.bio}
                                </li>
                            </ul>
                            {(!pets || pets.length < 1) ?
                                <h2 className="text-decoration-underline p-2">{userDetails.firstName} don't have pets </h2> : <h2 className="text-decoration-underline p-2">{userDetails.firstName}'s pets</h2>}
                            <ul className="row row-cols-1 row-cols-md-4 g-2 list-unstyled  justify-content-between align-items-center " >
                                {pets && pets.map((pet) =>
                                    <CardItem
                                        key={pet.id}
                                        data={pet}
                                        path="/details"
                                    />
                                )}
                            </ul>
                            <button className="btn btn btn-danger btn-lg p-2 my-3  rounded-pill" type="submit" onClick={async e => await removeUser(e.target.value)}>Delete User</button>
                        </div>
                        <Modal
                            isOpen={loginModalIsOpen}
                            onRequestClose={() => setIsMessageNotHide(true)}
                            ariaHideApp={false}
                            className="pt-5 w-25 m-auto mt-5">
                            <div className="d-flex justify-content-center alert alert-warning mt-2 alert-dismissible fade show" role="alert">
                                Deleted user!
                            <button type="button" className="btn-close"
                                    onClick={closeButton}
                                    aria-label="Close"></button>
                            </div>
                        </Modal>
                    </div>
                </div>}
        </>
    )
}

export default UserPage;