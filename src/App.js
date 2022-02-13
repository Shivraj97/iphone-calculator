import { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button/index";
import Status from "./assets/menu.png";

const buttons = [
  {
    content: "AC",
    type: "function",
  },
  {
    content: "±",
    type: "function",
  },
  {
    content: "%",
    type: "function",
  },
  {
    content: "÷",
    type: "operator",
  },
  {
    content: "7",
    type: "",
  },
  {
    content: "8",
    type: "",
  },
  {
    content: "9",
    type: "",
  },
  {
    content: "×",
    type: "operator",
  },
  {
    content: "4",
    type: "",
  },
  {
    content: "5",
    type: "",
  },
  {
    content: "6",
    type: "",
  },
  {
    content: "−",
    type: "operator",
  },
  {
    content: "1",
    type: "",
  },
  {
    content: "2",
    type: "",
  },
  {
    content: "3",
    type: "",
  },
  {
    content: "+",
    type: "operator",
  },
  {
    content: "0",
    type: "",
  },
  {
    content: ".",
    type: "",
  },
  {
    content: "=",
    type: "operator",
  },
];

function App() {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const [operations, setOperations] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  const handleButtonClick = (value) => () => {
    //allow only one decimal
    if (value === "." && current.toString().includes(".")) return;
    setCurrent(current + value);
    //AC - delete all
    if (value === "AC") {
      setCurrent("");
      setPrevious("");
      setOperations("");
    }
    //Special inline operations
    if (value === "±") {
      setCurrent(current * -1);
    }
    if (value === "%") {
      setCurrent(current / 100);
    }
    // Opearations
    if (value === "+" || value === "−" || value === "×" || value === "÷") {
      if (current === "") return;
      if (previous !== "") {
        let res = compute();
        setPrevious(res);
      } else {
        setPrevious(current);
      }
      setCurrent("");
      setOperations(value);
    }

    //Equals
    if (value === "=") {
      let res = compute();
      if (res === undefined || res == null) return;
      setCurrent(res);
      setPrevious("");
      setOperations("");
    }
  };

  const compute = () => {
    let result;
    let previousNo = parseFloat(previous);
    let currentNo = parseFloat(current);
    if (isNaN(previousNo) || isNaN(currentNo)) return;
    switch (operations) {
      case "+":
        result = previousNo + currentNo;
        break;
      case "−":
        result = previousNo - currentNo;
        break;
      case "×":
        result = previousNo * currentNo;
        break;
      case "÷":
        result = previousNo / currentNo;
        break;
      default:
        break;
    }
    return result;
  };
  return (
    <div className="App">
      <div className="status-bar">
        <div className="top">{time}</div>
        <img src={Status} alt="status-bar" height={"20px"} />
      </div>
      <div className="previous">
        {previous} {operations}
      </div>
      <div className="display">{current}</div>
      <div className="buttons">
        {buttons.map(({ content, type }, index) => (
          <Button
            key={index}
            content={content}
            type={type}
            onButtonClick={handleButtonClick}
          />
        ))}
      </div>
      <div className="bottom">-</div>
    </div>
  );
}

export default App;
