import { useContext, useRef } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const MyTrees = () => {

  const {user} = useContext(AuthContext)

  const addTreeRef = useRef()

  // handler function
  const handleOpenModal = ()=>{
    addTreeRef.current?.showModal()
  }
  const handleCloseModal = ()=>{
    addTreeRef.current?.close()
  }

  return (
    <div>
      <div className="w-full flex justify-between min-h-screen">
        <h2 className="text-2xl font-bold">My trees collection</h2>
        <button
          className="btn btn-primary"
          onClick={handleOpenModal}
        >
          add tree
        </button>
        <dialog id="my_modal_1" ref={addTreeRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-center">Add new tree</h3>
           
            <div className="modal-action">
              <form className="w-full" method="dialog">
                <fieldset className="fieldset w-full">

                  <label className="label">Tree name</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="tree name"
                  />

                  <label className="label">Category</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="tree category"
                  />

                  <label className="label">Watering schedule</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="day after"
                  />

                  <label className="label">Author</label>
                  <input type="text" className="input w-full" defaultValue={user? user.displayName: ""} placeholder={!user? "enter name": ""}/>

                  <label className="label">Author email</label>
                  <input type="email" className="input w-full" defaultValue={user? user.email: ""} placeholder={!user? "enter email": ""} />
                </fieldset>
                {/* handler button */}
                <div className="w-full flex gap-5 justify-between mt-5">
                <button className="w-1/3 btn" onClick={handleCloseModal}>Close</button>
                <button className="w-1/3 btn btn-primary">submit</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyTrees;
