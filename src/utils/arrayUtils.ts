import { ArrayElement } from "@/types";

export const generateRandomArray = (size: number): ArrayElement[] => {
  const newArray: ArrayElement[] = Array.from(
    { length: size },
    (_, index) => ({
      value: index + 1,
      state: "default",
    })
  );

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

