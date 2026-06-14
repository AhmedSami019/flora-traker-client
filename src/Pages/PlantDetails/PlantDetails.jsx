import { useLoaderData } from "react-router";

const PlantDetails = () => {

    const plant = useLoaderData()
    console.log(plant);

    return (
        <div>
            this details
        </div>
    );
};

export default PlantDetails;