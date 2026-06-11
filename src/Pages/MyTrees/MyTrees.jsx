import { useContext, useEffect, useRef, useState, } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import PlantCard from "../../Components/PlantCard/PlantCard";

const MyTrees = () => {
  const { user } = useContext(AuthContext);
  const instanceAxios = useAxios();

     // all states
    const [myPlants, setMyPlants] = useState([])

  const addTreeRef = useRef();

  // handler function
  const handleOpenModal = () => {
    addTreeRef.current?.showModal();
  };
  const handleCloseModal = () => {
    addTreeRef.current?.close();
  };

  const handleAddNewTree = (e) => {
    e.preventDefault();
    console.log("new tree added");
    const form = e.target;
    const formData = new FormData(form);
    const newPlant = Object.fromEntries(formData.entries());
    console.log(newPlant);
    // for post the tree in to server
    instanceAxios.post("/plants", newPlant).then((result) => {
      console.log(result);
      if (result.data.insertedId) {
        handleCloseModal()
        form.reset()
        Swal.fire({
          title: "success",
          icon: "success",
          text: "tree added successfully!",
        });
        newPlant._id = result.data.insertedId
        setMyPlants([...myPlants, newPlant])
      }else{
         Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `there is an issue`,
                });
      }
    });
  };

   // loading the plants from server if user is presents
    useEffect(()=>{
          if(user){
        instanceAxios.get('/plants')
        .then(result => {
            setMyPlants(result.data)
        })
    }
    }, [user, instanceAxios])
  
  return (
    <div className="min-h-screen">
      <div className="w-full flex justify-between ">
        <h2 className="text-2xl font-bold">My trees collection</h2>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          add tree
        </button>
        <dialog id="my_modal_1" ref={addTreeRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-center">Add new tree</h3>

            {/* modal to add new tree */}
            <div className="modal-action">
              <form
                onSubmit={handleAddNewTree}
                className="w-full"
              >
                <fieldset className="fieldset w-full">
                  <label className="label">Tree name</label>
                  <input
                    type="text"
                    className="input w-full"
                    name="tree"
                    placeholder="tree name"
                  />

                  <label className="label">Category</label>
                  <select
                    id="plant-kingdom-trees"
                    className="input w-full"
                    name="tree_category"
                  >
                    {/* all options for tree category */}
                    <option value="true-tree-ferns">True Tree Ferns</option>
                    <option value="primitive-scale-trees">
                      Primitive Scale Trees (Extinct)
                    </option>
                    <option value="conifers">Conifers</option>
                    <option value="cycads">Cycads</option>
                    <option value="ginkgos">Ginkgos</option>
                    <option value="gnetophytes">Gnetophytes</option>
                    <option value="deciduous-broadleaf">
                      Deciduous Broadleaf Trees
                    </option>
                    <option value="broadleaf-evergreens">
                      Broadleaf Evergreens
                    </option>
                    <option value="fruit-flowering-trees">
                      Fruit and Flowering Trees
                    </option>
                    <option value="palms">Palms</option>
                    <option value="tree-grasses">Tree Grasses</option>
                    <option value="tree-agaves-lilies">
                      Tree Agaves & Lilies
                    </option>
                  </select>

                  <label className="label">Watering schedule</label>
                  <input
                    type="text"
                    className="input w-full"
                    name="water_schedule"
                    placeholder="day after"
                  />

                  <label className="label">Author</label>
                  <input
                    type="text"
                    className="input w-full"
                    name="author"
                    defaultValue={user ? user.displayName : ""}
                    placeholder={!user ? "enter name" : ""}
                  />

                  <label className="label">Author email</label>
                  <input
                    type="email"
                    className="input w-full"
                    name="author_email"
                    defaultValue={user ? user.email : ""}
                    placeholder={!user ? "enter email" : ""}
                  />
                </fieldset>
                {/* handler button */}
                <div className="w-full flex gap-5 justify-between mt-5">
                  <button type="button" className="w-1/3 btn" onClick={handleCloseModal}>
                    Close
                  </button>
                  <button type="submit" className="w-1/3 btn btn-primary">submit</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <div className="divider"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
        {/* {
          myPlants.map(plant => {
          <div key={plant._id}>{plant.tree}</div>})
        } */}
        {myPlants.map((plant) => (
          <PlantCard key={plant._id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default MyTrees;
