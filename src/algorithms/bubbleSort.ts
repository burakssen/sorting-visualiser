import { ArrayElement } from "@/types";
import { delay, swap } from "@/utils/sortingUtils";

export const bubbleSort = async (
  array: ArrayElement[], 
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>
) => {
  const n = array.length;
  let isSorted = false;
  const newArray = [...array];

  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < n - 1; i++) {
      newArray[i].state = "comparing";
      newArray[i + 1].state = "comparing";
      setArray([...newArray]);
      await delay(10);

      if (newArray[i].value > newArray[i + 1].value) {
        swap(newArray, i, i + 1);
        isSorted = false;
        setArray([...newArray]);
        await delay(50);
      }

      newArray[i].state = "default";
      newArray[i + 1].state = "default";
      setArray([...newArray]);
      await delay(10);
    }
  }

  newArray.forEach((element) => {
    element.state = "sorted";
  });

  setArray([...newArray]);
};
