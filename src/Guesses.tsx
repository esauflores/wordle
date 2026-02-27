const NUM_GUESSES = 6

const Guesses: React.FC = () => {
  return (
    <div>
      {Array.from<string>({ length: NUM_GUESSES })
        .fill("     ")
        .map((word, index) => (
          <div key={index}>
            {word.split("").map((letter, index) => (
              <span key={index} style={{ margin: "0 0.25em" }}>
                {letter === " " ? "_" : letter}
              </span>
            ))}
          </div>
        ))}
    </div>
  )
}

export default Guesses
