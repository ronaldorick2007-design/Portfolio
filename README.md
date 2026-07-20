This is my webpage repo for github pages
I have made drastic changes in the structure of the html.
Im very much interested in solid light colors and sharp corner, with subtle transistions
Im have implemented light mode and dark mode.

planning to add sidebar docs, single page but multiple articles in fields.html

i was struggling hard with arrange of grids, first i tried grid css, it was actually easy for 1d, 2d array, also for 1d spreaded as 2d array,
but for shapes like circle, rounded square, hollow shapes, triangle was hard

so i had a vibe-code session with ai to try various layout engine(ai said),
like flexbox as grids, but it had poor DOM management, specially memory wise


Then suddenly i was struck by an idea of have magnetic grid points, and array items are built on snapping to each magnet points, then after a vibe code session, i made it to work successfully, with various test.

Nope i changed my mind with different architecture, two cases, user make a array and get it to a render class that renders 1d, 2d grids, but for complex shapes like circle, hollow circle the render engine build a array and return to user, so user can use it for further modification,

this seperates the problem and controlability.

now i added fields.html to just me convey of what i build daily, anything, hand written codes, vibe codes.