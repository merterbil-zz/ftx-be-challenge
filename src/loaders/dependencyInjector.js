import { Container } from "typedi";
import FtxInstance from "./ftx";
import LoggerInstance from "./logger";

export default () => {
  try {
    Container.set('ftx', FtxInstance);
    Container.set('logger', LoggerInstance);
  } catch (e) {
    LoggerInstance.error("Error on dependency injector loader: %o", e);
    throw e;
  }
};
