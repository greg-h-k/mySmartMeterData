import { N3rgyConsumptionResponse } from '../types/N3rgyTypes';

/*
The n3rgy api returns half hourly results. The recorded timestamp values
correspond to usage in the previous half hour. 
so timestamp for 22:00 refers to usage in 21:30-22:00 window
So to get usage for entire day, need to shift values back 30 mins
*/
const DAY_START = '0030'; // adjusted to allow for API record windows 
const DAY_END = '0000' // because this corresponds to 23:30-00:00

const API_BASE_URL = 'https://consumer-api.data.n3rgy.com';


function buildQueryDateParameterString(startDate: string, endDate: string): string {
    return (
      '?start=' + startDate + DAY_START + '&end=' + endDate + DAY_END
    )
  }

export const getConsumptionData = async (authToken: string, type: string, startDate: string, endDate: string): Promise<N3rgyConsumptionResponse | null> => {
    // type should be 'electricity' or 'gas'
    var data = null;
    try {
        const response = await fetch(API_BASE_URL + '/' + type + '/consumption/1/' + buildQueryDateParameterString(startDate, endDate), {
            method: 'GET',
            headers: new Headers({
                'Authorization': authToken
            })
        }).then(response => {
            if (!response.ok) {
                console.log("Bad response from API");
                console.log(response)
            } else {
                data = response.json();
            }
        })
    } catch (error) {
        console.error(error);
        return null;
    }
    return data;
};