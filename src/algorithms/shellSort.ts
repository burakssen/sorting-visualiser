import { ArrayElement } from "@/types";
import { delay } from "@/utils/sortingUtils";

export const shellSort = async (
  array: ArrayElement[],
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>
) => {
  const newArray = [...array];
  const n = newArray.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i += 1) {
      const temp = newArray[i];
      let j: number;

      for (
        j = i;
        j >= gap && newArray[j - gap].value > temp.value;
        j -= gap
      ) {
        newArray[j] = newArray[j - gap];
        newArray[j].state = "comparing";
        setArray([...newArray]);
        await delay(0.5);
      }

      newArray[j] = temp;
      setArray([...newArray]);
      await delay(50);
    }
  }

  newArray.forEach((element) => {
    element.state = "sorted";
  });

  setArray([...newArray]);
};