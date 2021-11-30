import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

function FibonacciCounter({ initialN }) {
  const [fibs, setFibs] = useState(getInitialFibs);
  const [n, setN] = useState(initialN);
  const currentFibonacciNumber = fibs.current;
  useEffect(() => {
    document.title = `I've calculated ${currentFibonacciNumber}`;
    console.count("The effect has been called");
  }, [currentFibonacciNumber]);
  function getInitialFibs() {
    const prev = fib(initialN - 1);
    const current = fib(initialN);
    return {
      prev,
      current,
      next: prev + current
    };
  }
  function incrementN() {
    setN(prevN => {
      const newN = prevN + 1;
      setFibs(prevFibs => ({
        prev: prevFibs.current,
        current: prevFibs.next,
        next: prevFibs.current + prevFibs.next
      }));
      return newN;
    });
  }
  function decrementN() {
    setN(prevN => {
      const newN = prevN - 1;
      setFibs(prevFibs => ({
        prev: prevFibs.current - prevFibs.prev,
        current: prevFibs.prev,
        next: prevFibs.current
      }));
      return newN;
    });
  }
  return (
    <div>
      <h1>
        fib({n}) == {currentFibonacciNumber}
      </h1>
      <button onClick={incrementN}>
        <h2>+1</h2>
      </button>
      <button onClick={decrementN}>
        <h2>-1</h2>
      </button>
      <button
        onClick={() => {
          setN(initialN);
          setFibs(getInitialFibs);
        }}
      >
        <h2>Reset</h2>
      </button>
    </div>
  );
}

function TimeOnPage() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setSecondsElapsed(prev => prev + 1),
      1000
    );
    console.count("Interval initialized");
    return () => {
      console.count("Interval cleared");
      clearInterval(intervalId);
    };
  }, []);
  return <h3>You've been watching this page for {secondsElapsed} seconds.</h3>;
}
function App() {
  const [spyOnUser, setSpyOnUser] = useState(false);
  return (
    <div className="App">
      <FibonacciCounter initialN={6} />
      <button onClick={() => setSpyOnUser(prev => !prev)}>
        Toggle spying on user
      </button>
      {spyOnUser && <TimeOnPage />}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

