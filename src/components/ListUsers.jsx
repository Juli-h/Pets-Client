import { useEffect, useState } from 'react';
import { useAuth } from "../context/Auth";
import { getUsers } from '../lib/api';
import CardUser from './shared/CardUser';

const ListUsers = () => {
    const auth = useAuth();
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(false);

    async function listUsers() {
        try {
            const data = await getUsers(auth.token);
            return data;
        }
        catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        async function loadData() {
            setIsLoading(true)
            const usersRes = await listUsers();
            setUsers(usersRes);
            setIsLoading(false)
        }
        loadData();
    }, []);

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center mt-5 pt-5" >
                <div className=" ">
                    <h1 className="d-flex justify-content-center align-items-center">List Users</h1>
                    <div>
                        {isLoading && <div class="spinner-border text-dark  mx-5" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                    </div>
                    <ul className="row row-cols-1 row-cols-md-4 g-2 list-unstyled  justify-content-between align-items-center  " >
                        {users && users.map((user) =>
                        <CardUser
                        key={user.id}
                        data={user}
                        path="/detailsusers"
                      />
                      )}                     
                    </ul> 
                </div>
            </div>
        </>
    )
}

export default ListUsers;