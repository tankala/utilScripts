const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'movie_lens'});
const bignum = require('bignum');

//Finding minimum and maximum token range in a table
client.execute('select MIN(token(movie_id)), MAX(token(movie_id)) from movies;',
    function(err, result) {
        let minToken = result.rows[0]['system.min(system.token(movie_id))'];
        let maxToken = result.rows[0]['system.max(system.token(movie_id))'];
        console.log("Minimum token: " + minToken);
        console.log("Maximum token: " + maxToken);
        let startToken = bignum(minToken);
        let endToken = startToken.add(5000);
        printDataInTokenRange(startToken, endToken);
    }
);

//Printing data between certain range.
var printDataInTokenRange = function(startToken, endToken) {
    client.execute('select * from movies where token(movie_id) >= ' + startToken + ' and token(movie_id) <= ' + endToken,
        function(err, result) {
            console.log("Getting data between token range from " + startToken + " to " + endToken);
            if(err) {
                console.log(err);
            } else {
                console.log(result.rows[0]);
            }
            client.shutdown();
        }
    );
}