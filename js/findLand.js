// Find the number of islands where land is 1 and water is 0
// Islands are where land is connected vertically and horizontally
// There are 5 islands here

// 1 1 0 1 1
// 1 0 0 0 0
// 0 0 1 0 1
// 1 0 0 0 1

var grid = [
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1]];

var landHo = (function () {

    var islands = 0;
    var log = [];

    return function (grid) {

        var showLog = function(){
            var output = document.getElementById('output');
            var logItem;
    
            for (var i = 0; i < log.length; i++){
                logItem = document.createElement('li');
                logItem.innerHTML = log[i];
                output.appendChild(logItem);
            }
            
        };

        var isClearAbove = (function () { // check above
            return function (i, j) {
                if ((i === 0) || (!(grid[i - 1][j]))) {
                    return true;
                }

                return false;
            };

        })();

        var isClearSide = (function () { // check previous
            return function (i, j) {
                if ((j === 0) || (!(grid[i][j - 1]))) {
                    return true;
                }

                return false;
            };

        })();

        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {

                log.push('Checking grid ' + i + ', ' + j + ' ...');
                console.log(log[log.length - 1]);


                if ((grid[i][j]) && isClearAbove(i, j) && isClearSide(i, j)) { // Landfall
                    islands++;
                    log.push('Found! Islands so far: ' + islands);
                    console.log(log[log.length - 1]);
                }

            }
        }

        
        log.push('Islands found: ' + islands);
        console.log(log[log.length - 1]);

        // Output results
        document.getElementById('answer').innerHTML = 'Answer: ' + islands;
        showLog();
        
    };

}());

$(function(){

    landHo(grid);

});

