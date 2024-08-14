import React, { useRef, useEffect, useState } from "react";
import styles from "@/SortingVisualiser.module.css"; // Adjust the path as necessary
import { ArrayElement } from "@/types";

interface SortingVisualiserProps {
  array: ArrayElement[];
}

const SortingVisualiser: React.FC<SortingVisualiserProps> = ({ array }) => {
  const [barWidth, setBarWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const numberOfBars = array.length;
      const calculatedBarWidth = Math.max(containerWidth / numberOfBars - 2, 1); // Calculate bar width with some spacing
      setBarWidth(calculatedBarWidth);
    }
  }, [array]); // Recalculate bar width when `array` changes

  // Calculate the maximum value for scaling heights
  const maxValue = Math.max(...array.map((item) => item.value), 1);

  return (
    <div className={styles.scrollable_container} ref={containerRef}>
      {array.map((element, index) => (
        <div
          key={index}
          className={`${styles.bar} ${
            element.state === "comparing"
              ? styles["bar-comparing"]
              : element.state === "sorted"
              ? styles["bar-sorted"]
              : styles["bar-default"]
          }`}
          style={{
            width: `${barWidth}px`, // Fixed width for each bar
            height: `${(element.value / maxValue) * 100}%`,
            minWidth: "1px", // Minimum width to ensure bars are visible
          }}
        ></div>
      ))}
    </div>
  );
};

export default SortingVisualiser;
