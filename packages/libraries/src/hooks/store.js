import { useState, useEffect } from "react";
import { useQuery } from "react-query";
// import mergeConfig from "../../config/mergeConfig";
import { StoreService } from "../services/Store/service";

export const useStore = (defaultConfig, { deltaConfig, stateCode, cityCode, moduleCode, language }) => {
  const [defaultStore, setDefaultStore] = useState({});
  useEffect(() => {
    const config = window.Digit.Config.mergeConfig(defaultConfig, deltaConfig);
    StoreService.defaultData(stateCode, cityCode, moduleCode, language)
      .then((defaultData) => {
        const store = { config, ...defaultData };
        setDefaultStore(store);
      })
      .catch((err) => console.log("err:", err));
  }, [defaultConfig, stateCode, cityCode, moduleCode]);

  return defaultStore;
};

export const useInitStore = (stateCode) => {
  const { isLoading, error, isError, data } = useQuery(["initStore", stateCode], () => StoreService.digitInitData(stateCode));
  return { isLoading, error, isError, data };
};