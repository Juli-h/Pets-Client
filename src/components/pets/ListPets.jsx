import { useEffect, useState } from 'react';
import CardItem from '../shared/CardItem';
import { search } from '../../lib/api';

const ListPets = () => {
  const [pets, setPets] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function searchListPets() {
    try {
      const data = await search();
      return data;
    }
    catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const petsRes = await searchListPets();
      setPets(petsRes);
      setIsLoading(false)
    }
    loadData()
  }, []);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center mt-5 pt-5" >
        <div className=" ">
          <h1 className="d-flex justify-content-center align-items-center">List Pets</h1>
          <div>
            {isLoading && <div class="spinner-border text-dark  mx-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>}
          </div>
          <ul className="row row-cols-1 row-cols-md-4 g-2 list-unstyled  justify-content-between align-items-center " >
            {pets && pets.map((pet) =>
              <CardItem
                key={pet.id}
                data={pet}
                path="/edit"
              />
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default ListPets;