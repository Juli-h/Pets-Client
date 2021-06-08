import React from 'react';
import { Link } from 'react-router-dom';


const CardItem = (props) => {
    return (
        <>
            {props && props.data &&
                <li className=" col mt-5 w-25">
                    <Link className="text-decoration-none text-dark" to={{ pathname: props.path, petProps: props.data }}>
                        <div className=" card text-center w-75 m-auto">
                            <img src={props.data.picture_url} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{props.data.name}</h5>
                            </div>
                            <ul className="list-group list-group-flush ">
                                <li className="list-group-item">{props.data.pet_type}</li>
                                <li className="list-group-item">{props.data.adoption_status}</li>
                            </ul>
                            <div className="mt-2">
                                <button type="button" className="btn btn-outline-dark rounded-pill btn-sm mb-2">See more</button>
                            </div>
                        </div>
                    </Link>
                </li>
            }
        </>
    )
}

export default CardItem;