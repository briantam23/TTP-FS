import { LOAD_INITIAL_STOCKS } from '../constants';


const stocksReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_STOCKS:
            return action.stocks;
        default:
            return state;
    }
}


export default stocksReducer;