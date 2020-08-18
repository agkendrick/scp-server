require('dotenv').config();
const { getForecast } = require('./input');

const app = async () => {
        const [mean, median, mode] = await getAverages();

        console.log(`Mean: ${ mean }, Median: ${ median }, Mode: ${ mode }`);
};

const getAverages = async (searchInput = '30.2240897:-92.01984270000003', searchType = 'coordinates') => {
    try {
        const { data: { list } } = await getForecast(searchInput, searchType);

        const foreCast = list.filter(({ dt_txt }) => checkDateRange(dt_txt)).map(({main: { temp }}) => temp);

        return [findMean(foreCast), findMedian(foreCast), findMode(foreCast)];
    }
    catch (e) 
    {
        console.log(`Error retrieving forecast: ${e.message}`);
        throw e;
    }
}

const checkDateRange = (date_string) => {
    let date = new Date(date_string);
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    let dayFour = new Date();
    dayFour.setDate(dayFour.getDate() + 4);
    dayFour.setHours(0, 0, 0, 0);

    return date.getTime() >= tomorrow.getTime() && date.getTime() < dayFour; 
}

const findMean = (nums) => nums.reduce((avg, num) => avg + num) / nums.length;

const findMedian = (nums) => {
    const sorted = nums.sort();
    const mid = Math.ceil(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid] + sorted[mid - 1]) / 2 : sorted[mid - 1];
};

const findMode = (nums) => {
    const [,,modes] = nums.reduce(([countMap, maxFreq, modes], num) => {

        let count = countMap[num] = countMap[num] ? countMap[num] + 1 : 1;

        if(count > maxFreq)
        {
            modes = [num];
            maxFreq = count;
        }
        else if(count === maxFreq) 
            modes.push(num);

        return [countMap, maxFreq, modes];
    }, [{}, 0, []]);

    return modes;
};

app();

module.exports = {
    findMean, findMedian, findMode, getAverages
};

