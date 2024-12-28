import formatTodayDate, { getTodayIsoDate } from './formatDate';
import zapiers from './zapiers';

const makeZapierRequest = (payload, webhook = null) => {


    payload.date = formatTodayDate();
    payload.isoDate = getTodayIsoDate();

    Object.keys(sessionStorage)?.forEach((key, index) => {
        if (key.indexOf('utm_') > -1 || key.indexOf('hsa_') > -1) {
            payload[key] = sessionStorage[key];
        }
    });
    window?.dataLayer?.push({ ...payload });

    if (null == webhook) {
        Object.keys(zapiers).forEach(k => {
            if (zapiers[k].type == payload.type) {
                webhook = zapiers[k].webhook;
            }
        });
    }

    const requestOptions = {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(payload),
    };
    if (!!webhook) {
        try {
            fetch(webhook, requestOptions);
        } catch (error) {
            console.log(error)
        }
    } else {
        // console.log('webhook is empty');
    }

    // send request to hubspot api integration server
    if (!!process.env.GATSBY_HUBSPOT_INTEGRATION_API_ENDPOINT) {
        try {
            fetch(process.env.GATSBY_HUBSPOT_INTEGRATION_API_ENDPOINT, requestOptions);
        } catch (error) {
            console.log(error)
        }
    }

}

export default makeZapierRequest;