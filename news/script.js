let currentPage = '1';
let needMore = true;
let count = '6';

let viewData = function (data) {
    let renderData = '';
    (data.list).forEach((item, i, arr) => {
        renderData += '<div class="col-sm-6 col-lg-4 news-block">' + `<img src="https://mariupolskoe.tv/i/cache/crop/news/634x357/${item.image}" alt="">` + `<a href="https://mariupolskoe.tv/news/view/${item.uri}">${item.title}</a>` + `<div>${item.published_caption}</div>` + '</div>';
    });
    $('.news-row').append(renderData);
};

let getCurrentStatus = function (data) {
    currentPage = +currentPage + 1;
    needMore = data.need_more;
    count = data.count;
};

function showNews(page, arrayFunctions) {
    $.ajax({
        method: "GET",
        url: "https://cors-anywhere.herokuapp.com/mariupolskoe.tv/programs/news/13",
        data: {
            page: page,
        },
        success: arrayFunctions,
        statusCode: {
            200: function () {
                console.log("Ok");
            }
        }
    })
}

function checkLastPage() {
    if (!needMore) $('button').css("background-color", "grey");
}

function showMore(event) {
    if (needMore) {
        showNews(currentPage, [viewData, getCurrentStatus, checkLastPage]);
        console.log(needMore);
    } else {
        return false;
    }
}

showNews(currentPage, [viewData, getCurrentStatus]);