import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  nextColor,
  previousColor,
  randomColor,
  selectCurrentColor,
  setColor,
  setHistoryIndex,
} from "./colorPickerSlice";

export function ColorPicker() {
  const color = useAppSelector(selectCurrentColor);
  const colorOptions = useAppSelector((state) => state.colorPicker.colors);
  const historyIndex = useAppSelector(
    (state) => state.colorPicker.historyIndex
  );
  const colorHistory = useAppSelector(
    (state) => state.colorPicker.colorHistory
  );
  const dispatch = useAppDispatch();
  const [colorInput, setColorInput] = useState(colorOptions[0]);
  const colorSet = new Set(colorOptions);
  const validColorInput = colorSet.has(colorInput);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current
      ?.querySelector("button[data-selected='true']")
      ?.scrollIntoView({ behavior: "smooth" });
  }, [colorHistory, historyIndex]);

  return (
    <div>
      <button onClick={() => dispatch(previousColor())}>Previous</button>
      <button onClick={() => dispatch(nextColor())}>Next</button>
      <button onClick={() => dispatch(randomColor())}>Random Color</button>
      <div
        style={{ display: "flex", margin: 100, justifyContent: "space-evenly" }}
      >
        <div>
          <h3>Current Color</h3>
          <div
            style={{
              width: 200,
              height: 200,
              background: color,
              borderRadius: 5,
              transition: ".3s all",
            }}
          />
        </div>
        <div>
          <h3>Custom Color</h3>
          <input
            placeholder="Type a color here"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
          />
          <div
            style={{
              background: validColorInput ? colorInput : undefined,
              color: "white",
              borderRadius: 5,
              margin: 2,
              padding: 5,
              transition: ".2s all",
              display: "inline-block",
            }}
          >
            <button
              disabled={!validColorInput}
              onClick={() => dispatch(setColor(colorInput))}
            >
              Add Color
            </button>
          </div>
          {validColorInput ? null : (
            <div style={{ color: "black", padding: 5 }}>
              Not a valid custom color
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <h2>Options</h2>
          {colorOptions.map((colorOption) => (
            <div key={colorOption}>
              <button
                style={{
                  backgroundColor: colorOption,
                  margin: 5,
                  width: 200,
                  padding: 10,
                  border: 0,
                  borderRadius: 5,
                  color: "darkgray",
                }}
                onClick={() => dispatch(setColor(colorOption))}
              >
                {colorOption}
              </button>
            </div>
          ))}
        </div>
        <div>
          <h2>History</h2>
          <div
            style={{
              maxHeight: 200,
              overflow: "auto",
              border: "1px solid lightgray",
              padding: 10,
              borderRadius: 5,
            }}
            ref={ref}
          >
            {colorHistory.map((colorHistoryItem, index) => (
              <button
                key={index}
                style={{
                  margin: 5,
                  padding: 5,
                  display: "flex",
                  fontWeight: index === historyIndex ? 800 : undefined,
                  border: "none",
                  fontSize: "initial",
                }}
                onClick={() => dispatch(setHistoryIndex(index))}
                data-selected={index === historyIndex}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    background: colorHistoryItem,
                    display: "inline-block",
                    marginRight: 10,
                  }}
                />
                {colorHistoryItem}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
