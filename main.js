console.log('Page1');

  require('./main2');
  require('./main3');

const uuid = require('uuid/v4');
const request = require('request'); 
const needle = require('needle');
const tress = require('tress');
const cheerio = require('cheerio');
const resolve = require('url');
const fs = require('fs');

const v4options = {
    random: [
      0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
      0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36
    ]
  };
  console.log(v4options);


let URL = 'https://dou.ua/';

let results = [];

let q = tress(function(url, callback){
    request(URL, function (err, res, body) {
        if (err) throw err;
        let $ = cheerio.load(res.body);
        if($('.b-footer-slider').text() === 'a'){
            results.push({
                title: $('.item').text(),
                href: url,
                size: $('.b-footer-slider').text().length
            });
        };
            $('.items>a').each(function() {
                q.push($(this).attr('href'));
            });
    
            $('.items>a').each(function() {
                q.push(resolve(URL, $(this).attr('href')));
            });
    
            callback();
        });
    });
        
console.log(results);
// needle.get(URL, function(err, res){
//     if (err) throw err;
//     console.log(res.body);
//     console.log(res.statusCode);
// });
