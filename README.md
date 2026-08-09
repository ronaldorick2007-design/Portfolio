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

i have successful implemented binary trees using a complicated math approach(it works!) and very tidious array manipulation but the visualizer is same one for previous grids, thats the speciality.

as time forwards im planning to move to react, after going through some its concepts i see a clear path to implement my idea with ease, but first i want to learn react.

React helps lot when its comes to DOM changes handling, for this reason im translating these codes to react, and started to think about building architecture of visualizer, currently after having a discussion with ai, i came to know about a new model generator -> customHook -> react, it is exactly useful for my visualizer, and im adopting it into my profile, changes coming soon.

Im using react-router to navigate between pages,Home and Codes

im organizing codes into basics(loops and if-else) and data structures. in fields page, im trying to bring like iframe implemented, or ms docs layout style.

currently im going to mass refactor not in codebase but in my understanding of react itself, now my current data structure of implementation is single linked list, i was hoping to have a way to capture the SLL in a memory space as like useRef to not get affected everything the component re-render happens, then with the help of ai i found that we can store custom classes in useRef rather than primitves like string,int,array, so this opens the possibility to have stacks,queues be implemented easy but to handle re-render explicitly through by converting custom data structure to array, as my current Grid visualizer works well with array.