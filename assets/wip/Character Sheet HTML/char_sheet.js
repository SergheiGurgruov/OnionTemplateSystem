function init() {
    toggleBlock('#stats');
    toggleBlock('#abilita');
}

function toggleBlock(blockId) {
    let myBlock = $(blockId);
    if (myBlock.css("visibility")=="hidden") {
        myBlock.css("visibility", "visible");
        myBlock.css("height", "auto");
    }else{
        myBlock.css("visibility", "hidden");
        myBlock.css("height", "0px");
    }
}