angular.module('flashcoin', [])
.controller('Flashcoin', function($scope, $http, $location, $window, $document, $anchorScroll) {
    $document.ready(function () {
        get_market_price();
        get_transactions_stats();
        get_wallet_stats();
    })
	
	$scope.gotoAnchor = function(x) {
	  var newHash = x;
	  if ($location.hash() !== newHash) {
		// set the $location.hash to `newHash` and
		// $anchorScroll will automatically scroll to it
		$location.hash(x);
	  } else {
		// call $anchorScroll() explicitly,
		// since $location.hash hasn't changed
		$anchorScroll();
	  }
	};
	
    function get_market_price(){
        $http.get('https://api.coinmarketcap.com/v1/ticker/flash/').success(function(data) {
            $scope.message = data[0].price_btc;
            $scope.market_price = 'Market Price: ' + data[0].price_btc * 100000000 + ' (' + data[0].percent_change_1h + '%)';
        }).error(function(err) {
            console.log(err);
        });
    }

    function get_wallet_stats(){
        $http.get('https://keys.flashcoin.io/api/wallet-stats').success(function(data) {
            $scope.address_with_balance = 'Addresses with Balance: ' + data.stats.total_wallet_count.toFixed(0);
        }).error(function(err) {
            console.log(err);
        });
        $http.get('https://keys.flashcoin.io/api/transaction-stats').success(function(data) {
            $scope.ave_txn = 'Ave Txn Time: ' + data.stats.average_processing_duration.toFixed(2);
        }).error(function(err) {
            console.log(err);
        });
    }

    function get_transactions_stats(){
        var currentTime = Math.round(+new Date()/1000);
        var before24h = currentTime - 24*60*60;

        var d = new Date();
        d.setDate(d.getDate() - 1);
        var curr_date = d.getDate();
        curr_date = curr_date.toString().length==2?curr_date:"0"+curr_date;
        var curr_month = d.getMonth() + 1;
        curr_month = curr_month.toString().length==2?curr_month:"0"+curr_month;
        var curr_year = d.getFullYear();
        var yesterday = curr_year + "-" + curr_month + "-" + curr_date ;

        var endTx = 0;

        $http.get('https://explorer.flashcoin.io/api/blocks?startTimestamp='+currentTime+'&blockDate='+yesterday+'&limit=24000').success(function(data) {
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
        }).error(function(err) {
            console.log(err);
        });
    }
});
