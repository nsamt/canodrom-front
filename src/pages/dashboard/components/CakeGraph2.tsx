import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { DataProps, EventsList } from "../interfaces/interfaces";

const CakeChart2 = ({ types, title }: DataProps) => {
  console.log("types", types);

  const chartRef = useRef(null);
  const [sourceData, setSourceData] = useState(types);
  const [prevData, setPrevData] = useState(types);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (types !== prevData) {
      setSourceData(types as EventsList);
      setPrevData(types);
    } else if (types) {
      setSourceData(types);
    }
  }, [types]);

  useEffect(() => {
    if (sourceData && chartRef.current) {
      const pieDataArray: { name: string; value: number }[] = Object.entries(
        sourceData
      ).map(([key, value]) => ({
        name: key,
        value: value,
      }));

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
          bottom: "16px",
          position: "center",
          show:false
        },
        series: [
          {
            name: title,
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
            data: pieDataArray.map((data) => ({
              value: data.value,
              name: data.name,
            })),
          },
        ],
      };

      myChart.setOption(option);
      return () => {
        myChart.dispose();
      };
    }
    console.log(sourceData);
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

export default CakeChart2;
