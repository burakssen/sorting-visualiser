import { ArrayElement } from "@/types";
import { delay } from "@/utils/sortingUtils";

export const mergeSort = async (
  array: ArrayElement[],
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>
) => {
  const merge = async (left: ArrayElement[], right: ArrayElement[]) => {
    const result: ArrayElement[] = [];
    let leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      left[leftIndex].state = "comparing";
      right[rightIndex].state = "comparing";
      setArray([...array]);
      await delay(10);

      if (left[leftIndex].value < right[rightIndex].value) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  const mergeSortHelper = async (
    arr: ArrayElement[],
    start: number,
    end: number
  ) => {
    if (start >= end) return;

    const middle = Math.floor((start + end) / 2);
    await mergeSortHelper(arr, start, middle);
    await mergeSortHelper(arr, middle + 1, end);

    const left = arr.slice(start, middle + 1);
    const right = arr.slice(middle + 1, end + 1);
    const merged = await merge(left, right);

    for (let i = start; i <= end; i++) {
      arr[i] = merged[i - start];
      arr[i].state = "sorted";
      setArray([...arr]);
      await delay(10);
    }
  };

  await mergeSortHelper(array, 0, array.length - 1);
};