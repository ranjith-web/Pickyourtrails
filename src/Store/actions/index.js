import axios from 'axios';

const fetchTrailAPIUrl = '/data.json';

export const fetchTravels = (travels) => {
    return {
      type: 'FETCH_TRAVELS',
      payload: travels
    }
};

export const fetchTrails = () => {
    return (dispatch) => {
        return axios.get(fetchTrailAPIUrl)
        .then(response => {
            if(response.data){
                dispatch(fetchTravels(response.data))
            }
        })
        .catch(error => {
          throw(error);
        });
    };
}
