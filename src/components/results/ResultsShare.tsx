import { useMemo, useState } from "react";
import "~/styles/results.css";

const digits = [
  "0\uFE0F\u20E3",
  "1\uFE0F\u20E3",
  "2\uFE0F\u20E3",
  "3\uFE0F\u20E3",
  "4\uFE0F\u20E3",
  "5\uFE0F\u20E3",
  "6\uFE0F\u20E3",
  "7\uFE0F\u20E3",
  "8\uFE0F\u20E3",
  "9\uFE0F\u20E3",
];

function numberText(n: number) {
  if (n > 0 && n <= 37) {
    return digits[(n / 10) >> 0] + digits[n % 10];
  } else {
    return "\uD83D\uDFE5\uD83D\uDFE5";
  }
}

const copyResult = "Скопировать результат";

export function ResultsShare({
  title,
  guesses,
  moves,
}: {
  title: string;
  guesses: Array<number>;
  moves: string;
}) {
  const [buttonText, setButtonText] = useState(copyResult);

  const text = useMemo(() => {
    let value = title + "\n" + "Ходы: " + moves + "/37\n";

    for (let i = 0; i < guesses.length; i++) {
      value += numberText(guesses[i]);
      if ((i + 1) % 4 == 0) value += "\n";
      else value += " ";
    }

    value += "\n http://32.limansky.me";
    return value;
  }, [title, moves, guesses]);

  async function handleClick() {
    await navigator.clipboard.writeText(text);

    setButtonText("Скопировано!");
    setTimeout(() => setButtonText(copyResult), 5000);
  }

  return (
    <div className="results-share">
      <pre className="share-text">{text}</pre>
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
}
