import { Animation } from "@devexpress/dx-react-chart";
import {
  ArgumentAxis,
  Chart,
  LineSeries,
  PieSeries,
  Title,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { useIntl } from "react-intl";
import { Row } from "../common/Elements";

const ApexChart = (props: any) => {
  const intl = useIntl();
  const data = [
    { argument: 1, value: 10 },
    { argument: 2, value: 20 },
    { argument: 3, value: 30 },
  ];
  const data1 = [
    { region: "Asia", val: 4119626293 },
    { region: "Africa", val: 1012956064 },
    { region: "Northern America", val: 344124520 },
    { region: "Latin America and the Caribbean", val: 590946440 },
    { region: "Europe", val: 727082222 },
    { region: "Oceania", val: 35104756 },
  ];

  return (
    <>
      <Row className="header-management">
        <Typography variant="subtitle1" component="p">
          {intl.formatMessage({ id: "IDS_DASHBOARD" })}
        </Typography>
      </Row>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <Paper style={{ flex: 1 }} elevation={5}>
          <Chart data={data}>
            <ArgumentAxis />
            <ValueAxis />
            <Title text="Thống kê doanh thu" />
            <Animation />
            <LineSeries
              valueField="value"
              argumentField="argument"
            ></LineSeries>
          </Chart>
        </Paper>
        <div style={{ flex: 1, paddingLeft: "5%" }}>
          <Paper style={{ maxWidth: 500 }} elevation={5}>
            <Chart data={data1}>
              <PieSeries
                valueField="val"
                argumentField="region"
                innerRadius={0.6}
              />
              <Title text="Thông kê bán hàng" />
              <Animation />
            </Chart>
          </Paper>
        </div>
      </div>
    </>
  );
};
export default ApexChart;
