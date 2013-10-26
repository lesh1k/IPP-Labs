IPP-Labs
========

Lab #1
======

Problem #1

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
