let currentPage = '1';
let needMore = false;
let count = '6';
let onLoad = false;

function getPage() {
    currentPage = window.location.search.substr(1).split("=")[1];
    if (currentPage == undefined || !Number.isInteger(+currentPage)) {
        currentPage = '1';
        setState();
    }
}

let viewData = function (data) {
    let renderData = '';
    (data.list).forEach((item, i, arr) => {
        renderData += '<div class="col-sm-6 col-lg-4 news-block">' + `<img src="https://mariupolskoe.tv/i/cache/crop/news/634x357/${item.image}" alt="">` + `<a href="https://mariupolskoe.tv/news/view/${item.uri}">${item.title}</a>` + `<div>${item.published_caption}</div>` + '</div>';
    });
    $('.news-row').append(renderData);
};

let getCurrentStatus = function (data) {
    needMore = data.need_more;
    count = data.count;
    onLoad = true;
};

function showNews(page, arrayFunctions) {
    onLoad = false;
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
    if (!needMore) {
        $('button').css("background-color", "grey");
        alert("Новостей больше нет");
    }
}

function showMore() {
    if (needMore && onLoad) {
        showNews(currentPage, [viewData, getCurrentStatus, checkLastPage, setState]);
    } else {
        return false;
    }
}

function setState() {
        var state = { 'page_id': `${currentPage}` };
        var title = '';
        var url = `index.html?page=${currentPage}`;
        history.pushState(state, title, url);
        if (needMore) currentPage = +currentPage + 1;
}
getPage();
showNews(currentPage, [viewData, getCurrentStatus, checkLastPage, setState]);
