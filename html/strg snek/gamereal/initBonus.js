function initBonus(){

    var bonusClock = new Room("bonusClock",95,23,
    "███████████████████████████████████████████████████████████████████████████████████████████████" +
    "█                                                                                             █" +
    "█   ███████████████████████████████████████████████████████████████████████████████████████   █" +
    "█   █%                                                                                    █   █" +
    "█   █                                                                                     █   █" +
    "█   █                !         B                               C         D                █   █" +
    "█   █                                                                                     █   █" +
    "█   █                                                                                     █   █" +
    "█   █                                                                                     █   █" +
    "█   █                                              ██                                     █   █" +
    "█   █                                              ██                                     █   █" +
    "█   █                                                                                     █   █" +
    "█   █                                              ██                                     █   █" +
    "█   █                                              ██                                     █   █" +
    "█   █                                                                                     █   █" +
    "█   █                                                                                     █   █" +
    "██ ██████████████████████████████████████████████████████ALARM█SET█TO█11█AM█11█MINUTES█████   █" +
    "█ █ █                                                                                     █   █" +
    "█ ║ █                      x                      x                    x                  █   █" +
    "══╝ █                                                                                     █   █" +
    "█████*ù$███████████████████████████████████████████████████████████████████████████████████   █" +
    "══█F                                                                                          █" +
    "███████████████████████████████████████████████████████████████████████████████████████████████");
    var bonusClocks = new Scene("bonusClocks");
    bonusClocks.addGeneric("powerPillNoCheckpoint","x");

    var hour1 = new NumberEntity(0,0,0);
    var hour2 = new NumberEntity(0,0,0);
    var min1 = new NumberEntity(0,0,0);
    var min2 = new NumberEntity(0,0,0);

    bonusClocks.addUniqueEnt(hour1,"!");
    bonusClocks.addUniqueEnt(hour2,"B");
    bonusClocks.addUniqueEnt(min1,"C");
    bonusClocks.addUniqueEnt(min2,"D");
    bonusClocks.addUniqueEnt(new Clock(0,0,hour1,hour2,min1,min2),"%");
    bonusClocks.addUniqueEnt(new PipeBonus(0,0,"subEntryR1",44,14,"right"),"F");

    bonusClocks.addUniqueEnt(new AlarmClock(0,0),"*");
    bonusClocks.addUniqueEnt(new AlarmClock(0,0),"ù");
    bonusClocks.addUniqueEnt(new AlarmClock(0,0),"$");

    bonusClocks.displayName = "JJB Clock App 1.2";

    bonusClocks.setRoom(bonusClock);
    
    game.addScene(bonusClocks); 
//=====================================================================================================================================
//=====================================================================================================================================
var bonusFile1 = new Room("bonusFile1",95,23,
"████████████████████████████████████████████████████████████████████████████████║██████████████" +
"█                                                                              █║█            █" +
"█                                                                              █║█            █" +
"█       =====================JJB FILE EXPLORER 1.0======================       ███            █" +
"█                                                                              █ù█            █" +
"█      C:/                                                                                    █" +
"█                 +--+            +--+            +--+            +--+                        █" +
"█       +-------+----+  +-------+----+  +-------+----+  +-------+----+                        █" +
"█       |            |  |            |  |            |  |            |                        █" +
"█       |  Documents |  |  Images    |  |  Misc.     |  |   System   |                        █" +
"█       |            |  |            |  |            |  |            |                        █" +
"█       +-----+%+----+  +-----+$+----+  +-----+#+----+  +-----+&+----+                        █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█       ===============================================================================       █" +
"█        1992 JJBSOFT ALL RIGHTS RESERVED    Developped by J J Salmonpasta and B Waffle       █" +
"█        If you find any bug please contact us at DO-NOT-CONTACT-US@JJBSOFT.SU                █" +
"███████████████████████████████████████████████████████████████████████████████████████████████");
var bonusFile1s = new Scene("bonusFile1");
bonusFile1s.addGeneric("powerPillNoCheckpoint","x");

bonusFile1s.displayName = "JJB File Explorer 1.0";

bonusFile1s.addUniqueEnt(new Pipe(0,0,"bonusFileDoc",80,1,"down"),'%');
bonusFile1s.addUniqueEnt(new Pipe(0,0,"bonusFileImages",80,1,"down"),'$');
bonusFile1s.addUniqueEnt(new Pipe(0,0,"bonusFileMisc",80,1,"down"),'#');
bonusFile1s.addUniqueEnt(new Pipe(0,0,"bonusFileSystem",80,1,"down"),'&');

bonusFile1s.addUniqueEnt(new PipeBonus(0,0,"subEntry2s",50,11,"left"),'ù');

bonusFile1s.setRoom(bonusFile1);

game.addScene(bonusFile1s); 
//=====================================================================================================================================
//=====================================================================================================================================
var bonusFileImage = new Room("bonusFileImage",95,23,
"████████████████████████████████████████████████████████████████████████████████ù██████████████" +
"█                                                                              █ █            █" +
"█                                                                                             █" +
"█       =====================JJB FILE EXPLORER 1.0======================                      █" +
"█                                                                                             █" +
"█      C:/ Images /                                                                           █" +
"█                                                                                             █" +
"█       +------------+  +------------+  +------------+  +------------+                        █" +
"█       |cutecat.jpg |  | banana.jpg |  | file1.jpg  |  | aejekje.jpg|                        █" +
"█       +-+          |  +-+          |  +-+          |  +-+          |                        █" +
"█        \\|          |   \\|          |   \\|          |   \\|          |                        █" +
"█         +----------+    +----------+    +----------+    +----------+                        █" +
"█                 +--+            +--+                                                        █" +
"█       +-------+----+  +-------+----+                                                        █" +
"█       | Wedding    |  |            |                                                        █" +
"█       | pics       |  |   Funny    |                                                        █" +
"█       |            |  |            |                                                        █" +
"█       +-----+%+----+  +-----+$+----+                                                        █" +
"█                                                                                             █" +
"█       ===============================================================================       █" +
"█        1992 JJBSOFT ALL RIGHTS RESERVED    Developped by J J Salmonpasta and B Waffle       █" +
"█        If you find any bug please contact us at DO-NOT-CONTACT-US@JJBSOFT.SU                █" +
"███████████████████████████████████████████████████████████████████████████████████████████████");
var bonusFileImages = new Scene("bonusFileImages");
bonusFileImages.addGeneric("powerPillNoCheckpoint","²");

bonusFileImages.displayName = "JJB File Explorer 1.0";

bonusFileImages.addUniqueEnt(new Pipe(0,0,"bonusFileWeddingPics",80,1,"down"),'%');
bonusFileImages.addUniqueEnt(new Pipe(0,0,"bonusFileFunny",80,1,"down"),'$');
bonusFileImages.addUniqueEnt(new Pipe(0,0,"bonusFile1",80,5,"down"),'ù');

bonusFileImages.setRoom(bonusFileImage);

game.addScene(bonusFileImages); 
//=====================================================================================================================================
//=====================================================================================================================================
var bonusFileMisc = new Room("bonusFileMisc",95,23,
"████████████████████████████████████████████████████████████████████████████████ù██████████████" +
"█                                                                              █ █            █" +
"█                                                                                             █" +
"█       =====================JJB FILE EXPLORER 1.0======================                      █" +
"█                                                                                             █" +
"█      C:/ Misc. /                                                                            █" +
"█                 +--+            +--+                                                        █" +
"█       +-------+----+  +-------+----+  +------------+  +------------+                        █" +
"█       | docm save  |  | new        |  |            |  |            |                        █" +
"█       | files      |  | directory  |  +-+ image.txt|  +-+ text.jpg |                        █" +
"█       |            |  |            |   \\|          |   \\|          |                        █" +
"█       +-----+%+----+  +-----+$+----+    +----------+    +----------+                        █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█       ===============================================================================       █" +
"█        1992 JJBSOFT ALL RIGHTS RESERVED    Developped by J J Salmonpasta and B Waffle       █" +
"█        If you find any bug please contact us at DO-NOT-CONTACT-US@JJBSOFT.SU                █" +
"███████████████████████████████████████████████████████████████████████████████████████████████");
var bonusFileMiscs = new Scene("bonusFileMisc");
bonusFileMiscs.addGeneric("powerPillNoCheckpoint","²");

bonusFileMiscs.displayName = "JJB File Explorer 1.0";

bonusFileMiscs.addUniqueEnt(new Pipe(0,0,"bonusFileDocdSaveFiles",80,1,"down"),'%');
bonusFileMiscs.addUniqueEnt(new Pipe(0,0,"bonusFileNewDirectory",80,1,"down"),'$');
bonusFileMiscs.addUniqueEnt(new Pipe(0,0,"bonusFile1",80,5,"down"),'ù');

bonusFileMiscs.setRoom(bonusFileMisc);

game.addScene(bonusFileMiscs); 
//=====================================================================================================================================
//=====================================================================================================================================
var bonusFileDoc = new Room("bonusFileDoc",95,23,
"████████████████████████████████████████████████████████████████████████████████ù██████████████" +
"█                                                                              █ █            █" +
"█                                                                                             █" +
"█       =====================JJB FILE EXPLORER 1.0======================                      █" +
"█                                                                                             █" +
"█      C:/ Documents /                                                                        █" +
"█                 +--+            +--+                                                        █" +
"█       +-------+----+  +-------+----+  +------------+                                        █" +
"█       |            |  |            |  |  Wedding   |                                        █" +
"█       |   Emails   |  |  Taxes     |  +-+Invitation|                                        █" +
"█       |            |  |            |   \\|130197.txt|                                        █" +
"█       +-----+%+----+  +-----+$+----+    +----------+                                        █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█       ===============================================================================       █" +
"█        1992 JJBSOFT ALL RIGHTS RESERVED    Developped by J J Salmonpasta and B Waffle       █" +
"█        If you find any bug please contact us at DO-NOT-CONTACT-US@JJBSOFT.SU                █" +
"███████████████████████████████████████████████████████████████████████████████████████████████");
var bonusFileDocs = new Scene("bonusFileDoc");
bonusFileDocs.addGeneric("powerPillNoCheckpoint","²");

bonusFileDocs.displayName = "JJB File Explorer 1.0";

bonusFileDocs.addUniqueEnt(new Pipe(0,0,"bonusFileEmails",80,1,"down"),'%');
bonusFileDocs.addUniqueEnt(new Pipe(0,0,"bonusFileTaxes",80,1,"down"),'$');
bonusFileDocs.addUniqueEnt(new Pipe(0,0,"bonusFile1",80,5,"down"),'ù');

bonusFileDocs.setRoom(bonusFileDoc);

game.addScene(bonusFileDocs); 
//=====================================================================================================================================
//=====================================================================================================================================
var bonusFileSystem = new Room("bonusFileSystem",95,23,
"████████████████████████████████████████████████████████████████████████████████ù██████████████" +
"█                                                                              █ █            █" +
"█                                                                                             █" +
"█       =====================JJB FILE EXPLORER 1.0======================                      █" +
"█                                                                                             █" +
"█      C:/ System /                                                                           █" +
"█                                                                                             █" +
"█       +------------+  +------------+  +----+   +---+  +------------+                        █" +
"█       |            |  |            |  |            |  |            |                        █" +
"█       +-+config.SYS|  +-+user1.SYS |  +-+    ²     |  +-+user2.SYS |                        █" +
"█        \\|          |   \\|          |   \\|          |   \\|          |                        █" +
"█         +----------+    +----------+    +--+   +---+    +----------+                        █" +
"█                                                                                             █" +
"█       +------------+  +----+   +---+  +------------+  +------------+                        █" +
"█       |            |  |            |  |            |  |            |                        █" +
"█       +-+ stgr.snek|  +-+    ²     |  +-+ notavirus|  +-+ tea.pot  |                        █" +
"█        \\|          |   \\|          |   \\|   .exe   |   \\|          |                        █" +
"█         +----------+    +--+   +---+    +----------+    +----------+                        █" +
"█                                                                                             █" +
"█       ===============================================================================       █" +
"█        1992 JJBSOFT ALL RIGHTS RESERVED    Developped by J J Salmonpasta and B Waffle       █" +
"█        If you find any bug please contact us at DO-NOT-CONTACT-US@JJBSOFT.SU                █" +
"███████████████████████████████████████████████████████████████████████████████████████████████");
var bonusFileSystems = new Scene("bonusFileSystem");
bonusFileSystems.addGeneric("powerPillNoCheckpoint","²");

bonusFileSystems.displayName = "JJB File Explorer 1.0";

bonusFileSystems.addUniqueEnt(new Pipe(0,0,"bonusFile1",80,5,"down"),'ù');

bonusFileSystems.setRoom(bonusFileSystem);

game.addScene(bonusFileSystems); 
//=====================================================================================================================================
//=====================================================================================================================================
var  bonusFileWeddingPics = new Room(" bonusFileWeddingPics",95,23,
"████████████████████████████████████████████████████████████████████████████████ù██████████████" +
"█                                                                              █ █            █" +
"█                                                                                             █" +
"█       =====================JJB FILE EXPLORER 1.0======================                      █" +
"█                                                                                             █" +
"█      C:/ Images / Wedding pics /                                                            █" +
"█                                                                                             █" +
"█       +------------+  +------------+  +------------+  +------------+                        █" +
"█       |   jamie&   |  |   jamie&   |  |   jasonfell|  |   daniel   |                        █" +
"█       +-+ daniel1  |  +-+ daniel2  |  +-+ offthe   |  +-+ fistfight|                        █" +
"█        \\| .jpg     |   \\| .jpg     |   \\|stairs.jpg|   \\| 1.jpg    |                        █" +
"█         +----------+    +----------+    +----------+    +----------+                        █" +
"█                                                                                             █" +
"█       +------------+  +------------+  +------------+                                        █" +
"█       |   daniel   |  |  groupphoto|  |  apology   |                                        █" +
"█       +-+ fistfight|  +-+police    |  +-+email.txt |         ²                              █" +
"█        \\| 2.jpg    |   \\|station.jp|   \\|          |                                        █" +
"█         +----------+    +----------+    +----------+                                        █" +
"█                                                                                             █" +
"█       ===============================================================================       █" +
"█        1992 JJBSOFT ALL RIGHTS RESERVED    Developped by J J Salmonpasta and B Waffle       █" +
"█        If you find any bug please contact us at DO-NOT-CONTACT-US@JJBSOFT.SU                █" +
"███████████████████████████████████████████████████████████████████████████████████████████████");
var  bonusFileWeddingPicss = new Scene("bonusFileWeddingPics");
 bonusFileWeddingPicss.addGeneric("powerPillNoCheckpoint","²");

 bonusFileWeddingPicss.displayName = "JJB File Explorer 1.0";

 bonusFileWeddingPicss.addUniqueEnt(new Pipe(0,0,"bonusFileImages",80,1,"down"),'ù');

 bonusFileWeddingPicss.setRoom(bonusFileWeddingPics);

game.addScene( bonusFileWeddingPicss); 
//=====================================================================================================================================
//=====================================================================================================================================
var bonusFileFunny = new Room("bonusFileFunny",95,23,
"████████████████████████████████████████████████████████████████████████████████ù██████████████" +
"█                                                                              █ █            █" +
"█                                                                                             █" +
"█       =====================JJB FILE EXPLORER 1.0======================                      █" +
"█                                                                                             █" +
"█      C:/ Images / Funny /                                                                   █" +
"█                                                                                             █" +
"█       +------------+  +------------+  +------------+                                        █" +
"█       |   hedgehog |  |            |  |   jasonfell|                                        █" +
"█       +-+ .jpg     |  +-+    ²     |  +-+ offthe   |                                        █" +
"█        \\|          |   \\|          |   \\|stairs.jpg|                                        █" +
"█         +----------+    ++  +--+  ++    +----------+                                        █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█       ===============================================================================       █" +
"█        1992 JJBSOFT ALL RIGHTS RESERVED    Developped by J J Salmonpasta and B Waffle       █" +
"█        If you find any bug please contact us at DO-NOT-CONTACT-US@JJBSOFT.SU                █" +
"███████████████████████████████████████████████████████████████████████████████████████████████");
var bonusFileFunnys = new Scene("bonusFileFunny");
bonusFileFunnys.addGeneric("powerPillNoCheckpoint","²");

bonusFileFunnys.displayName = "JJB File Explorer 1.0";

bonusFileFunnys.addUniqueEnt(new Pipe(0,0,"bonusFileImages",80,1,"down"),'ù');

bonusFileFunnys.setRoom(bonusFileFunny);

game.addScene(bonusFileFunnys); 
//=====================================================================================================================================
//=====================================================================================================================================
var bonusFileDocdSaveFiles = new Room("bonusFileDocdSaveFiles",95,23,
"████████████████████████████████████████████████████████████████████████████████ù██████████████" +
"█                                                                              █ █            █" +
"█                                                                                             █" +
"█       =====================JJB FILE EXPLORER 1.0======================                      █" +
"█                                                                                             █" +
"█      C:/ Misc / docm save files /                                                           █" +
"█                                                                                             █" +
"█       +------------+  +------------+  +------------+  +------------+                        █" +
"█       |   save1.cd |  |   andy.cd  |  | peperoni.cd|  |  chease.cd |                        █" +
"█       +-+          |  +-+          |  +-+          |  +-+          |                        █" +
"█        \\|          |   \\|          |   \\|          |   \\|          |                        █" +
"█         +----------+    +----------+    +----------+    +----------+                        █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█       ===============================================================================       █" +
"█   ²    1992 JJBSOFT ALL RIGHTS RESERVED    Developped by J J Salmonpasta and B Waffle       █" +
"█        If you find any bug please contact us at DO-NOT-CONTACT-US@JJBSOFT.SU                █" +
"███████████████████████████████████████████████████████████████████████████████████████████████");
var bonusFileDocdSaveFiless = new Scene("bonusFileDocdSaveFiles");
bonusFileDocdSaveFiless.addGeneric("powerPillNoCheckpoint","²");

bonusFileDocdSaveFiless.displayName = "JJB File Explorer 1.0";

bonusFileDocdSaveFiless.addUniqueEnt(new Pipe(0,0,"bonusFileMisc",80,1,"down"),'ù');

bonusFileDocdSaveFiless.setRoom(bonusFileDocdSaveFiles);

game.addScene(bonusFileDocdSaveFiless); 
//=====================================================================================================================================
//=====================================================================================================================================
var bonusFileNewDirectory = new Room("bonusFileNewDirectory",95,23,
"████████████████████████████████████████████████████████████████████████████████ù██████████████" +
"█                                                                              █ █            █" +
"█                                                                                             █" +
"█       =====================JJB FILE EXPLORER 1.0======================                      █" +
"█                                                                                             █" +
"█      C:/ Misc. / New Directory /                                                            █" +
"█                                                                                             █" +
"█       +------------+                                                                        █" +
"█       |    Sorry   |                                                                        █" +
"█       +-+  Nothing |                                                                        █" +
"█        \\|          |                                                                        █" +
"█         +----------+                                                                        █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█       ===============================================================================       █" +
"█        1992 JJBSOFT ALL RIGHTS RESERVED    Developped by J J Salmonpasta and B Waffle       █" +
"█        If you find any bug please contact us at DO-NOT-CONTACT-US@JJBSOFT.SU                █" +
"███████████████████████████████████████████████████████████████████████████████████████████████");
var bonusFileNewDirectorys = new Scene("bonusFileNewDirectory");
bonusFileNewDirectorys.addGeneric("powerPillNoCheckpoint","x");

bonusFileNewDirectorys.displayName = "JJB File Explorer 1.0";

bonusFileNewDirectorys.addUniqueEnt(new Pipe(0,0,"bonusFileMisc",80,1,"down"),'ù');

bonusFileNewDirectorys.setRoom(bonusFileNewDirectory);

game.addScene(bonusFileNewDirectorys); 
//=====================================================================================================================================
//=====================================================================================================================================
var Emails = new Room("Emails",95,23,
"████████████████████████████████████████████████████████████████████████████████ù██████████████" +
"█                                                                              █ █            █" +
"█                                                                                             █" +
"█       =====================JJB FILE EXPLORER 1.0======================                      █" +
"█                                                                                             █" +
"█      C:/ Documents/ Emails /                                                                █" +
"█                                                                                             █" +
"█       +------------+  +------------+  +------------+  +------------+                        █" +
"█       |   hello.txt|  |  whydontyou|  |   hello2   |  |  ILOVEYOU  |                        █" +
"█       +-+          |  +-+visitMore |  +-+ .txt     |  +-+.txt.exe  |                        █" +
"█        \\|          |   \\|often.txt |   \\|          |   \\|          |                        █" +
"█         +----------+    +----------+    +----------+    +----------+                        █" +
"█                                                                                             █" +
"█       +------------+  +------------+                                                        █" +
"█       |  tech      |  |dontgotomy  |                                                        █" +
"█       +-+support   |  +-+wedding   |          #               #                             █" +
"█        \\|answer.txt|   \\|everagain |                                                        █" +
"█         +----------+    +----------+                                                        █" +
"█                                                                                             █" +
"█       ===============================================================================       █" +
"█        1992 JJBSOFT ALL RIGHTS RESERVED    Developped by J J Salmonpasta and B Waffle       █" +
"█        If you find any bug please contact us at DO-NOT-CONTACT-US@JJBSOFT.SU                █" +
"███████████████████████████████████████████████████████████████████████████████████████████████");
var Emailss = new Scene("bonusFileEmails");
Emailss.addGeneric("powerPillNoCheckpoint","#");

Emailss.displayName = "JJB File Explorer 1.0";

Emailss.addUniqueEnt(new Pipe(0,0,"bonusFileDoc",80,1,"down"),'ù');

Emailss.setRoom(Emails);

game.addScene(Emailss); 
//=====================================================================================================================================
//=====================================================================================================================================
var Taxes = new Room("Taxes",95,23,
"████████████████████████████████████████████████████████████████████████████████ù██████████████" +
"█                                                                              █ █            █" +
"█                                                                                             █" +
"█       =====================JJB FILE EXPLORER 1.0======================                      █" +
"█                                                                                             █" +
"█      C:/ Documents / Taxes / # /                                                            █" +
"█                                                                                             █" +
"█       +------------+  +------------+  +------------+                                        █" +
"█       |   goodtaxes|  |  badtaxes  |  |  yoshi.jpg |                                        █" +
"█       +-+ .txt     |  +-+.txt      |  +-+          |                                        █" +
"█        \\|          |   \\|          |   \\|          |                                        █" +
"█         +----------+    +----------+    +----------+                                        █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█                                                                                             █" +
"█       ===============================================================================       █" +
"█        1992 JJBSOFT ALL RIGHTS RESERVED    Developped by J J Salmonpasta and B Waffle       █" +
"█        If you find any bug please contact us at DO-NOT-CONTACT-US@JJBSOFT.SU                █" +
"███████████████████████████████████████████████████████████████████████████████████████████████");
var Taxess = new Scene("bonusFileTaxes");
Taxess.addGeneric("powerPillNoCheckpoint","#");

Taxess.displayName = "JJB File Explorer 1.0";

Taxess.addUniqueEnt(new Pipe(0,0,"bonusFileDoc",80,1,"down"),'ù');

Taxess.setRoom(Taxes);

game.addScene(Taxess); 

//=====================================================================================================================================
//=====================================================================================================================================
var dungeon1 = new Room("dungeon1",95,23,
"███████████████████████████████████████████████████████████████████████████████████████████████" +
"█                                                                                             █" +
"█    BEWARE THE ...                                                                           █" +
"█                                                                               █ █ █ █ █     █" +
"█    ███     █   █ ███    █  █████  ████ █████ █   ██  █ █ █ █ █ █              █████████     █" +
"█    █  ██   █   █  █ █   █ █       █    █   █ ██  █   ███████████              █████████     █" +
"█    █    █  █   █  █  █  █ █  ███  ███  █   █ █ █ █   ███████████                █████       █" +
"█    █   █   █   █  █   █ █ █    █  █    █   █ █  ██    ██  █████                 ██  █       █" +
"█    ████    █████  █    ██ ██████  ████ █████ █   █    ██  █████                 █████       █" +
"█                                                       █████████                 █████       █" +
"█                        ██  ███                        █████████                 █████       █" +
"█                       █  █ ██                         ███████████████████████████████       █" +
"█                        ██  █                          ███████████████████████████████       █" +
"█                                              █ █ █ █  ███  █████████████████████  ███       █" +
"█     ████  ██  █   █ ███ ██   ██  ███ █   ██  █ █ █ █  ███  █████████     ███████  ███       █" +
"█    █     █  █  █ █  ██  █ █ █ █ █  █ ██  █   █ █ █ █  █████████████       ███████████       █" +
"█    █     ████  ███  █   █  █  █ ████ █ █ █            █████████████       ███████████       █" +
"█     ████ █  █   █   ███ █     █ █  █ █  ██   █ █ █ █  █████████████       ███████████       █" +
"█                                                       ███████████████████████████████████████" +
"█                                                                         █        %> QUIT    █" +
"███████████████████████████████████████████████████████████████████████████       █████████████" +
"█>                                                                                 $> START   █" +
"███████████████████████████████████████████████████████████████████████████████████████████████");
var dugeon1s = new Scene("dungeon1s");
dugeon1s.addGeneric("powerPillNoCheckpoint","x");

dugeon1s.addUniqueEnt(new Pipe(0,0,"dungeon2s",4,21,"right"),'$');
dugeon1s.addUniqueEnt(new PipeBonus(0,0,"subEntry3s",48,12,"right"),"%");

dugeon1s.displayName = "Dungeon of Caveman";
dugeon1s.setRoom(dungeon1);
game.addScene(dugeon1s); 
//=====================================================================================================================================
//=====================================================================================================================================
var dungeon2 = new Room("dungeon2",95,23,
"                      ██  ~~~         ~~~~~       █                                            " +
"    v              |    ██                         ██                        █████             " +
"       |                  ██      ~~~~~~~~~          ██                     ███ ███            " +
"                            ██                         ██                  ████ ████           " +
"                 █       v    ██          ~~~~~~~        ██                ████ █████          " +
"                 █              ██     ~~~                 ██              ████ █████          " +
"   |       ████  █     v   |      ██     ~~          ~~~~    ██            ████ █████          " +
"           █  █  █                  ██                         ██          ████ █████          " +
"           ████ ███                   ██      ~~~   ~~~~         ██        ████ █████          " +
"     ██████  █   █                      ██                         ██      ████ █████          " +
"     █    ████████              |   v     ██                         ██    ████ █████          " +
"      █  █   █            |                 ██   ~~~~~     ~~~~        ██  ████ █████          " +
"       ██    █                                █████████████████████████████████ █████          " +
"    |       █ █               |              v  ██     ██     ██     ██    ████ █████          " +
"           █   █                      |           ██     ██     ██     ██    ██ █████          " +
"                     v   |       v          |       ██     ██     ██     ██    ██████          " +
"        |                                             ██     ██     ██     ██    ████          " +
"                                                        ██     ██     ██     ██    ██          " +
"   +-------------------------------+-------------------------------------------------------+   " +
"   | YOU APPROACH THE DUNGEON...   |                               $> Go through the door  |   " +
"   +-------------------------------+                +--------------------------------------+   " +
"   |                                                               %> Swim into the moat   |   " +
"   +---------------------------------------------------------------------------------------+   ");
var dungeon2s = new Scene("dungeon2s");
dungeon2s.addGeneric("powerPillNoCheckpoint","x");

dungeon2s.addUniqueEnt(new Pipe(0,0,"dungeon4s",2,21,"right"),'$');
dungeon2s.addUniqueEnt(new Pipe(0,0,"dungeon3s",2,21,"right"),'%');

dungeon2s.displayName = "Dungeon of Caveman";
dungeon2s.setRoom(dungeon2);
game.addScene(dungeon2s); 

//=====================================================================================================================================
//=====================================================================================================================================
var dungeon3 = new Room("dungeon3",95,23,
"                                                                                               " +
"                                                                                               " +
"                                                                                               " +
"                                                  o                                            " +
"                                                                                               " +
"                                                 o                                             " +
"                                                                                               " +
"                                               o                                               " +
"                                                                                               " +
"                                                                                               " +
"                                                  o                                            " +
"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" +
"                                                                                               " +
"   ~~~~                                       o                                                " +
"                                         ~~~~    o                            ~~~~~~~          " +
"                  ~~                                                                           " +
"                                                 ~~~~~                     ~~                  " +
"                                                                                               " +
" +------------------------------------------------------------+                    ~~~~~       " +
" | YOU FORGOT YOU CAN'T SWIM. YOU DROWN IN SECONDS. GAME OVER |                                " +
" +------------------------------------------------------------+-------------------------------+" +
" |                                            x                                    $> Restart |" +
" +--------------------------------------------------------------------------------------------+");
var dungeon3s = new Scene("dungeon3s");
dungeon3s.addGeneric("powerPillNoCheckpoint","x");

dungeon3s.addUniqueEnt(new Pipe(0,0,"dungeon1s",2,21,"right"),'$');

dungeon3s.displayName = "Dungeon of Caveman";
dungeon3s.setRoom(dungeon3);
game.addScene(dungeon3s); 

//=====================================================================================================================================
//=====================================================================================================================================
var dungeon4 = new Room("dungeon4",95,23,
"                                                                                               " +
"                                                                                               " +
"                                                                                               " +
"                                                                                               " +
"                                █████████████████████████                                      " +
"                                █                       █             ████████                 " +
"                                █ ██ ████ ████ ████ ███ █             ████████                █" +
"        ██████████████          █ █   ██   ██   ██   ██ █             ████████                █" +
"        ██████  ██████          █ ██ ████ ████ ████ ███ █             █████ ██         █████  █" +
"        ██████  ██████          █ █████████████████████ █             ████   █         █   █  █" +
"        ████ █  █ ████          █ █████████████████████ █             █████ ██         █████ ██" +
"        ██████  ██████          █ █████████████████████ █             ████████   ██████  █    █" +
"        ██████  ██████          █ █████████████████████ █             ████████   █    █████████" +
"        ██████  ██████          █                       █             ████████    █  █   █     " +
"███████████████████████████████████████████████████████████████████████████████████████████████" +
"                                                                                         █     " +
" +-----------------------------------------------+-------------------------------+       █     " +
" | INSIDE THE DUNGEON, YOU COME UPON THREE DOORS |                $> LEFT DOOR   |      █ █    " +
" +-----------------------------------------------+         +---------------------+     █   █   " +
" |                                                                %> MIDDLE DOOR |    █     █  " +
" |                                                         +---------------------+             " +
" |                                                                £> RIGHT DOOR  |             " +
" +-------------------------------------------------------------------------------+             ");
var dungeon4s = new Scene("dungeon4s");
dungeon4s.addGeneric("powerPillNoCheckpoint","x");

dungeon4s.addUniqueEnt(new Pipe(0,0,"dungeon5s",2,21,"right"),'$');
dungeon4s.addUniqueEnt(new Pipe(0,0,"dungeon6s",2,21,"right"),'%');
dungeon4s.addUniqueEnt(new Pipe(0,0,"dungeon7s",2,21,"right"),'£');


dungeon4s.displayName = "Dungeon of Caveman";
dungeon4s.setRoom(dungeon4);
game.addScene(dungeon4s); 
//=====================================================================================================================================
//=====================================================================================================================================
var dungeon5 = new Room("dungeon5",95,23,
"                                      |  █    █                                                " +
"                                ████  |  █    █    |              |        |                   " +
"            █  █  █ █  ██████   █  █  |  █    █    |              |        |                   " +
"            █  █  █ █  █ ██ █   ████ ||  █    █    ||             |        |                   " +
"   ███████  ████  █ █  █    █   █    |   █    █                   ||       |                   " +
"      █     █  █  ███  █    █   █        █    █████                |      ||                   " +
"      █     █  █                 █████████    █    ███████████                                 " +
"      █                  ████████        █    █               ███████████                      " +
"      █          ████████                █    █                          ██████                " +
"            █████                        █    █                              ███               " +
"           ███                           █    █                         █████  █        ██     " +
"           █  ██████                     █    █                    █████     ███      ███      " +
"           ███      █████                 ████                █████     █████      ████        " +
"              ██████     ██████                          █████     █████        ████           " +
"                    █████      █████                █████      ████       ███ ██               " +
"                         ██████     ██████     █████      █████             ██                 " +
"                               █████      █████      █████              ████  █                " +
"                                    ██████      █████                                          " +
" +-------------------------------------------------+                                           " +
" | A TRAP ACTIVATES, CRUSH YOU INSTANTLY. GAME OVER|                                           " +
" +-------------------------------------------------+------------------------------------------+" +
" |                                            x                                    $> Restart |" +
" +--------------------------------------------------------------------------------------------+");
var dungeon5s = new Scene("dungeon5s");
dungeon5s.addGeneric("powerPillNoCheckpoint","x");

dungeon5s.addUniqueEnt(new Pipe(0,0,"dungeon1s",2,21,"right"),'$');

dungeon5s.displayName = "Dungeon of Caveman";
dungeon5s.setRoom(dungeon5);
game.addScene(dungeon5s); 
//=====================================================================================================================================
//=====================================================================================================================================
var dungeon6 = new Room("dungeon6",95,23,
"                          ██    ███████████████████████████████                                " +
"                          █    ██████████████████████████████                                  " +
"                          ██ ██ █████ ██████ █  ███████████                                    " +
"                           ██████  █ █ ███   █  ███  █ █████                                   " +
"                           ███   █ ██  ██ ███ █ ██  █ █ ██ ██                                  " +
"                           █  ███ ██ ██ █ █    ██ █  ██ ██ ████                                " +
"                           █    ██  █ █ ████ ██      ██ ██  ████                               " +
"                           █      ██ ██ █ █ ██ █ █ █  ██     █ ██                              " +
"                           █        █████████████████████████████                              " +
"                           █        █           █ █ █           █                              " +
"                           █        █   x       █ █ █      x    █                              " +
"                           ██       █           █████           █                              " +
"                             ██     █   x                  x    █                              " +
"                               ██   █                           █                              " +
"                                 ██ █                           █                              " +
"                                   █████████████     ████████████                              " +
"                                                |   |                                          " +
"                                                |   |                                          " +
" +------------------------------------------+   |   |                                          " +
" | YOU FOUND A CHEST FILLED WITH TREASURES. |   |   |                                          " +
" +------------------------------------------+---+   +-----------------------------------------+" +
" |                                                                                  $> Return |" +
" +--------------------------------------------------------------------------------------------+");
var dungeon6s = new Scene("dungeon6s");
dungeon6s.addGeneric("powerPillNoCheckpoint","x");

dungeon6s.addUniqueEnt(new Pipe(0,0,"dungeon4s",2,21,"right"),'$');

dungeon6s.displayName = "Dungeon of Caveman";
dungeon6s.setRoom(dungeon6);
game.addScene(dungeon6s); 
//=====================================================================================================================================
//=====================================================================================================================================
 var dungeon7 = new Room("dungeon7",95,23,
 "                                                                                               " +
 "                                                                                               " +
 "                                                 ████████                                      " +
 "                                                █        █                                     " +
 "                 █                             ██         ███████████████                      " +
 "                 █                            █           █             ███                    " +
 "           ████  █                            █           █             ████████████           " +
 "           █  █  █                             ███     ███           ████   ██     ████        " +
 "           ████ ███               ██              █████            ███        ██       ██      " +
 "     ██████  █   █             ██████████                       ███            ██        ██    " +
 "     █    ████████            ███████████████████████████████████               ██             " +
 "      █  █   █              ██████████████████████████████████           ██████████            " +
 "       ██    █             █████████████████████████████████           ██     ████             " +
 "            █ █            ████████████████                           █     ███                " +
 "           █   █             ███████████                               █     █                 " +
 "                                                                       █      ████             " +
 " +---------------------------------------------+----------------------------------------------+" +
 " | THE CAVEMAN IS HERE! QUICK, WHAT DO YOU DO? |                                    $> Attack |" +
 " +---------------------------------------------+          +-----------------------------------+" +
 " |                                                                                  %> Defend |" +
 " |                                                        +-----------------------------------+" +
 " |                                                                                  £> Dodge  |" +
 " +--------------------------------------------------------------------------------------------+");
 var dungeon7s = new Scene("dungeon7s");
 dungeon7s.addGeneric("powerPillNoCheckpoint","x");

dungeon7s.addUniqueEnt(new Pipe(0,0,"dungeon8s",2,21,"right"),'$');
dungeon7s.addUniqueEnt(new Pipe(0,0,"dungeon8s",2,21,"right"),'%');
dungeon7s.addUniqueEnt(new Pipe(0,0,"dungeon9s",2,21,"right"),'£');

dungeon7s.displayName = "Dungeon of Caveman";
dungeon7s.setRoom(dungeon7);
game.addScene(dungeon7s); 
//=====================================================================================================================================
//=====================================================================================================================================
var dungeon8 = new Room("dungeon8",95,23,
"                                  ███                  ██████████                              " +
"            *       o                ██           █████████████████████                        " +
"                 *                     ██      ████████████████████████████                    " +
"             o           *        ████████   █████████████████████████████████                 " +
"                                  ███       █████████████████████████████████████              " +
"                       o        ███ ███       ██████████████████████████████████████           " +
"                              ██      ██       ███████████████████████████████████████         " +
"                   *         █          ███     ████████████████████████████████████████       " +
"              o              █      ████         █████████████████████████████████████████     " +
"                        *    █   ███               █████████████████████████████████████████   " +
"                             █      ███████            ███████████████████████████████████████ " +
"                             █         █                        ███████████████████████████████" +
"                         o    █       █                              █          ███████████████" +
"                               ██    █         ██████                 █                       █" +
"                                 ██   █████████      █         ██     █                        " +
"                                   █                  ████    █  ██████                        " +
"                                    ██████████████████    ████                                 " +
"                                            ███              █                                 " +
" +----------------------------------------------------------------------------------+          " +
" | YOU EFFORTS WERE USELESS AS THE CAVEMAN IS WAY STRONGER THAN YOU. YOU ARE BONKED |          " +
" +----------------------------------------------------------------------------------+---------+" +
" |                                                                                 $> Restart |" +
" +--------------------------------------------------------------------------------------------+");
var dungeon8s = new Scene("dungeon8s");
dungeon8s.addGeneric("powerPillNoCheckpoint","x");

dungeon8s.addUniqueEnt(new Pipe(0,0,"dungeon1s",2,21,"right"),'$');

dungeon8s.displayName = "Dungeon of Bonked Man";
dungeon8s.setRoom(dungeon8);
game.addScene(dungeon8s); 
//=====================================================================================================================================
//=====================================================================================================================================
var dungeon9 = new Room("dungeon9",95,23,
 "                                                                                               " +
 "                                                                                             ██" +
 "                                                                    ███                   █████" +
 "                                                                   █   █████          █████████" +
 "                                                            ███████         ████   ███████████ " +
 "                                                              █                  ███████████   " +
 "            █                        ███████                   ████           █████████████    " +
 "            █                    ████      ████   █████████        ███    ████████████████     " +
 "             █               █████            ████        █     ███      ██████████████████    " +
 "             ███████████     █             ████ ██           ███       █████████████████   █   " +
 "           ██ █    ██  █     █             █     ██        ██          ████████████████     ██ " +
 "      █████   ██  ██    ██                 ██    █           ███████   ███████████████   ███   " +
 "     █     █   █    ██    █                 ██████               ██    ███████████████  ██     " +
 "     █      █   █     ██   █                                   ██       ██████████████   █     " +
 "      ██████                                                 ████         ██████████      █    " +
 "                                                                 █████                     █   " +
 "+----------------------------------------------------------------+----------------------------+" +
 "| YOU QUICKLY ROLLED TO AVOID BEING BONKED; YOU ARE SAFE FOR NOW.|                  $> Yell   |" +
 "+----------------------------------------------------------------+          +-----------------+" +
 "|                                                                                   %> Punch  |" +
 "|                                                                           +-----------------+" +
 "|                                                                                   £> Bonk   |" +
 "+---------------------------------------------------------------------------------------------+");
var dungeon9s = new Scene("dungeon9s");
dungeon9s.addGeneric("powerPillNoCheckpoint","x");

dungeon9s.addUniqueEnt(new Pipe(0,0,"dungeon10s",2,21,"right"),'$');
dungeon9s.addUniqueEnt(new Pipe(0,0,"dungeon8s",2,21,"right"),'%');
dungeon9s.addUniqueEnt(new Pipe(0,0,"dungeon8s",2,21,"right"),'£');


dungeon9s.displayName = "Dungeon of Caveman";
dungeon9s.setRoom(dungeon9);
game.addScene(dungeon9s); 
//=====================================================================================================================================
var dungeon10 = new Room("dungeon10",95,23,
 "                              █         █                                                      " +
 "            ██       █        ██        ███                                                    " +
 "     ██     █ █      █████    █ ██      █  ██                ██████                            " +
 "  ██  █     █  ██   █    █    █ ███    ████████            ███    ████                         " +
 "   ██ ███  ████  █  ██████    ██   █   █       █        ████         ███████████     █████████ " +
 "     █   █ █       ██    █    █                        ██              ██      ███ ███       ██" +
 "      █                                                █                █         ██           " +
 "             ████                                      ██              ██       ███████        " +
 "           ██    ██   ██                                ███           ██    ████     ██        " +
 "          █       █     █                                  ███████████     ██         ██       " +
 "          █       █      █                                             █████           ██      " +
 "           ███████      █                                       ██████████            ████     " +
 "       █         ███████                    █████████████████████████████        █████ ███     " +
 "        █████████  ██                   ██████████████████████████████    ███████    ███       " +
 "                     █                 ███████████████████████████        ███       ███        " +
 "                     ███               █████████████████████████            ███       ███      " +
 "                   ██   ██             ████████████████████████               ███       ███    " +
 "                 ██       █             █████████████████████                   ████      ██   " +
 "+---------------------------------------------------------------------------------------------+" +
 "|YOU YELL AT THE TOP OF YOUR LUNGS. THE CAVEMAN IS IMPRESSED AND YIELD. YOU ARE THE CAVEMAN NOW" +
 "+---------------------------------------------------------------------------------------------+" +
 "|                                                                                 $> CONTINUE |" +
 "+---------------------------------------------------------------------------------------------+");
var dungeon10s = new Scene("dungeon10s");
dungeon10s.addGeneric("powerPillNoCheckpoint","x");

dungeon10s.addUniqueEnt(new Pipe(0,0,"dungeon11s",2,21,"right"),'$');

dungeon10s.displayName = "Dungeon of Caveman";
dungeon10s.setRoom(dungeon10);
game.addScene(dungeon10s); 
//=====================================================================================================================================

//=====================================================================================================================================
var dungeon11 = new Room("dungeon11",95,23,
 "                                                                                               " +
 "       █   █   █████   █    █                          █         █  █  █   █  █   █  ████ ████ " +
 "        █ █   █     █  █    █                           █       █   █  ██  █  ██  █  █    █   █" +
 "         █    █     █  █    █                           █   █   █   █  █ █ █  █ █ █  ███  █████" +
 "        █     █     █  █    █                            █ █ █ █    █  █  ██  █  ██  █    ██   " +
 "       █       █████    ████             ███████         ██   █     █  █   █  █   █  ████ █ ██ " +
 "                                        █       █                                              " +
 "                                        █       █                                              " +
 "                                  ██    █       █    ██                                        " +
 "                                    ██   ███████   ██                                          " +
 "                                      ██    █    ██                                            " +
 "                                        █████████                                              " +
 "                                            █                                                  " +
 "                                            █                                                  " +
 "                                         ███████                                               " +
 "                                        █       █                                              " +
 "                                        █       █                                              " +
 "                                        █       █                                              " +
 "+---------------------------------------------------------------------------------------------+" +
 "| GAME MADE BY LAUREN JOHNES - 1993                         PLEASE HIRE ME I MAKE GREAT GAMES |" +
 "+---------------------------------------------------------------------------------------------+" +
 "|                                          x                                  $> Back to menu |" +
 "+---------------------------------------------------------------------------------------------+");
var dungeon11s = new Scene("dungeon11s");
dungeon11s.addGeneric("powerPillNoCheckpoint","x");

dungeon11s.addUniqueEnt(new Pipe(0,0,"dungeon1s",2,21,"right"),'$');

dungeon11s.displayName = "Dungeon of Caveman";
dungeon11s.setRoom(dungeon11);
game.addScene(dungeon11s); 
}