const fetch = require("node-fetch")

const serviceUrl = 'https://www.copart.com/public/lots/search';

const fetchData = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json;charset=UTF-8",
                "Accept-Language": "en-US,en;q=0.9",
                "Cookie": "visid_incap_242093=I5986GNpTA2UQHvDp0d4duay9WQAAAAAQUIPAAAAAAC5qmVzniu7896eCkZfhbnG; _gcl_au=1.1.29767299.1693823726; _fbp=fb.1.1693823725934.1684485796; _tt_enable_cookie=1; _ttp=aDL9cgyJwhmBzmNNvLzBPoiBGI2; OAID=7f7403ce67b97b70c8fcbed45a26f55a; _cc_id=b5cd0ff211c30e8bc5df5807e0c2bc9a; urc=prsja91k; dkw9qlkz=pF9wlxTnsPOnFgqo3bmw; g2app.username=; g2usersessionid=023c5fb0412f4eeeabb81f3a16fe981a; userLang=en; timezone=Asia%2FTbilisi; g2app.hide-sale-light-tour=true; classicSearchResultsView=true; C2BID=231102; incap_ses_764_242093=roNYYWlSAUVLMzCBakaaCmKWOmUAAAAAtLz2+11BbrML2ZIDJhstsw==; incap_ses_1364_242093=iO2cDj05mXocPOklquftEke9OmUAAAAAtqg+Q7gOUEzTIsGVBUn7lg==; nlbi_242093=aUzPezeevgMqWvKTJDHybgAAAABAoJDN7RKcm9J7nT1J9+RG; incap_ses_1211_242093=bmE+cnnM0yjWfH40L1fOEMOTPmUAAAAAB5R/MwtMzlRmgS5aSYCIOA==; incap_ses_408_242093=wC1GBXME3CQMdjh/zYKpBbbbPmUAAAAATRcOssyc90fOPO8KaHivVg==; incap_ses_8219_242093=GvlYX69h+xEHT04nVsIPcqX6PmUAAAAARRckyShYMTpS4C1Wg5Sk3w==; _clck=tpofy3|2|fga|0|1342; _gid=GA1.2.1729683377.1698653236; usersessionid=a464acc53ef4b4804afa8864eaa2ad5e; panoramaId_expiry=1698739637849; panoramaId=15c56f1003c3976befe5ffc93a3ea9fb927ad9c9b053c7be3d0509741e584b73; panoramaIdType=panoDevice; G2JSESSIONID=AD61D7FE01A482988826CB48F7869367-n1; userCategory=LIM; g2app.logged-in-member-name=DIMITRI%20BASILAIA; incap_ses_763_242093=BLK2L5ntFGPQGJiYhbmWCrnIP2UAAAAAg0l9vlot6KY0L8nSZNzH4w==; __gads=ID=cbc88bc34c9100d4:T=1693823727:RT=1698678974:S=ALNI_MacWUeWL7TYWqoK5qqpClSHjfsNOw; __gpi=UID=00000c6ef1e7c518:T=1693823727:RT=1698678974:S=ALNI_MbUiy7dFfIw4U-UZ1SDrD2yw1lx_A; copartTimezonePref=%7B%22displayStr%22%3A%22GMT%2B4%22%2C%22offset%22%3A4%2C%22dst%22%3Afalse%2C%22windowsTz%22%3A%22Asia%2FTbilisi%22%7D; granify.uuid=4f2266a9-72c9-49ec-9029-b935b3b8e62a; _uetsid=55aaa8e076fb11eeb15aa9dcf87d41cc; _uetvid=c2753fb04b0e11eea6bbb37181992fc5; _clsk=pdjf50|1698679002965|17|0|b.clarity.ms/collect; _ga_VMJJLGQLHF=GS1.1.1698678034.20.1.1698679003.0.0.0; granify.new_user.JUFHS=false; _ga=GA1.2.768120446.1693823726; FCNEC=%5B%5B%22AKsRol9OEpMrzoPQqa9EpBE6F2rwD2LhP5KXjDhUVXahFfMRzbsTQ_tsEtIc5Y4pvOZmaIeYaGpo79wKjdhpYNnL-IatMP-2yzOxe3sA1tzrEtgJ6aFrOIRKlX3OLU4uHWqR_Z74wSpw_4H_k0f91TydBYCQtnKsmQ%3D%3D%22%5D%2Cnull%2C%5B%5D%5D; nlbi_242093_2147483392=UQKxa9rZYliTqD4DJDHybgAAAABWjMD5NHclHI+OVZdf1nli; reese84=3:CRHxQfft0hAyjIKt3+2F4A==:d/UTjvH7Aw0ZpUEKBgEp2LkgiW9/Iu9+pKaCT6hZB6C869JQcXJhQz/flYC41bvHIz+bFsV1z1hjnNSNdII1m1YMwmsKQfbnBJIhoQ4U5IqVr+hB3KANIqLvlGntsrscdlNbS9/qtXlcEgQ+y1sPisAgOI7tZTvcrcqdDBcb5CcJVA39Cq9Xl4RsImrPKvRyFMR3SLejpwT0n/nEAvaoxKDXbVVQGcOyP8JduqM211jswnx3Tfu6HZcB6UOYrO8tU2owemZVOuH5qGk9VJ8UJSysN9bgtvUKcx10soXevwfVbuX8YVGi+diUTD2fwUHAYjNUsji8rZEtRpuUElendJPtPbRibcLeOPddxLZ33Mxsg94igh4RKn9nIXBeGcCQgkrn++bWBalUwEvtUXdgXOX/DGaQ70edljwsYnD3CJaFaxXSo/CRii7qh8rUoumkp+tfJXRmy0terXVnNrFP2w==:6R3lsNdS9eeWYyirTmJ7ka2LQUAnwCw5UU2GKA/EXWs=; granify.session.JUFHS=-1; g2app.searchResultsPageLength=50; g2app.search-table-rows=50"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const pagesLis = []
const processDataAndDisplay = async () => {
    const allData = [];
    let totalPages = 1;

    const pageSize = 100;
    const draw = 1;
    const start = 0;

    while (totalPages < 40) {
        const totalPg = totalPages
        fetchData(`${serviceUrl}?page=${totalPg}&size=${pageSize}&draw=${draw}&start=${start}`)
        s
        .then((data) => {
            if (!data.data.results.content) {
                return console.log("chavarda", totalPg)
            }
    
            const totalElements = data.data.results.totalElements;
    
            if (totalElements <= (totalPg + 1) * pageSize) {
                return console.log("chavarda", totalPg)
            }
    
            // const JSON = createJSON(data);
            // allData.push(...JSON);
    
            // for (const lot of JSON) {
            //     const imageUrls = await fetchImagesForLot(lot.LotNumber);
            //     lot.images = imageUrls || [];
            // }
    
            // displayJSON(JSON);
            pagesLis.push()
            console.log(totalPg, new Date() )
        });

        totalPages++;
    }

    // displayJSON(allData);
};


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

console.log("start", new Date() )
processDataAndDisplay()