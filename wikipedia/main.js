// Nombre de resultats
const SEARCH_LIMIT = 5

//Api url
const SEARCH_API = "https://fr.wikipedia.org/w/api.php?action=opensearch&namespace=0&origin=*&format=json"

$(function () {
    let searchResults = $('#search_results')

    $('#search_text').on('change', function (event) {
        searchResults.empty()
        searchResults.append($('<p/>').text('Chargement...'))
        $.getJSON(
            SEARCH_API + "&limit=" + SEARCH_LIMIT + "&search=" + event.target.value,
            function (data) {
                let titles = data[1]
                let contents = data[2]
                let urls = data[3]

                searchResults.empty()
                if (titles.length > 0) {
                    for (const index in titles) {
                        searchResults.append($('<div/>').append(
                            $('<a/>').attr("href", urls[index]).append(
                                $('<h3/>').text(titles[index])
                            ),
                            $('<p/>').text(contents[index])
                        ))
                    }
                } else {
                    searchResults.append($('<p/>').text('Aucuns resultats =('))
                }
            }
        )
    })
})