import { useEffect, useState } from 'react';
import CardItem from './shared/CardItem';
import { search } from '../lib/api';


const SearchPage = () => {
  const [pets, setPets] = useState();
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const message = isAdvancedSearch ? `Switch to basic Search` : 'Switch to advanced Search'
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPetType, setSelectedPetType] = useState();
  const [selectedAdoptionStatus, setSelectedAdoptionStatus] = useState();
  const [selectedHeight, setSelectedHeight] = useState();
  const [selectedWeight, setSelectedWeight] = useState();
  const [selectedName, setSelectedName] = useState();

  async function searchPets() {
    try {
      const data = await search();
      return data;
    }
    catch (err) {
      alert(err);
    }
  }

  async function onPetTypeChange(petTypeValue) {
    setSelectedPetType(petTypeValue);
    const data = await search(petTypeValue, selectedAdoptionStatus, selectedHeight, selectedWeight, selectedName)
    setPets(data);
  }

  async function onAdoptionStatusChange(adoptionStatusValue) {
    setSelectedAdoptionStatus(adoptionStatusValue);
    const data = await search(selectedPetType, adoptionStatusValue, selectedHeight, selectedWeight, selectedName,)
    setPets(data);
  }

  async function onHeightChange(heightValue) {
    setSelectedHeight(heightValue);
    const data = await search(selectedPetType, selectedAdoptionStatus, heightValue, selectedWeight, selectedName)
    setPets(data);
  }

  async function onWeightChange(weightValue) {
    setSelectedWeight(weightValue);
    const data = await search(selectedPetType, selectedAdoptionStatus, selectedHeight, weightValue, selectedName)
    setPets(data);
  }

  async function onNameChange(nameValue) {
    setSelectedName(nameValue)
    const data = await search(selectedPetType, selectedAdoptionStatus, selectedHeight, selectedWeight, nameValue)
    setPets(data);

  }

  function onAdvancedOptionsChange(event) {
    event.preventDefault();
    isAdvancedSearch ? setIsAdvancedSearch(false) : setIsAdvancedSearch(true);
  }

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const petsRes = await searchPets();
      setPets(petsRes);
      setIsLoading(false)
    }
    loadData()
  }, []);

  return (
    <>
      <div>
        <div className="mt-5 pt-5 mx-5">
          <div className="d-flex text-center justify-content-center">
            <button className="d-flex justify-content-between mt-5 btn-dark rounded-pill btn-lg" onClick={e => onAdvancedOptionsChange(e)}>{message}
              <span className="material-icons h-100 ">
                search
            </span>
            </button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            {isLoading && <div class="spinner-border text-dark  mx-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>}
          </div>
          <form className="justify-content-center mt-4 p-5 bg-white ">
            <div className="row mb-3 d-flex">
              <label className="col-sm-2 col-form-label fw-bold">Type</label>
              <div className="col-sm-10">
                <select type="text" className="form-select"
                  onChange={async e => await onPetTypeChange(e.target.value)}
                  id="petType" name="petType">
                  <option value="" >Selcet Pet Type</option>
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
            </div>
            {isAdvancedSearch && <div className="row mb-3 d-flex">
              <div className="d-flex justify-content-between mt-5 ">
                <label htmlFor="adoptionStatus" className="col-sm-2 col-form-label fw-bold">Adoption Status</label>
                <div className="col-sm-10">
                  <select type="text" className="form-select"
                    onChange={async e => await onAdoptionStatusChange(e.target.value)}
                    id="adoptionStatus" name="adoptionStatus" placeholder="Adoption Status ..." >
                    <option value="" >Selcet Adoption Status</option>
                    <option value="available" >Available</option>
                    <option value="fostered" >Fostered</option>
                    <option value="adopted" >Adopted</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3 d-flex mt-5">
                <label className="col-sm-2 col-form-label fw-bold">Height</label>
                <div className="col-sm-10 ">
                  <input type="text" className="form-control "
                    onChange={async e => await onHeightChange(e.target.value)}
                    id="height" name="height" placeholder="Height..." />
                </div>
              </div>

              <div className="mt-5 row mb-3 d-flex">
                <label className="col-sm-2 col-form-label fw-bold">Weight</label>
                <div className="col-sm-10 ">
                  <input type="text" className="form-control "
                    onChange={async e => await onWeightChange(e.target.value)}
                    id="weight" name="weight" placeholder="Weight..." />
                </div>
              </div>

              <div className="mt-5 row mb-3 d-flex">
                <label className="col-sm-2 col-form-label fw-bold">Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control "
                    onChange={async e => await onNameChange(e.target.value)}
                    id="name" name="name" placeholder="Name..." />
                </div>
              </div>
            </div>}
          </form>

          <ul className=" row row-cols-1 row-cols-md-4 g-2 list-unstyled  justify-content-between align-items-center " >
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

export default SearchPage;