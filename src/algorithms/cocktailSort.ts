import { ArrayElement } from "@/types";
import { delay, swap } from "@/utils/sortingUtils";

export const cocktailSort = async (
  array: ArrayElement[],
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>
) => {
  const newArray = [...array];
  let swapped = true;
  let start = 0;
  let end = newArray.length;

  while (swapped) {
    swapped = false;

    for (let i = start; i < end - 1; i++) {
      if (newArray[i].value > newArray[i + 1].value) {
        swap(newArray, i, i + 1);
        swapped = true;
        setArray([...newArray]);
        await delay(0.001);
      }
    }

    if (!swapped) break;

    swapped = false;
    end--;

    for (let i = end - 1; i >= start; i--) {
      if (newArray[i].value > newArray[i + 1].value) {
        swap(newArray, i, i + 1);
        swapped = true;
        setArray([...newArray]);
        await delay(0.001);
      }
    }

    start++;
  }

  newArray.forEach((element) => {
    element.state = "sorted";
  });

  setArray([...newArray]);
};