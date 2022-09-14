import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetInfoByIdQuery } from "../Services/FetchData";
import { DatumNew, IList } from "../Services/Interfaces";

interface ChartPageProps {}

const ChartPage: FC<ChartPageProps> = () => {
  const [display, setDisplay] = useState<number>(7);
  const { id } = useParams();
  const { data, isLoading } = useGetInfoByIdQuery(id || "");
  const navigate = useNavigate();
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const sortedDatesAsc =
    data?.data
      .slice()
      .sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0)) || [];

  const newSortedDatesAsc = sortedDatesAsc.slice(display).map((el) => {
    const d = new Date(el.date);
    const dateFormatted = monthArray[d.getMonth()] + " " + d.getDate();
    return {
      curency: el.curency,
      id: el.id,
      date: dateFormatted,
    };
  });
  const handleWeek = () => setDisplay(-7);
  const handleMonth = () => setDisplay(-30);
  const handleYear = () => setDisplay(-365);

  const min =
    newSortedDatesAsc.length > 1
      ? newSortedDatesAsc.reduce((prev, curr) =>
          Number(prev.curency) < Number(curr.curency) ? prev : curr
        )
      : { id: 0, curency: "12", date: "" };
  const max =
    newSortedDatesAsc.length > 1
      ? newSortedDatesAsc.reduce((prev, curr) =>
          Number(prev.curency) > Number(curr.curency) ? prev : curr
        )
      : { id: 0, curency: "12", date: "" };

  const getSum = (arr: DatumNew[]) => {
    let sum: number = 0;
    if (arr.length > 1) {
      for (let index = 0; index < arr.length; index++) {
        const currency = arr[index].curency;
        if (currency !== "null") {
          sum += parseInt(arr[index].curency);
        }
        console.log(sum);
        console.log(arr[index].curency);
      }
    }
    return sum;
  };

  return (
    <div className="Chart">
      <div className="ChartChart">
        <section className="ChartHeader">
          <h1 onClick={() => navigate("/")} className="ChartTitle">
            Revenue
          </h1>
          <div className="buttons_wrapper">
            <button
              onClick={handleWeek}
              className={display === -7 ? "button active" : "button"}
            >
              Week
            </button>
            <button
              onClick={handleMonth}
              className={display === -30 ? "button active" : "button"}
            >
              Month
            </button>
            <button
              onClick={handleYear}
              className={display === -365 ? "button active" : "button"}
            >
              Year
            </button>
          </div>
        </section>
        <ResponsiveContainer width="100%" height="60%">
          <AreaChart
            data={newSortedDatesAsc.slice(display)}
            margin={{
              top: 30,
              right: 30,
              left: 0,
              bottom: 0,
            }}
            height={200}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              scale="sqrt"
              type="number"
              domain={["dataMin", "dataMax"]}
              dataKey="curency"
            />
            <Area
              type="monotone"
              dataKey="curency"
              stroke="#007AFF54"
              fill="#007AFF54"
            />
          </AreaChart>
        </ResponsiveContainer>
        <span className="subChartTitle">Total</span>
        <h1 className="ChartTitle">$ {getSum(newSortedDatesAsc)}</h1>
        <div className="ChartInfo_wrapper">
          <section>
            <span className="subChartTitle">Min</span>
            <span className="ChartTitle">$ {min && min.curency}</span>
          </section>
          <section>
            <span className="subChartTitle">Medium</span>
            <span className="ChartTitle">
              ${" "}
              {Number(
                (
                  Number(getSum(newSortedDatesAsc)) / newSortedDatesAsc.length -
                  1
                ).toFixed(2)
              )}
            </span>
          </section>
          <section>
            <span className="subChartTitle">Max</span>
            <span className="ChartTitle">$ {max && max.curency}</span>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
