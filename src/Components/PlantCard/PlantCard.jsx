import { differenceInDays, isPast, isToday } from "date-fns";
import { Trash2 } from "lucide-react";
import { Link } from "react-router";

const PlantCard = ({ plant, handleRemovePlant, handleGiveWater }) => {
  const {
    _id,
    tree,
    tree_category,
    photo,
    water_schedule,
    last_watered,
    next_water,
  } = plant;

  // handler function
  const newHealthCondition =
    last_watered && water_schedule
      ? (() => {
          const nextWaterDate = new Date(next_water);
          const today = new Date();
          const dayLeft = differenceInDays(nextWaterDate, today);
          if (isPast(nextWaterDate) || isToday(nextWaterDate)) {
            return "critical";
          }
          if (dayLeft === 1) {
            return "warning";
          }
          return "healthy";
        })()
      : "";

  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="h-70 w-full">
        <Link to={`/dashboard/myPlant/${_id}`}>
        <img className="w-full" src={photo} alt="Shoes" />
        </Link>
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{tree}</h2>
          <div
            className={`badge badge-outline ${newHealthCondition === "critical" ? "badge-error" : newHealthCondition === "warning" ? "badge-warning" : "badge-success"}`}
          >
            {newHealthCondition}
          </div>
        </div>
        <p>{tree_category}</p>
        <div className="card-actions justify-between">
          <button
            onClick={() => handleRemovePlant(_id)}
            className="btn btn-error text-white"
          >
            <Trash2 />
          </button>
          <button
            onClick={() => handleGiveWater(plant)}
            className="btn btn-primary"
          >
            Give water
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
