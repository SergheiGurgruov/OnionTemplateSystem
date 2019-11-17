function init() {
    toggleBlock('.start_hidden');
}

function toggleBlock(blockId) {
    let myBlock = $(blockId);
    if (myBlock.css("visibility")=="hidden") {
        myBlock.css("visibility", "inherit");
        myBlock.css("height", "auto");
    }else{
        myBlock.css("visibility", "hidden");
        myBlock.css("height", "0px","!important");
    }
}