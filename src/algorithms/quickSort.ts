import { ArrayElement } from "@/types";
import { delay, swap } from "@/utils/sortingUtils";

export const quickSort = async (
  array: ArrayElement[],
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>
) => {
  const partition = async (
    arr: ArrayElement[],
    low: number,
    high: number
  ): Promise<number> => {
    const pivot = arr[high].value;
    let i = low - 1;

    for (let j = low; j < high; j++) {
      arr[j].state = "comparing";
      arr[high].state = "pivot";
      setArray([...arr]);
      await delay(10);

      if (arr[j].value < pivot) {
        i++;
        swap(arr, i, j);
        setArray([...arr]);
        await delay(10);
      }
    }

    swap(arr, i + 1, high);
    setArray([...arr]);
    await delay(10);

    return i + 1;
  };

  const quickSortHelper = async (
    arr: ArrayElement[],
    low: number,
    high: number
  ) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  await quickSortHelper(array, 0, array.length - 1);

  array.forEach((element) => {
    element.state = "sorted";
  });

  setArray([...array]);
};