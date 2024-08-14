import { ArrayElement } from "@/types";
import { delay } from "@/utils/sortingUtils";

export const radixSort = async (
  array: ArrayElement[],
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>
) => {
  const countingSort = async (
    arr: ArrayElement[],
    n: number,
    exp: number
  ) => {
    const output: ArrayElement[] = Array.from({ length: n }, () => ({
      value: 0,
      state: "default",
    }));
    const count: number[] = Array.from({ length: 10 }, () => 0);

    for (let i = 0; i < n; i++) {
      count[Math.floor(arr[i].value / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      const index = Math.floor(arr[i].value / exp) % 10;
      output[count[index] - 1] = arr[i];
      count[index]--;
    }

    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      arr[i].state = "sorted";
      setArray([...arr]);
      await delay(10);
    }
  };

  const getMax = (arr: ArrayElement[]) => {
    let max = arr[0].value;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].value > max) max = arr[i].value;
    }
    return max;
  };

  const max = getMax(array);
  const n = array.length;

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    await countingSort(array, n, exp);
  }
};