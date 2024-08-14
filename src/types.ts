export interface ArrayElement {
    value: number;
    state: "default" | "sorted" | "comparing" | "pivot";
};

export interface SortingAlgorithm {
    name: string;
    sort: (array: ArrayElement[]) => void;
};
