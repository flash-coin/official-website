  $('document').ready(function () {
      get_market_price();
      get_transactions_stats();
      get_wallet_stats();
      get_blockscan_stats();
  });

    function get_market_price(){
        $.get('https://api.coinmarketcap.com/v1/ticker/flash/').then(function (data){
            var btc_price_sat = data[0].price_btc * 100000000;
            var price_usd = data[0].price_usd * 1;
            var market_price_btc = 'Market Price: ' + btc_price_sat.toFixed(0) + ' sat [~' + price_usd.toFixed(4) +' usd]';
            $('#market_price').val(market_price_btc);
            $('#current_rate').val('Rank: '+data[0].rank);
            var market_price_percent_sign = data[0].percent_change_24h > 0 ? '+':'';
            var market_price_percent_str = '(' + market_price_percent_sign + data[0].percent_change_24h + '%)';
            $('#market_price_percentage').val(market_price_percent_str);

            var market_price_percent = data[0].percent_change_24h;
            if (market_price_percent > 0) {
              $('#market_price_percentage').css('color','green');
            }
        }, function(err) {
            console.log(err);
        });
    }

    function get_wallet_stats(){
        $.get('https://keys.flashcoin.io/api/wallet-stats').then(function(data) {
            var total_signups = 'Total Web-wallet Signups: ' + data.stats.total_wallet_count.toFixed(0);
            $('#total_web_wallet').val(total_signups);
        }, function(err) {
            console.log(err);
        });
        $.get('https://keys.flashcoin.io/api/transaction-stats').then(function(data) {
            var ave_txn = 'Ave Txn Time: ' + data.stats.average_processing_duration.toFixed(2) + ' sec';
            $('#ave_txn_time').val(ave_txn);
        }, function(err) {
            console.log(err);
        });
    }

    function get_blockscan_stats(){
        $.get('https://blockinfo.flashcoin.io/api/report/block/general').then(function(data) {
            var address_with_balance = 'Addresses with Balance: ' + data.TotalAddress.toFixed(0);
            $('#AddressesBalance').val(address_with_balance);
            var total_txns = 'Total Txs: ' + data.TotalTransaction.toFixed(0);
            $('#TotalTxs').val(total_txns);
            var total_blocks = 'Total Blocks: ' + data.TotalBlock.toFixed(0);
            $('#TotalBlocks').val(total_blocks);
        }, function(err) {
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

        $.get('https://explorer.flashcoin.io/api/blocks?startTimestamp='+currentTime+'&blockDate='+yesterday+'&limit=24000').then(function(data) {
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
            var total_txns_24h = 'Total Txs 24h: ' + total_txns;
            $('#total_txns_24h').val(total_txns_24h);
        }, function(err) {
            console.log(err);
        });
    }
