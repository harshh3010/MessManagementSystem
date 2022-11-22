import Stacked from "./Charts/Stacked";

const ConsumptionOverview = () => {
  return (
    <div className="col-span-2 container p-8 bg-white rounded-lg">
      <p className="text-xl font-semibold">Consumption Overview</p>
      <div className="container p-8">
        <Stacked />
      </div>
    </div>
  );
};

export default ConsumptionOverview;
