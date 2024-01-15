import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  // the below is written to enable the hover effect in button.
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    height: "51px",
    borderRadius: "10px",
    fontSize: "1.4rem",
    textAlign: "center",
    backgroundColor: isHovered ? "green" : "black",
    color: "white",
    width: "80px",
    marginLeft: "5px",
    transition: "background-color 0.3s",
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  // use callback is use to optimized the code or to store the value in the cache.
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*(){}";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }, [password]);

  // this will run each time when there is a change in the dependencies
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div
      style={{
        backgroundColor: "gray",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          height: "70%",
          backgroundColor: "beige",
          boxShadow: "2px 2px 8px black",
          alignItems: "center",
          borderRadius: "10px",
          marginTop: "100px",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            textShadow: "2px 2px 4px red",
            marginTop: "60px",
          }}
        >
          <h1>Password Generator</h1>
        </div>
        <div style={{ marginTop: "40px" }}>
          <input
            style={{
              height: "50px",
              borderRadius: "10px",
              fontSize: "1.4rem",
              paddingInline: "30px",
              border: "2px solid black",
              overflow: "hidden",
            }}
            type="text"
            placeholder="Password"
            value={password}
            readOnly
            ref={passwordRef}
          />

          <button
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={copyPassword}
          >
            copy
          </button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
            fontSize: "1.2rem",
            fontWeight: "600",
          }}
        >
          <div>
            <input
              style={{ cursor: "pointer" }}
              type="range"
              min={8}
              max={20}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length:{length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="number"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number">Number</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="char"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="char">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
