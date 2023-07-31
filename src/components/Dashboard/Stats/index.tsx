"use client";

import { Profile } from "@/lib/api.types";
import style from "./Stats.module.css";

const progressBars = (requests: number, disposable: number, limit: number) => [
  {
    name: "query",
    body: "Consultas realizadas",
    color: "--bg-color-success",
    value: +requests,
    limit: +limit,
  },
  {
    name: "disposable",
    body: "Email sospechosos",
    color: "--bg-color-danger",
    value: +disposable,
    limit: +requests,
  },
  {
    name: "valid",
    body: "Email Validos",
    color: "--bg-color-primary",
    value: requests - disposable,
    limit: +requests,
  },
];

const percent = (value: number, limit: number) => (value * 100) / limit;

export default function Stats({ profile }: { profile: Profile | null }) {
  const requests = profile?.requests || 0;
  const max_requests = profile?.plans?.max_requests || 20;

  const disposableMOCK = 0;
  const barsChart = progressBars(requests, disposableMOCK, max_requests);
  return (
    <div className={style.stats}>
      {barsChart.map((chart) => (
        <div key={chart.name} className={style.data}>
          <p>{`${chart.body}: ${chart.value}/${chart.limit}`}</p>
          <span
            className={style.chart}
            style={{
              width: `${
                chart.value === 0 ? 0 : percent(chart.value, chart.limit)
              }%`,
              backgroundColor: `var(${chart.color})`,
            }}
          ></span>
        </div>
      ))}
    </div>
  );
}
