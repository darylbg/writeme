$(document).ready(function() {
    
    var username;
    var fullName
    function usernameSearch() {
        $('#username-search-btn').on('click', function() {
            username = $('#username-search').val();
            console.log(username);

            // github api to call username
            fetch("https://api.github.com/users/" + username + "/repos")
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        for(let i = 0; i < data.length; i++) {
                            fullName = data[i].full_name;
                            var url = data[i].html_url;
                            $('#repo-list').append('<li data-repo="' + url + '">' + fullName + '</li>');
                        }
                        repoListSelect();
                    });
                } else {
                    console.log('error');
                }
            })
            .catch(function() {
                console.log('Unable to connect to finnhub');
            });
                });
    } usernameSearch();

    // Filter the dropdown items based on the search input
    function searchFunction() {
        $('#search-box').on('keyup', function() {
            var value = $(this).val().toLowerCase();
            $('#repo-list li').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    } searchFunction();

    var repoUrl;
    function repoListSelect() {
        $('#repo-list li').on('click', function() {
            repoUrl = $(this).data('repo');
            $('#search-box').val(repoUrl);
            console.log(repoUrl);
        });
    } 

    var apiKey = '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';
    var apiUrl = 'https://api.openai.com/v1/completions';

    $('#readme-generate-btn').on('click', function() {
        var prompt = "Please generate a README file in markdown format for my project hosted on GitHub" + repoUrl + "The README file should include the following sections:" + 
                        "1. Description - A brief introduction to the project." + 
                        "2. Deployment - A section describing how to deploy the project and including links to the source code and live deployment if available." +
                        "3. Usage - A section describing the purpose of the project and how it can be useful to users." +
                        "4. Technologies Used - A section listing the programming languages and libraries used in the project." +
                        "5. License - A section detailing the project's license." +
                        "Thank you!";
        var data = {
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.4,
            max_tokens: 2000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        };

        $.ajax({
        url: apiUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        method: 'POST',
        data: JSON.stringify(data),
        success: function(response) {
            var text = response.choices[0].text;
            $('#generated-text').text(text);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus);
        }
        });
    });

});