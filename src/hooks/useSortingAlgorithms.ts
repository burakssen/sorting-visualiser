import { useCallback, useMemo } from "react";
import { ArrayElement } from "@/types";
import {
  bubbleSort,
  mergeSort,
  quickSort,
  insertionSort,
  heapSort,
  selectionSort,
  radixSort,
  shellSort,
  cocktailSort,
} from "@/utils/index";

export const useSortingAlgorithms = (
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>
) => {
  const sortingAlgorithms = useMemo(() => [
    { name: "bubble", sort: bubbleSort },
    { name: "merge", sort: mergeSort },
    { name: "quick", sort: quickSort },
    { name: "insertion", sort: insertionSort },
    { name: "heap", sort: heapSort },
    { name: "selection", sort: selectionSort },
    { name: "radix", sort: radixSort },
    { name: "shell", sort: shellSort },
    { name: "cocktail", sort: cocktailSort },
  ], []);

  const executeSort = useCallback(
    (algorithmName: string, array: ArrayElement[]) => {
      const algorithm = sortingAlgorithms.find(
        (alg) => alg.name === algorithmName
      );
      if (algorithm) {
        algorithm.sort(array, setArray);
      }
    },
    [sortingAlgorithms, setArray]
  );

  return { sortingAlgorithms, executeSort };
};
