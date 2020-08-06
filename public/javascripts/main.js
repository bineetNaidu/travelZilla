// actions
$(".search-box").on("click", "div.five button.btn-search", (event) => {
    event.preventDefault();
    let $input = $("div.five input");
    $input.focus();
});
