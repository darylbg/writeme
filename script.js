

$(document).ready(function() {
    require('dotenv').config()
    
    function generateBtn() {
        if ($('#search-box').val() == '') {
          $('#readme-generate-btn').prop('disabled', true);
        } else {
          $('#readme-generate-btn').prop('disabled', false);
        }
      } generateBtn();

    var username;
    var fullName
    function usernameSearch() {
        $('#username-search-btn').on('click', function() {
            username = $('#username-search').val();
            console.log(username);
            $('#repo-list').empty();

            // github api to call username
            fetch("https://api.github.com/users/" + username + "/repos?per_page=100")
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
            $('#search-box').val($(this).text());
            generateBtn();
        });
    } 
    // browserify script.js -o bundle.js
    var apiKey = process.env.API_KEY; 
    var apiUrl = 'https://api.openai.com/v1/completions';

    $('#readme-generate-btn').on('click', function() {
        $('#loading-spinner').show();

        var prompt = "Please generate a README file in markdown format for my project hosted on GitHub" + repoUrl + "The README file should include the following sections:" + 
                        "1. Description - A brief introduction to the project." + 
                        "2. Deployment - A section describing how to deploy the project and including link to the source code and link to the live deployed website in github pages if available." +
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
                $('#loading-spinner').hide();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error: ' + textStatus);
            }
        });
    });

    // copy code function
    $('.copy-button').on('click', function() {
        var code = $(this).prev('pre').find('code').html();
        copyToClipboard(code);
        // alert('Code copied to clipboard!');
      });
      
      function copyToClipboard(text) {
        var $temp = $('<textarea>');
        $('body').append($temp);
        $temp.val(text).select();
        document.execCommand('copy');
        $temp.remove();
      }


    $('#reset-btn').on('click', function() {
        $('#repo-list').empty();
        $('#search-box').val('');
        $('#username-search').val('')
        $('#generated-text').text('');
        generateBtn();
    })


});