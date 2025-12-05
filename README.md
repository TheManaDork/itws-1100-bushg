
I modeled my website off of rpi's homepage, blatantly stealing their primary red because red is my favorite color, as well as their large navigation bar, which I am rather a fan of.

TA Password: ITWSTA221$
Professor Password: ITProf920@

Working link to my website (when azure is running it ofc):
http://bushgrpi.eastus.cloudapp.azure.com/iit/

LAB10: You will find I have setup automated production, fixed navigation links to be relative, cleaned up image sizes, added more index.html's for labs that were previously missing them, and generally cleaned up my code. I removed many unused files, as well as my quizzes folder, and secured resources, lab1, lab6, and lab9.

Quiz 3 Part 1:
	See the comments folder for my code, which I made mostly by cutting up parts of lab9, however AI assistance was used in several places as shown in the AI_PROMPTS.txt, also in the comments folder.

	The comments page can be navigated to using the nav-bar from the homepage, filling out the info, and pressing send.

	Database Structure:
	Columns:
	visitorId | type: int(10),      | Attr: unsigned, Extra: AUTO_INCREMENT
	name      | type: varchar(100)  |
	email     | type: varchar(100)  |
	comment   | type: varchar(5000) |
	timestamp | type: datetime,     | Default: current_timestamp()
	status    | type: varchar(10)   |

