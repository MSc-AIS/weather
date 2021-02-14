import axios from 'axios';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 1/2/2021.
 */

const instance = axios.create({
    baseURL: 'https://weather.msc-ais.site/'
});

export default instance;