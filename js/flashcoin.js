angular.module('flashcoin')
.controller('Flashcoin', function($scope, $http, $location, $window, $document, $smoothScroll) {
    $document.ready(function () {
        get_market_price();
        get_transactions_stats();
        get_wallet_stats();
        get_blockscan_stats();
    })

	$scope.gotoAnchor = function(id) {
	  var newHash = id;
		//$location.hash()
	  return $smoothScroll.slow("#"+id);
	};

    function get_market_price(){
        $http.get('https://api.coinmarketcap.com/v1/ticker/flash/').success(function(data) {
            btc_price_sat = data[0].price_btc * 100000000;
            price_usd = data[0].price_usd * 1;
            $scope.market_price_btc = 'Market Price: ' + btc_price_sat.toFixed(0) + ' sat [~' + price_usd.toFixed(4) +' usd]';
            $scope.market_price_percent_sign = data[0].percent_change_1h > 0 ? '+':'-';
            $scope.market_price_percent_str = '(' + $scope.market_price_percent_sign + data[0].percent_change_1h + '%)';
            $scope.market_price_percent = data[0].percent_change_1h;
        }).error(function(err) {
            console.log(err);
        });
    }

    function get_wallet_stats(){
        $http.get('https://keys.flashcoin.io/api/wallet-stats').success(function(data) {
            $scope.total_signups = 'Total Web-wallet Signups: ' + data.stats.total_wallet_count.toFixed(0);
        }).error(function(err) {
            console.log(err);
        });
        $http.get('https://keys.flashcoin.io/api/transaction-stats').success(function(data) {
            $scope.ave_txn = 'Ave Txn Time: ' + data.stats.average_processing_duration.toFixed(2) + ' sec';
        }).error(function(err) {
            console.log(err);
        });
    }

    function get_blockscan_stats(){
        $http.get('https://blockinfo.flashcoin.io/api/report/block/general').success(function(data) {
            $scope.address_with_balance = 'Addresses with Balance: ' + data.TotalAddress.toFixed(0);
            $scope.total_txns = 'Total Txs: ' + data.TotalTransaction.toFixed(0);
            $scope.total_blocks = 'Total Blocks: ' + data.TotalBlock.toFixed(0);
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
            $scope.total_txns_24h = 'Total Txs 24h: ' + total_txns;
        }).error(function(err) {
            console.log(err);
        });
    }
});


$(window).scroll(function () {
 if ($(this).scrollTop() > 100) {
 $('.back-to-top-btn').addClass('display').fadeIn();
 } else {
 $('.back-to-top-btn').removeClass('display').fadeOut();
 }
});
