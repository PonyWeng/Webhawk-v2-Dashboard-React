import React, { useEffect, useState } from "react";

import Analytics from "./Analytics";
import Logs from "./Logs";
import config from "../config";
import axios from "axios";

const Dash = (props) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      axios.get(config.api).then((res) => {
        setData(res.data);
      });
    } catch (error) {}
  };

  useEffect(() => {
    getData();
    setInterval(() => {
      getData();
    }, 5000);
  }, []);
  return (
    <>
      <div>
        {props.analytics ? (
          data.length ? (
            <Analytics data={data} />
          ) : null
        ) : null}
      </div>
      <div>{props.logs ? data.length ? <Logs data={data} /> : null : null}</div>
    </>
  );
};

export default Dash;
