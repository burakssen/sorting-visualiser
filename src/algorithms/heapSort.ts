import { ArrayElement } from "@/types";
import { delay, swap } from "@/utils/sortingUtils";

export const heapSort = async (
  array: ArrayElement[],
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>
) => {
  const heapify = async (arr: ArrayElement[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left].value > arr[largest].value) largest = left;
    if (right < n && arr[right].value > arr[largest].value) largest = right;

    if (largest !== i) {
      swap(arr, i, largest);
      setArray([...arr]);
      await delay(10);

      await heapify(arr, n, largest);
    }
  };

  const heapSortHelper = async (arr: ArrayElement[]) => {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      swap(arr, 0, i);
      setArray([...arr]);
      await delay(10);

      await heapify(arr, i, 0);
    }
  };

  await heapSortHelper(array);

  array.forEach((element) => {
    element.state = "sorted";
  });

  setArray([...array]);
};