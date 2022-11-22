import { useStateContext } from "../../contexts/ContextProvider";
import Button from "./Button";

const consumptions = [
  {
    item: "Rice",
    quantity: "5 Kg",
    amount: "1500",
  },
  {
    item: "Lemon",
    quantity: "17 Kg",
    amount: "1601.50",
  },
  {
    item: "Sugar",
    quantity: "15 Kg",
    amount: "2500",
  },
  {
    item: "Milk",
    quantity: "5 L",
    amount: "1540",
  },
  {
    item: "Flour",
    quantity: "10 Kg",
    amount: "850",
  },
];

const RecentConsumption = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="col-span-1 container p-4 bg-white rounded-lg">
      <div className="container p-4">
        <p className="text-xl font-semibold">Recent Consumption</p>
      </div>

      <div className="flex flex-col">
        <div className="container p-4 ">
          {consumptions.map((consumption, index) => (
            <div key={index} className="flex justify-between mt-4">
              <div className="flex gap-4">
                <div>
                  <p className="text-md font-semibold">{consumption.item}</p>
                </div>
              </div>
              <p>{`- ${consumption.quantity}`}</p>
            </div>
          ))}
        </div>
        <div className="container p-4"></div>
        <Button
          color="white"
          bgColor={currentColor}
          text="View All"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
};

export default RecentConsumption;
