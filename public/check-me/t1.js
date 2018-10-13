// Import the page's CSS. Webpack will know what to do with it.
// import "../stylesheets/app.css";
//
// // Import libraries we need.
// import { default as Web3} from 'web3';
// import { default as contract } from 'truffle-contract'

var accounts;
var account;

var addr="0xf4123b949c2b29dac539294c31c60733773eb05d";
var abi=[ {
   "constant": false,
    "inputs": [],
     "name": "getValue",
     "outputs": [
       { "name": "",
       "type": "uint8"
     } ],
      "payable": false,
      "stateMutability": "nonpayable",
       "type": "function"
     },
     {
       "constant": false,
       "inputs": [],
       "name": "setValue",
       "outputs": [
         { "name": "",
         "type": "uint8" } ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        } ];

var MyContract = web3.eth.contract(abi);
var instance = MyContract.at(addr);

var events = instance.allEvents({fromBlock: 0, toBlock: 'latest'});
events.watch((err,res)=>{
    if(!err){
        console.log(res);
    }
})


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }


});
var myInterval = setInterval(init,500);
function init(){
    clearInterval(myInterval);
    console.log(web3.eth.defaultAccount);
}

function reqEnd(){
    var _from = document.getElementById('from').value;
    var _to = document.getElementById('to').value;
    instance.requestRecommendation(_from,_to,(err,res)=>{
        if(!err){
            console.log(res);
        }
    })
}

function reqEnd(){
    var _from = document.getElementById('from').value;
    var _to = document.getElementById('to').value;
    var _skill=document.getElementById('skill').value;
    instance.requestRecommendation(_from.toString("hex"),_to.toString("hex"),_skill.toString(),(err,res)=>{
        if(!err){
            console.log(res);
        }
    })
}

function recommend(){
    var _from = document.getElementById('_from').value;
    var _to = document.getElementById('_to').value;
    var _skill = document.getElementById('_skill').value;
    var _percent=parseInt(document.getElementById("_percent").value);
    instance.recommend(_from.toString("hex"),_to.toString("hex"),_percent,_skill,(err,res)=>{
        if(!err){
            console.log(res);
        }
    })
}

function getSkillAddr(){
    instance.getSkillAddr(skill,(err,res)=>{
        if(!err){
            console.log(res);
        }
    })
}

function sort(){
    instance.sort(skill,(err,res)=>{
        if(!err){
            console.log(res);
        }
    })
}

function getRecs(){
    instance.getRecs(id.toString("hex"),(err,res)=>{
        if(!err){
            console.log(res);
        }
    })
}

function getRequests(){
    instance.getRequests(id.toString("hex"),(err,res)=>{
        if(!err){
            console.log(res);
        }
    })
}

function getSkillScore(){
    instance.getSkillscore(id.toString("hex"),skill,(err,res)=>{
        if(!err){
            console.log(res);
        }
    })
}
