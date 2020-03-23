const input = document.querySelector("input[name='price']")
input.addEventListener("keydown", function(e) {
    let { value } = e.target

    value = value.replace(/\D/g, "")

    e.target.value = value

    setTimeout(function() {
        e.target.value = value
    }, 1)
})