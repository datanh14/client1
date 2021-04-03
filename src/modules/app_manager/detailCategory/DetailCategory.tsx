import React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps, useLocation, useRouteMatch } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../rootReducer";

interface Props {}

const DetailCategory: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const math = useRouteMatch();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  console.log(math.params);
  return <div style={{ marginTop: 200 }}>áđâđasadSđá</div>;
};

export default DetailCategory;
