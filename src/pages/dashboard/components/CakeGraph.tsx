import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { DataProps, EventsList } from "../interfaces/interfaces";
import { j } from "node_modules/vite/dist/node/types.d-FdqQ54oU";

interface PieData {
  Homes: number | undefined;
  Dones: number | undefined;
  NoBinaries: number | undefined;
  NoResponde: number | undefined;
}

const CakeChart = ({ data, totals, initialTotals, title }: DataProps) => {
  const chartRef = useRef(null);
  const [sourceData, setSourceData] = useState(initialTotals);
  const [prevData, setPrevData] = useState(data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data !== prevData) {
      setSourceData(data as EventsList);
      setPrevData(data);
    } else if (totals) {
      setSourceData(totals);
    }
  }, [data, totals]);

  useEffect(() => {
    if (sourceData && chartRef.current) {
      const pieData: PieData = {
        Homes: sourceData.maleAttendees,
        Dones: sourceData.femaleAttendees,
        NoBinaries: sourceData.nonBinaryAttendees,
        NoResponde: sourceData.undisclosedAttendees,
      };

      const myChart = echarts.init(chartRef.current);

      const option = {
        title: {
          text: title,
          left: "center",
          top: 20,
          textStyle: {
            color: "#000",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          left: "center",
          justifyContent: "around",
          bottom: "10px",
          itemGap: 6,
        },
        series: [
          {
            name: "Gènere",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 24,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: pieData.Homes,
                name: "Homes",
                itemStyle: { color: "#FF9F40" },
              },
              {
                value: pieData.Dones,
                name: "Dones",
                itemStyle: { color: "#FFCD56" },
              },
              {
                value: pieData.NoBinaries,
                name: "No binaris",
                itemStyle: { color: "#5470C6" },
              },
              {
                value: pieData.NoResponde,
                name: "No respon",
                itemStyle: { color: "#91CC75" },
              },
            ],
          },
        ],
      };

      myChart.setOption(option);
      return () => {
        myChart.dispose();
      };
    }
    setLoading(false);
  }, [sourceData]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      ref={chartRef}
      className="h-[334px] shadow-lg w-[250px] max-w-sm  rounded-md border border-slate-300"
    />
  );
};

export default CakeChart;
