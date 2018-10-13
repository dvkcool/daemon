pragma solidity ^0.4.24;

contract SampleHack{

    address judge=0x5aB748B53EFf8b768C9900228dFD52364128E60e;
    address org=msg.sender;
    bytes32 public hackathonName;
    uint public edition;
    uint public totalParticipants;
    uint public allocatedTokens;

    mapping (address => uint) particpantScores;
    address[] finalParticipants;
    uint public finalIndex;
    mapping(address => uint) tokenBalances;

    address[] participants;
    uint public index;
    mapping(address=>bytes32) resumeLink;

    function setHackName(bytes32 _name) public{
        hackathonName=_name;
    }

    function setAllocatedTokens(uint _tokens) public {
        allocatedTokens=_tokens;
    }

    function setEdition(uint _edition) public {
        edition=_edition;
    }

    function setParticipants(uint _number) public {
        totalParticipants=_number;
    }
    function tokenRequest() public returns(uint tokentoRequest){
       uint temp;
       for(uint i=0; i<finalIndex;i++){
           temp+=(particpantScores[finalParticipants[i]]);
       }
       temp=temp/finalIndex;
       return temp;
    }

    function setScores(uint _score) public{
        particpantScores[msg.sender]=_score;
    }

// only organiser
    function addParticipant (address _add) public returns (bool ok){
       finalParticipants.push(_add);
        finalIndex+=1;
    }

    // to do // only judges
    function allocateTokens (address _add, uint _tokens) public returns (bool){
        require(msg.sender==judge);
        return true;
    }

    function getScore(address _add) public view returns (uint _score){
        return particpantScores[_add];
    }
    function newParticipant(bytes32 _url) public returns (bool){
        participants.push(msg.sender);
        resumeLink[msg.sender]=_url;
        index+=1;
        PartcipantAdded(msg.sender, _url);
        return true;
    }

    // TO DO
    function endRegistration() public returns(bool){
        require(msg.sender==org);
        index=0;
        return true;

    }
    function getUrl(address _add) public returns(bytes32){
        return resumeLink[_add];
    }
    // only judges
    function distributePrize() public returns(bool){
        require(msg.sender==org);
        address first;
        address second;
        address third;
       for(uint i=0; i<finalIndex;i++){
           if(particpantScores[first]<particpantScores[finalParticipants[i]]){
               if(particpantScores[second]<particpantScores[finalParticipants[i]]){
                   if(particpantScores[third]<particpantScores[finalParticipants[i]]){
                       first=finalParticipants[i];
                   }
                   else{
                       second=finalParticipants[i];
                   }
               }
               else{
                   third=finalParticipants[i];
               }
           }
       }
       allocateTokens(first, 50);
       allocateTokens(second,30);
       allocateTokens(third,15);
       return true;
    }
    function endHackathon() public returns (bool ok){
        selfdestruct(this);
    }

    event PartcipantAdded(address _add, bytes32 _url);
    event TokensAllocated(address _add, uint _tokens);
}
