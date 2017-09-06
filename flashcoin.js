angular.module('flashcoin', [])
.controller('Flashcoin', function($scope, $http, $location, $window, $document) {
    $document.ready(function () {
        get_market_price();
        get_transactions_stats();
    })
    function get_market_price(){
        $http.get('https://api.coinmarketcap.com/v1/ticker/flash/').success((data) => {
            $scope.message = data[0].price_btc;
            $scope.market_price = 'Market Price: ' + data[0].price_btc * 100000000 + ' (' + data[0].percent_change_1h + '%)';
        }).error((err) => {
            console.log(err);
        });
    }

    function get_transactions_stats(){
        var currentTime = Math.round(+new Date()/1000);
        var before24h = currentTime - 24*60*60;

        var d = new Date();
        d.setDate(d.getDate() - 1);
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        var yesterday = curr_year + "-" + curr_month + "-" + curr_date ;

        var endTx = 0;

        $http.get('https://explorer.flashcoin.io/api/blocks?startTimestamp='+currentTime+'&blockDate='+yesterday+'&limit=24000').success((data) => {
            blockData = data.blocks;
            var total_txns = 0;
            for (var i=0; i< data.blocks.length; i++) {
              if(data.blocks[i].time > before24h){
                total_txns += data.blocks[i].txlength - 1;
                endTx = i;
              } else {
                break;
              }
            }
            $scope.total_txns = 'Total 24h: ' + total_txns;
            var ave_txn = (data.blocks[0].time - data.blocks[endTx].time)/endTx;
            $scope.ave_txn = 'Ave Txn Time: ' + ave_txn.toFixed(2);
        }).error((err) => {
            console.log(err);
        });
    }
});
