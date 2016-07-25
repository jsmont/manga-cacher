var serie = {
    caps:[]
}

$(document).ready(function(){

    var page_links = detectLinks();
    console.log(page_links);

});

function getSerie(){
    var name = location.pathname.match(/((\/[a-z0-9-_]+)+)\/[0-9]+\/[0-9]+/);

    if(name == null){
        name = location.pathname.match(/((\/[a-z0-9-_]+)+)\/[0-9]+/);
    }

    return name[2];
}

function getParser(){

    var name = getSerie();

    return function(url){
        var data = url.match(new RegExp(name + "\/([0-9]+)\/([0-9]+)"));
        if(data == null){
            data = url.match(new RegExp(name + "\/([0-9]+)"));
            return {
                serie: name,
                chapter: data[1],
                page: 1
            };
        }
        return {
            serie: name,
            chapter: data[1],
            page: data[2]
        };
    };

}


function getRegexp(){

    return  new RegExp(getSerie() + "\/[0-9]+(\/[0-9]+)?");
        
}

function getActual(){
    return getParser()(location.pathname);
}

function detectLinks(){

    var regexp = getRegexp();
    var parser = getParser();

    var links = $("a").filter(function(i,link){

        return $(link).attr("href").match(regexp) != null

    }).map(function(i,link){

        return {
            id: null,
            elem: link,
            url: $(link).attr("href"),
            cached: false,
            metadata: parser($(link).attr("href"))
        };

    });

    return links;

}
