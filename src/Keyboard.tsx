const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
]

const Keyboard: React.FC = () => {
  return (
    <div>
      {keyboard.map((keys, index) => (
        <div key={index}>
          {keys.map((key) => (
            <span
              key={key}
              style={{
                display: "inline-block",
                border: "1px solid black",
                margin: "0.25em",
                padding: "0.25em",
              }}
            >
              {key}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard

// ',.pyfgcrl
// aoeuidhtns-
// ;qjkxbmwvz
