import { Board } from "./Board";
import "~/styles/boards.css";

export function Boards({input, words}: {
      input: string,
      words: string[]
  }) {

  const boards = words.map(w => Board(w, input))

  return <div className='boards'>
      {...boards}
    </div>;
}
