import style from "./Stats.module.css";

interface Progress {
  value: number;
  limit: number;
}

const progressBar = [
  {
    name: "query",
    body: "Consultas realizadas",
    value: 11,
    limit: 20,
    color: "--bg-color-success",
  },
  {
    name: "disposable",
    body: "Email sospechosos",
    value: 9,
    limit: 11,
    color: "--bg-color-danger",
  },
  {
    name: "valid",
    body: "Email Validos",
    value: 3,
    limit: 11,
    color: "--bg-color-primary",
  },
];

const percent = ({ value, limit }: Progress) => (value * 100) / limit;

export default function Stats() {
  return (
    <div className={style.stats}>
      {progressBar.map((chart) => (
        <div key={chart.name} className={style.data}>
          <p>{`${chart.body}: ${chart.value}/${chart.limit}`}</p>
          <span
            className={style.chart}
            style={{
              width: `${percent(chart)}%`,
              backgroundColor: `var(${chart.color})`,
            }}
          ></span>
        </div>
      ))}
    </div>
  );
}
