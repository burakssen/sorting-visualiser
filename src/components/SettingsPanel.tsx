import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useState } from "react";

type SettingsPanelProps = {
  onSort: () => void; // Function to be called when the Sort button is clicked
  onShuffle: () => void; // Function to be called when the Shuffle button is clicked
  setArraySize: (size: number) => void; // Function to be called when the array size is changed
  setAlgorithm: (algorithm: string) => void; // Function to be called when the algorithm is changed
  algorithms: string[]; // List of available algorithms
};

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onSort,
  onShuffle,
  setArraySize,
  setAlgorithm,
  algorithms,
}) => {
  const [size, setSize] = useState(50);

  return (
    <div className="flex flex-col w-full lg:w-1/4 lg:h-screen p-4 border-r-4">
      <div className="lg:flex-grow">
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium">
            Array Size: {size}
          </label>
          <Slider
            defaultValue={[50]}
            max={1000}
            min={10}
            step={1}
            onValueChange={(value) => {
              setSize(value[0]);
              setArraySize(value[0]);
            }}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium">
            Sorting Algorithm
          </label>
          <Select
            onValueChange={(value) => {
              setAlgorithm(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Bubble Sort" />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map((algorithm) => (
                <SelectItem key={algorithm} value={algorithm}>
                  {algorithm}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pb-10">
        <h2 className="text-lg font-medium mb-2">Instructions</h2>
        <p className="text-sm">
          Click the <strong>Shuffle</strong> button to generate a new random
          array. Click the <strong>Sort</strong> button to sort the array using
          the selected algorithm.
        </p>
        <p className="text-sm mt-2">
          You can adjust the array size and select a sorting algorithm from the
          dropdown. Because of the visual nature of this tool, the array size is
          limited to 1000 elements. Also after 400 elements you have to scroll
          to see the whole array.
        </p>
        <p className="text-sm mt-2">
          The performance of the sorting algorithms is not representative of
          their actual performance. The purpose of this tool is to visualise how
          the algorithms work and how they compare to each other. Server side
          rendering can be used to improve the performance though I have not yet
          implemented it.
        </p>
      </div>

      <div className="flex flex-col space-y-2">
        <Button onClick={onShuffle}>Shuffle</Button>
        <Button variant="secondary" onClick={onSort}>
          Sort
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
