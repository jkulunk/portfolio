// Is the given string a palindrome

$(function () {

    var palindrome = function (str) {
        var superArr = [];
        var bizarroArr = [];
    
        // split string into array and remove spaces
        str = str.replace(/ /g, '');
        superArr = str.toLowerCase().split('');
    
        // new array in reverse order
        for (var i = superArr.length; i > 0; i--) {
            bizarroArr.push(superArr[i - 1]); // arrays are 0 based index
        }
    
        console.log(superArr);
        console.log(bizarroArr);
    
        // compare items in each array
        for (var j = 0; j < superArr.length; j++) {
            if (superArr[j] !== bizarroArr[j]) {
                console.log(str + ' is not a palindrome');
                return false;
            }
        }
    
        console.log(str + ' is a palindrome');
        return true;
    
    };
    

    $('#check').on('click', function () {

        var sourceStr = $('#source').val();

        if (palindrome(sourceStr)) {
            $('#result').html('"' + sourceStr + '"' + ' is a palindrome :)');
        } else {
            $('#result').html('"' + sourceStr + '"' + ' is not a palindrome :(');
        }

    });
});
