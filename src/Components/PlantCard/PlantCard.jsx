import { Trash2 } from "lucide-react";

const PlantCard = ({plant, handleRemovePlant}) => {
    const {_id, tree, tree_category, photo} = plant
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="h-70 w-full">
        <img
        className="w-full"
          src={photo}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{tree}</h2>
        <p>
          {tree_category}
        </p>
        <div>
          {}
        </div>
        <div className="card-actions justify-between">
            <button onClick={()=> handleRemovePlant(_id)} className="btn btn-error text-white"><Trash2/></button>
          <button className="btn btn-primary">Give water</button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
