import { getMyPets } from '../../lib/api';
import { useEffect, useState } from 'react';
import { useAuth } from "../../context/Auth";
import CardItem from '../shared/CardItem';

  const MyPetsPage = () => {
  const [pets, setPets] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth()

  async function getMyPetsPage() {
    try {
      const data = await getMyPets(auth.user.id);
      return data;
    }
    catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    async function loadData() { 
      setIsLoading(true)
      const petsRes = await getMyPetsPage();
      setPets(petsRes);
      setIsLoading(false)
    }
    loadData()
  }, []);

  return (
    <>
      <div className="" >
        <div className="mt-5 pt-5 ">
          <h1 className="text-center my-5"> {auth.user?.firstName} Pets </h1>
          <div>
            {isLoading && <div class="spinner-border text-dark  mx-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>}
          </div>
          {(!pets || pets.length < 1) && <h3 className="text-center">You currently do not own or foster any pets
          <span className="material-icons ms-2">pets</span></h3>}
          <ul className="row row-cols-1 row-cols-md-4 g-2 list-unstyled  justify-content-between align-items-center " >
            {pets && pets.map((pet) =>
              <CardItem
                key={pet.id}
                data={pet}
                path="/details"
              />
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default MyPetsPage;