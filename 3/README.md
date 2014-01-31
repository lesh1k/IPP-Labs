Lab #3
======

Language: Python



>>>GENERAL

There are three objects: Model, View, Controller.
Model is responsible for retrieving/updating data from DB.
View just outputs the data that it receives from the controller.
Controller is the mastermind. Uses the model to get necessary data,
then sends it to the view in order to output this data to the end-user.


>>>What type of Model/View/Controller is implemented?

> Model - uses transaction script pattern, because logic is organized by procedures,
where a procedure handles one single request from the presentation

>Controller - is a page controller because there are three static functions (can be
thought of as pages) that are directly requested by the user. If there would've been a 
"routing" function, that would've received all the requests, process them and lately 
call the necessary function on its own without the interference of the user.

>View - I cannot affirm that the view is of one type (Template View) or another 
(Transform View), because it does not completely comply with the description of any.
Nevertheless, I consider my View being closer to a Transform view, just because it
does not replace some values in a template. However, it neither does generate some
specific output, better said it does not process received data, this view just spits
it to the user.