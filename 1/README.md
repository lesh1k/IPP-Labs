Lab #1
======

Problem #1
==========

GUI application written in Python [Music Downloader]. Allows doing one search request per
app launch and downloading any music tracks found, in the range of displayed ones.
Currently the limit is 17 (Why 17? - Just because I chose this number).

Proxy pattern: after the download button is pressed for the first time, all the subsequent
               download requests that appear in 15 seconds time are gathered and fired
               simultaneously as soon as the 15 seconds delay after first button was pressed
               has passed. As downloads begin, comes in the Caching proxy pattern.
               
Caching proxy: application determines if there already are any downloaded files in its download
               folder. If there are any matching titles with the titles in current requests it
               does not download the file. Instead it just lets the user know that 
               "Download canceled. Track: TRACK_NAME already available"

Problem #2
==========

- Mediator knows about the scoreboard and players.
- Scoreboard knows nothing, it just displays whatever it is told to by the mediator.
- Players know their score and if they have already played or not. On one's turn end,
the player triggers "player_turn_finished" event, that is handled by the mediator.

Problem #3
==========

- Game is subscribed to "keyup" events. It controls the game by generating events: "new_player", "try_to_play".
- Mediator knows about the scoreboard and players. It is subscribed to all available events,
thus is controlling the flow of information.
- Scoreboard knows nothing, it just displays whatever it is told to by the mediator.
- Players know their score and if they have already played or not. On one's turn end,
the player triggers "player_turn_finished" event, that is handled by the mediator.