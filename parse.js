var fs = require("fs");

//#region intro

// JN: NOTE FOR DEVELOPER parse passwd and group and sort them together by user
// program call definition: 
// node parse {absolutepath file 1 passwd} {absolutepath file 2 group}
// example correct program call "node parse '/etc/passwd' '/etc/group"
// absolute path on program file or be in directory of program
// e.g. node ~/Documents/dev/parse '/etc/passwd' '/etc/group'
// takes 2 parameters in terminal as passwd and group files respectively
// as absolute paths for files (passwd and group) and parses them
// first parses users from passwd file line by line 
// second parser loops per group list of users and finds the user in the main user collection and pushes onto group array

// must contain leading slash to start from root
// any other file definitions must be absolute or program may not run
// #endregion


//#region helper functions

// read file
var getFileText = function(fileName){
    try{
        var readMe = fs.readFileSync(fileName,'utf8');
        return readMe;
    } catch (err) {
      console.log("an error occurred opening the file \n" + err);

    }

};

// parse individual lines
var parseLineUser = function(lineToParse){
    var nameSplit = lineToParse.split(":");
    if (nameSplit.length !=7){
        console.log("bad user data parse: " + lineToParse);
        return;// missing or extra attributes. return nothing
    } 
    var ret ={};
    
    ret.uid = nameSplit[2];
    //ret.gid = nameSplit[3];
    ret.full_name = nameSplit[4];
    //ret.homeDir = nameSplit[5];
    //ret.optional = nameSplit[6];
    ret.groups = [];
    self.users[nameSplit[0]] = ret;
    
};

// loop on blob
var parseTxtUsers = function (sBlob){
    // split em and ignore the empty strings b/c aint nobody got time for dat
    var loop = sBlob.split(/\r?\n/).filter(Boolean); 
    var nameSplit,user;
    for (var i = 0; i < loop.length; i++ ){
        if(loop && loop.length > 0){
            parseLineUser(loop[i]);
        }
    }
};

// parse each group line
var parseLineGroup = function(lineToParse){
    var groupSplit = lineToParse.split(":");
    if (groupSplit.length !=4){
        console.log("bad group data parse: " + lineToParse);
        return;// missing attributes. return nothing
    } 
    // find list of users, for each user, add to their groups list
    
    var userGroupSplit = groupSplit[3].split(",");    
    if(userGroupSplit && userGroupSplit.length > 0){
        for (var i = 0; i < userGroupSplit.length;i++){
            var user = self.users[userGroupSplit[i]];
            //console.log(user);
            if(user) {
                //user exists in passwd
                user.groups.push(groupSplit[0]);                
            } else {
                // log for null? 
                //console.log(user);
               //console.log("user " + user + "unknown user found in groups. whos this guy?")            
            }
    
        }
    }

};

// loop on blob
var parseTxtGroups = function(sBlob){
    // split em and ignore the empty strings b/c aint nobody got time for dat
    var loop = sBlob.split(/\r?\n/).filter(Boolean);
    var nameSplit;
    for (var i = 0; i < loop.length; i++ ){
        if(loop && loop.length > 0){
            parseLineGroup(loop[i]);
        }
    }
};

//#endregion


//#region Main 
var userText, groupText;
var self = this;
self.users = {};

//get files from input
if(process.argv[2] && process.argv[2].length > 0){
    userText = getFileText(process.argv[2]);
} else {
    console.log("missing input file parameter 1.");
}

if (process.argv[3] && process.argv[3].length > 0){
    groupText = getFileText(process.argv[3]);
} else {
    console.log("missing input file parameter 2.");
}
 
//parse em
if (userText != null && userText.length > 0 && groupText  != null && groupText.length > 0){
    parseTxtUsers(userText);    
    parseTxtGroups(groupText);
    console.log(self.users);
} else{
    if(!userText){
        console.log("user file failed to process or upload");
    }
    if(!groupText){
        console.log("group file failed to process or upload");
    }
}

//#endregion

//#region notes
//might need this abs path stuff? hopefully not
//	var readMe = fs.readFileSync('/etc/passwd','utf8');
//console.log(path.resolve(__dirname));
// bad file path check
// empty file path check
// bad line data user check
// bad line data group check

//#endregion
