import { ArrayElement } from "@/types";
import { delay, swap } from "@/utils/sortingUtils";

export const selectionSort = async (
  array: ArrayElement[],
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>
) => {
  const newArray = [...array];

  for (let i = 0; i < newArray.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < newArray.length; j++) {
      newArray[j].state = "comparing";
      newArray[minIndex].state = "comparing";
      setArray([...newArray]);
      await delay(10);

      if (newArray[j].value < newArray[minIndex].value) {
        minIndex = j;
      }

      newArray[j].state = "default";
      newArray[minIndex].state = "default";
      setArray([...newArray]);
      await delay(10);
    }

    swap(newArray, i, minIndex);
    setArray([...newArray]);
    await delay(50);

    newArray[i].state = "sorted";
    setArray([...newArray]);
    await delay(10);
  }

  newArray.forEach((element) => {
    element.state = "sorted";
  });

  setArray([...newArray]);
};