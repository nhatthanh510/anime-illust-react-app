export function formatRankingDataImageURL(workArray) {
    for (let i = 0; i < workArray.length; i++) {
        let workObject = workArray[i];
        let urlParams = workObject.image_urls.square_medium.split('/img-master/');
        workObject.image_urls.px_480mw = "http://i1.pixiv.net/c/480x960/img-master/" + urlParams[1];
        workObject.image_urls.px_128mw = "http://i1.pixiv.net/c/240x480/img-master/" + urlParams[1];
    }
}

export function formatRankingDetailImageURL(workObject) {
    let urlParams = workObject.image_urls.medium.split('/img-master/');
    workObject.image_urls.px_480mw = "http://i1.pixiv.net/c/480x960/img-master/" + urlParams[1];
}

