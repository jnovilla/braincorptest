# braincorptest
//Jay Novilla 10/23/2018

// NOTE FOR DEVELOPER parse passwd and group and sort them together by user with array of assigned groups
// program call definition: 
// node parse {absolutepath file 1 passwd} {absolutepath file 2 group}
// example correct program call "node parse '/etc/passwd' '/etc/group' "
// absolute path on program file or be in directory of program
// e.g. node ~/Documents/dev/parse '/etc/passwd' '/etc/group'
// file definitions should be absolute or program is run in directory with files e.g. "node parse 'passwd' 'group' ". 
// takes 2 parameters in terminal as passwd and group files respectively
// as absolute paths for files (passwd and group) and parses them
// first parses users from passwd file line by line 
// second parser loops per group list of users and finds the user in the main user collection and pushes onto group array


// must contain leading slash to start from root

required software: 
nodejs
included files passwdtest and grouptest interact but have bad data. 

testing scenario: good files, bad files, no files. no exceptions should occur and bad lines of data 
should be notified but should not stop execution. 
bad data is lines missing fields per page. assumes line by line data formatting and 7/4 fields. missing fields == bad data

good files test call "node parse passwd group"
=========================================================================
example output: 
node parse passwd group

{ root: { uid: '0', full_name: 'root', groups: [] },
  hplip: { uid: '121', full_name: 'HPLIP system user,,,', groups: [] },
  'gnome-initial-setup': { uid: '122', full_name: '', groups: [] },
  gdm: { uid: '123', full_name: 'Gnome Display Manager', groups: [] },
  jay:
   { uid: '1000',
     full_name: 'Jay,,,',
     groups: [ 'adm', 'cdrom', 'sudo', 'dip', 'plugdev', 'lpadmin', 'sambashare' ] },
  'systemd-coredump': { uid: '998', full_name: 'systemd Core Dumper', groups: [] } }
=========================================================================


bad files test call "node parse passwdtest grouptest"
=========================================================================
example output: 
node parse passwdtest grouptest
bad user data parse: sys:x:3:3:sys:/dev:/usr/sbin/nologin:asdadad
bad user data parse: sync:x:4:65534:sync:/bin
bad group data parse: adm:x:4:syslog,jay:asdadad
bad group data parse: dialout:x:
{ root: { uid: '0', full_name: 'root', groups: [] },
=========================================================================


no files test call "node parse passwdtestaaa grouptestaaa"
=========================================================================
example output: 
node parse passwdtestaaa grouptestaaa
an error occurred opening the file
Error: ENOENT: no such file or directory, open 'passwdtestaaa'
an error occurred opening the file
Error: ENOENT: no such file or directory, open 'grouptestaaa'
user file failed to process or upload
group file failed to process or upload
=========================================================================
outputs to console for now 