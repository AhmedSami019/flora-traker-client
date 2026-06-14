import {
  addDays,
  differenceInDays,
  format,
  isPast,
  isToday,
  isValid,
} from "date-fns";
import { useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PlantDetails = () => {
  const plant = useLoaderData();
  const {
    photo,
    tree,
    tree_category,
    care_level,
    last_watered,
    next_water,
    water_schedule,
    author,
  } = plant;
  console.log(plant);

  const axiosSecure = useAxiosSecure()

  const [lastWatered, setLastWatered] = useState(last_watered);

  const nextWaterDate =
    lastWatered && water_schedule
      ? (() => {
          const date = new Date(lastWatered);

          // FIX: prevent invalid date crash
          if (!isValid(date)) return "";

          return format(addDays(date, Number(water_schedule)), "dd-MM-yyyy");
        })()
      : "";

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
  // handle give water
  const handleGiveWater = async (plant) => {
    try {
      const toDay = new Date();
      const updateDate = {
        last_watered: toDay.toISOString(),
        next_water: addDays(toDay, Number(plant.water_schedule)).toISOString(),
      };
      const result = await axiosSecure.patch(
        `/plants/${plant._id}`,
        updateDate,
      );

      if (result.data.modifiedCount > 0) {
        setLastWatered(toDay);
        Swal.fire({
          icon: "success",
          title: "Plant Watered!",
          text: `${plant.tree} has been watered.`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`,
      });
    }
  };

  return (
    <div>
      <section className="flex flex-col md:flex-row gap-3 md:gap-8">
        {/* right side */}
        <div className="w-1/3">
          <figure>
            <img className="rounded-xl w-full" src={photo} alt="" />
          </figure>
        </div>

        {/* right side */}
        <div className="space-y-4 w-2/3">
          <h2 className="text-3xl font-bold "> {tree}</h2>
          <div className="divider w-full"></div>
          <p className="text-gray-600">
            Category : <span className="font-bold">{tree_category}</span>
          </p>
          <p className="text-gray-600">
            Care level :{" "}
            <span
              className={`badge font-semibold ${care_level === "heard" ? "badge-error" : care_level === "moderate" ? "badge-warning" : "badge-success"}`}
            >
              {care_level}
            </span>{" "}
          </p>
          <p className="text-gray-600">
            Health status :{" "}
            <span
              className={`badge font-semibold ${newHealthCondition === "critical" ? "badge-error" : newHealthCondition === "warning" ? "badge-warning" : "badge-success"}`}
            >
              {newHealthCondition}
            </span>
          </p>
          <p className="text-gray-600">
            Water schedule :{" "}
            <span className="font-bold">after {water_schedule} days</span>
          </p>
          <p className="text-gray-600">
            Last watered date :{" "}
            <span className="font-bold">
              {format(lastWatered, "dd-MM-yyyy")}
            </span>
          </p>
          <p className="text-gray-600">
            Next water date : <span className="font-bold">{nextWaterDate}</span>
          </p>
          <div className="flex gap-5">
            <button
              onClick={() => handleGiveWater(plant)}
              className="btn btn-primary"
            >
              Give water
            </button>
          </div>
          <div className="divider"></div>
          <h3 className="text-gray-600 text-xl font">
            Owner: <span className="text-black font-bold">{author}</span>
          </h3>
        </div>
      </section>
    </div>
  );
};

export default PlantDetails;
