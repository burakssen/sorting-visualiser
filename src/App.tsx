import { useState, useEffect } from "react";
import SettingsPanel from "./components/SettingsPanel";
import SortingVisualiser from "./components/SortingVisualiser";
import { ArrayElement } from "@/types";
import { useSortingAlgorithms } from "./hooks/useSortingAlgorithms";
import { generateRandomArray } from "@/utils/arrayUtils";

const App = () => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [arraySize, setArraySize] = useState<number>(50);
  const [algorithm, setAlgorithm] = useState<string>("bubble");
  const { sortingAlgorithms, executeSort } = useSortingAlgorithms(setArray);

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  const generateArray = (size: number) => {
    setArray(generateRandomArray(size));
  };

  const handleOnSort = () => {
    executeSort(algorithm, array);
  };

  const handleOnShuffle = () => {
    generateArray(arraySize);
  };

  return (
    <div className="lg:flex">
      <SettingsPanel
        setArraySize={setArraySize}
        onSort={handleOnSort}
        onShuffle={handleOnShuffle}
        setAlgorithm={setAlgorithm}
        algorithms={sortingAlgorithms.map((alg) => alg.name)}
      />
      <SortingVisualiser array={array} />
    </div>
  );
};

export default App;
