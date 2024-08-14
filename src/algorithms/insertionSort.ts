import { ArrayElement } from "@/types";
import { delay } from "@/utils/sortingUtils";

export const insertionSort = async (
  array: ArrayElement[],
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>
) => {
  const newArray = [...array];

  for (let i = 1; i < newArray.length; i++) {
    const key = newArray[i].value;
    let j = i - 1;

    while (j >= 0 && newArray[j].value > key) {
      newArray[j].state = "comparing";
      newArray[j + 1].state = "comparing";
      setArray([...newArray]);
      await delay(10);

      newArray[j + 1] = newArray[j];
      j = j - 1;
    }

    newArray[j + 1].value = key;
    setArray([...newArray]);
    await delay(50);

    newArray[j + 1].state = "default";
    newArray[i].state = "sorted";
    setArray([...newArray]);
    await delay(10);
  }

  newArray.forEach((element) => {
    element.state = "sorted";
  });

  setArray([...newArray]);
};