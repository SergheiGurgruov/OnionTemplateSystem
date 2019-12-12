function init(){
    $(".form").append(`
    <input name="referrer_url" value="${document.referrer}" type="hidden">
    `)
}