import { Trash2 } from "lucide-react";

const PlantCard = ({plant}) => {
    const {tree, tree_category} = plant
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{tree}</h2>
        <p>
          {tree_category}
        </p>
        <div className="card-actions justify-between">
            <button className="btn btn-error text-white"><Trash2/></button>
          <button className="btn btn-primary">Give water</button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
