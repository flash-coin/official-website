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
        $http.get('https://explorer.flashcoin.io/api/blocks').success((data) => {
            blockData = data.blocks;
            var total_txns = 0;
            for (var i=0; i< data.blocks.length; i++) {
                total_txns += data.blocks[i].txlength - 1;
            }
            $scope.total_txns = 'Total 24h: ' + total_txns;
            var ave_txn = (data.blocks[0].time - data.blocks[data.blocks.length-1].time)/data.blocks.length;
            $scope.ave_txn = 'Ave Txn Time: ' + ave_txn.toFixed(2);
        }).error((err) => {
            console.log(err);
        });
    }
});
