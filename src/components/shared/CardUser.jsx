import React from 'react';
import { Link } from 'react-router-dom';


const CardUser = (props) => {
    return (
        <>
            {props && props.data &&
                <li className=" col mt-5 w-25">
                    <Link className="text-decoration-none text-dark" to={{ pathname: props.path, userProps: props.data }}>
                        <div className="card text-center w-50 m-auto" >
                            <div className="card-body">
                                <h5 className="card-title">{props.data.firstName} {props.data.lastName}</h5>
                            </div>
                            <p class="card-text">{props.data.role}</p>
                            <div className="mt-2">
                                <button type="button" className="btn btn-outline-dark rounded-pill btn-sm mb-2">See more</button>
                            </div>
                        </div>
                    </Link>
                </li >
            }
        </>
    )
}

export default CardUser;
