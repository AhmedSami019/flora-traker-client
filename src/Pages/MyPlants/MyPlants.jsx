import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import PlantCard from "../../Components/PlantCard/PlantCard";
import {
  addDays,
  differenceInDays,
  format,
  isPast,
  isToday,
  isValid,
} from "date-fns";

const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const instanceAxios = useAxios();

  // all states
  const [myPlants, setMyPlants] = useState([]);
  const [lastWatered, setLastWatered] = useState(null);
  const [waterSchedule, setWaterSchedule] = useState(null);
  // const [nextWaterDate, setNextWaterDate] = useState(null);
  const addTreeRef = useRef();

  // loading the plants from server if user is presents
  useEffect(() => {
    if (user) {
      instanceAxios.get("/plants").then((result) => {
        setMyPlants(result.data);
      });
    }
  }, [user, instanceAxios]);

  // to manage and calculate data
  const nextWaterDate =
    lastWatered && waterSchedule
      ? (() => {
          const date = new Date(lastWatered);

          // FIX: prevent invalid date crash
          if (!isValid(date)) return "";

          return format(addDays(date, Number(waterSchedule)), "MM-dd-yyyy");
        })()
      : "";

  // to manage health status
  const healthStatus =
    lastWatered && waterSchedule
      ? () => {
          const nextWaterDate = addDays(
            new Date(lastWatered),
            Number(waterSchedule),
          );
          const today = new Date();
          const daysLeft = differenceInDays(nextWaterDate, today);
          if (isPast(nextWaterDate) || isToday(nextWaterDate)) {
            return "critical";
          }
          if (daysLeft === 1) {
            return "warning";
          }
          return "healthy";
        }
      : "";

  // handler function
  const handleOpenModal = () => {
    addTreeRef.current?.showModal();
  };
  const handleCloseModal = () => {
    addTreeRef.current?.close();
    setWaterSchedule("");
    setLastWatered("");
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
      if (result.data.insertedId) {
        handleCloseModal();
        form.reset();
        Swal.fire({
          title: "success",
          icon: "success",
          text: "tree added successfully!",
        });
        newPlant._id = result.data.insertedId;
        setMyPlants([...myPlants, newPlant]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `there is an issue`,
        });
      }
    });
  };

  // handler function to remove single plant
  const handleRemovePlant = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          // use axios to delete
          instanceAxios.delete(`/plants/${id}`).then((result) => {
            if (result.data?.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remainingPlants = myPlants.filter(
                (plant) => plant._id !== id,
              );
              setMyPlants(remainingPlants);
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Could not find that plant to delete on the server.",
              });
            }
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${err.message}`,
        });
      });
  };

  return (
    <div className="min-h-screen">
      <div className="w-full flex justify-between sticky top-16 z-10 bg-base-300 py-4">
        <h2 className="text-2xl font-bold">My trees collection</h2>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          add tree
        </button>
        <dialog id="my_modal_1" ref={addTreeRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-center">Add new tree</h3>

            {/* modal to add new tree */}
            <div className="modal-action">
              <form onSubmit={handleAddNewTree} className="w-full">
                <fieldset className="fieldset w-full">
                  <label className="label">Tree name</label>
                  <input
                    type="text"
                    className="input w-full"
                    name="tree"
                    placeholder="tree name"
                    required
                  />

                  <label className="label">Category</label>
                  <select
                    id="plant-kingdom-trees"
                    className="input w-full"
                    name="tree_category"
                    required
                  >
                    {/* all options for tree category */}
                    <option value="">select category</option>
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
                    type="number"
                    className="input w-full"
                    name="water_schedule"
                    placeholder="Water every X days"
                    value={waterSchedule}
                    onChange={(e) => setWaterSchedule(e.target.value)}
                    required
                  />

                  <label className="label">Last Watered Date</label>

                  <input
                    type="date"
                    className="input w-full"
                    name="last_watered"
                    value={lastWatered}
                    onChange={(e) => setLastWatered(e.target.value)}
                    required
                  />

                  <label className="label">Next watering date</label>
                  <input
                    type="text"
                    className="input w-full"
                    name="next_water"
                    value={nextWaterDate}
                    readOnly
                  />

                  <label className="label">Health status</label>
                  <input
                    type="text"
                    className="input w-full"
                    name="health_status"
                    placeholder="condition of plant"
                    value={healthStatus}
                    required
                  />

                  <label className="label">Care level</label>
                  <select
                    className="input w-full"
                    name="care_level"
                    id="plant-care-level"
                    required
                  >
                    <option value="">select care option</option>
                    <option value="easy">easy</option>
                    <option value="moderate">moderate</option>
                    <option value="heard">heard</option>
                  </select>

                  <label className="label">Plant photo</label>
                  <input
                    type="text"
                    className="input w-full"
                    name="photo"
                    placeholder="plant photo url"
                    required
                  />

                  <label className="label">Author</label>
                  <input
                    type="text"
                    className="input w-full"
                    name="author"
                    defaultValue={user ? user.displayName : ""}
                    placeholder={!user ? "enter name" : ""}
                    required
                  />

                  <label className="label">Author email</label>
                  <input
                    type="email"
                    className="input w-full"
                    name="author_email"
                    defaultValue={user ? user.email : ""}
                    placeholder={!user ? "enter email" : ""}
                    required
                  />
                </fieldset>
                {/* handler button */}
                <div className="w-full flex gap-5 justify-between mt-5">
                  <button
                    type="button"
                    className="w-1/3 btn"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="w-1/3 btn btn-primary">
                    submit
                  </button>
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
          <PlantCard
            key={plant._id}
            plant={plant}
            handleRemovePlant={handleRemovePlant}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPlants;
