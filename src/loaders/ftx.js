import FTXRest from 'ftx-api-rest';
import config from '../config';

const FtxInstance = new FTXRest(config.ftx);

export default FtxInstance;