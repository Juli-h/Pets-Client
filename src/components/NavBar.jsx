import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import Signup from './auth/Signup';
import Login from './auth/Login';
import { useAuth } from "../context/Auth";

const NavBar = () => {
    const auth = useAuth();
    const history = useHistory();
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);

    function onSignupClicked() {
        setSignupModalIsOpen(true);
    }

    function onLoginClicked() {
        setLoginModalIsOpen(true);
    }

    async function onLogoutClicked() {
        await auth.removeToken();
        history.push("/");
    }

    return (
        <>
            <div className="pb-5">
                <nav className="d-flex  navbar fixed-top  shadow bg-white rounded-2 w-100">
                    <Link className="mx-4 nav-link text-dark" to="/">
                        <span className="material-icons d-inline-block align-text-top">home</span>
                    </Link>
                    <Link className="me-auto  nav-link text-dark" to="/search">
                        <span className="material-icons d-inline-block align-text-top ">
                            search
                        </span>
                    </Link>
                    {
                        auth.token &&
                        <Link className="mx-4 nav-link text-dark" to="/pets">
                            <span className="nav-link  btn btn-sm btn-outline-dark rounded-pill">My Pets</span>
                        </Link>}
                    {
                        auth.token &&
                        <Link className="mx-4 nav-link text-dark" to="/settings">
                            <span className="material-icons ">settings</span>
                        </Link>
                    }
                    {
                        (auth.token && auth.user.role === "admin") &&
                        <Link className="mx-4 nav-link text-dark" to="/admin" >
                            <span class="material-icons">admin_panel_settings</span>
                        </Link>
                    }
                    {
                        auth.token &&
                        <button onClick={async () => await onLogoutClicked()} className="me-2 nav-link text-dark btn btn-sm  rounded " type="button" >
                            <span className="material-icons ">logout</span>
                        </button>

                    }
                    {

                        !auth.token &&
                        <form className="d-flex">
                            <button onClick={() => onSignupClicked()} className="me-2 nav-link  text-white btn btn-sm btn-dark rounded-pill" type="button" >Sign Up</button>
                            <button onClick={() => onLoginClicked()} className="me-5 nav-link btn btn-sm nav-link btn-outline-dark rounded-pill" type="button">Log In</button>
                        </form>
                    }

                </nav>

                <Modal
                    isOpen={loginModalIsOpen}
                    onRequestClose={() => setLoginModalIsOpen(false)}
                    ariaHideApp={false}
                    className="w-25 m-auto mt-5 shadow rounded ">
                    <Login closeLoginModal={() => setLoginModalIsOpen(false)} />
                </Modal>
                <Modal
                    isOpen={signupModalIsOpen}
                    onRequestClose={() => setSignupModalIsOpen(false)}
                    ariaHideApp={false}
                    className="w-25 m-auto mt-5 shadow rounded "
                >
                    <Signup closeSignupModal={() => setSignupModalIsOpen(false)} />
                </Modal>
            </div>
        </>
    )
}

export default NavBar;