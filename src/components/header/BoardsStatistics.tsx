type Props = {
  solved: number;
};

export const BoardsStatistics = ({ solved }: Props) => {
  return <span>Доски: {solved} / 32</span>;
};
