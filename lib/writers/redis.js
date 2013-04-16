var redis = require("redis");  
var events = require('events');
var util = require('util');

var RedisWriter = function(options) {

	events.EventEmitter.call(this);

	//var redis_hostname = options['redis-hostname'] || 'locahost';
	//var redis_port = options['redis-port'] || 6379;
	this.redis_queue = "search_dev"; //options['redis-queue']
	if (!this.redis_queue) { throw new Error("bad redis queue: " + redis_queue) };
    
  this.client = redis.createClient(); // TODO: Pass in redis_hostname, redis_port
        
  this.client.on("error", function (e) {
		util.log("Error writing to redis %s: %s", redis_queue, e);
  });

	this.on('data', function(data) {
		this.client.lpush(this.redis_queue, JSON.stringify(data));
	});

	this.on('close', function(data) {
		this.client.quit();
	});
};

util.inherits(RedisWriter, events.EventEmitter);

module.exports = RedisWriter;

