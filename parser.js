const serviceUrl = 'https://www.copart.com/public/lots/search';

const fetchData = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json;charset=UTF-8"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const jsonData = {
    "LotNumber": "ln",
    "VIN": "fv",
    "Title Code": ["ts", "td"],
    "Odometer": "orr",
    "Primary Damage": "dd",
    "Secondary Damage": "sdd",
    "Pre-Accident Value": "rc",
    "Body Style": "bstl",
    "Clean Wholesale Value": "lotPlugAcv",
    "Cylinders": "cy",
    "Color": "clr",
    "Engine Type": "egn",
    "Transmission": "tmtp",
    "Drive": "drv",
    "fuel": "ft",
    "keys": "hk",
    "Highlights": "lcd",
    "Bid Status": "dynamicLotDetails.bidStatus",
    "Sale Status": "dynamicLotDetails.saleStatus",
    "Current Bid": "dynamicLotDetails.currentBid",
    "sale name": "syn",
    "sale location": "yn"
};

function createJSON(data) {
    const JSON = [];

    if (data.data.results.content) {
        const results = data.data.results.content;

        for (const result of results) {
            const item = {};

            for (const destKey in jsonData) {
                const sourceKey = jsonData[destKey];
                const value = getValueFromPath(result, sourceKey);

                if (value !== undefined) {
                    if (Array.isArray(sourceKey)) {
                        item[destKey] = sourceKey.map(key => getValueFromPath(result, key)).join(' - ');
                    } else {
                        item[destKey] = value;
                    }
                }
            }

            JSON.push(item);
        }
    }

    return JSON;
}

function getValueFromPath(obj, path) {
    if (Array.isArray(path)) {
        return path.map(key => obj[key]).join(' - ');
    }

    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
        if (value && value.hasOwnProperty(key)) {
            value = value[key];
        } else {
            return undefined;
        }
    }
    return value;
}

function displayJSON(json) {
    console.log(JSON.stringify(json, null, 2));
}

// const fetchImagesForLot = async (lotNumber) => {
//     const imagesUrl = `https://www.copart.com/public/data/lotdetails/solr/lotImages/${lotNumber}/USA`;
//     const imagesResponse = await fetch(imagesUrl);

//     if (imagesResponse.ok) {
//         const imagesData = await imagesResponse.json();
//         if (imagesData.data.imagesList.FULL_IMAGE) {
//             return imagesData.data.imagesList.FULL_IMAGE.map(image => image.url);
//         } else {
//             console.error('No images found for lot:', lotNumber);
//         }
//     } else {
//         console.error('Error fetching images for lot:', lotNumber);
//     }
//     return null;
// };

const processDataAndDisplay = async () => {
    const allData = [];
    let totalPages = 1;

    const pageSize = 100;
    const draw = 1;
    const start = 0;

    while (true) {
        const data = await fetchData(`${serviceUrl}?page=${totalPages}&size=${pageSize}&draw=${draw}&start=${start}`);

        if (!data.data.results.content) {
            break;
        }

        const totalElements = data.data.results.totalElements;

        if (totalElements <= (totalPages + 1) * pageSize) {
            break;
        }

        // const JSON = createJSON(data);
        // allData.push(...JSON);

        // for (const lot of JSON) {
        //     const imageUrls = await fetchImagesForLot(lot.LotNumber);
        //     lot.images = imageUrls || [];
        // }

        // displayJSON(JSON);
        console.log(start, new Date())
        // totalPages++;
    }

    // displayJSON(allData);
};

processDataAndDisplay();