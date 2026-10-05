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

i went to mass refactor not in codebase but in my understanding of react itself, now my current data structure of implementation is single linked list, i was hoping to have a way to capture the SLL in a memory space as like useRef to not get affected everything the component re-render happens, then with the help of ai i found that we can store custom classes in useRef rather than primitves like string,int,array, so this opens the possibility to have stacks,queues be implemented easy but to handle re-render explicitly through by converting custom data structure to array, as my current Grid visualizer works well with array.

i successfully able to implement shapes of few linear data structures like linked list, stacks, queues easily, and for trees iwass able to perfectly create visual with help of intricate maths and array manipulations. and next im planning to move to set, hashmap,.. like structure representation.

im moving towards dynamically initialization of data structures directly from generator(function) to render a view of data structure.

while experimenting around with different architecture of rendering elements ,i accidently found a way to yield recursion as seperate value of each function within, and able to stack upon, and also i added visual elements for primitive data structures.

im working on source to source code parser, with help of ai i came to know about AST but im not getting deep into that because i dont have much relevance to it.but im interesting in letting user write a code to simulate rendering, offering a better understanding rather than static hardcode examples.

almost 70% of leetcode could run on my project, as i more have covered array, linkedlist(single, double, stack, queue), nodes, tree, basis algos like search and sort, my parser is also doing built ,to be honest i used ai to build the code parser ,as it is mostly regex and item juggling i left it to ai, if the project demain AST, i will try it later, and now i need to push the parser towards recursion.
i have successfully completed my visualizer for graph, and im gonna start demonstrating leetcodes rather than adding integrity and style, maybe i might polish the portfolio as i go, but i had enough feature in perspective of data structures...

one day i hold and thought for a moment, and tell realised is this project to learn or project to compete with ai, well actually when i deeply thought it seemed second one. for 3 months i implemented this visualizer, bit by bit, hand coded and hesitated for ai help... but now i realize how speedbreaker it was, but no, i dont regret my hand code or my mistakes cuz my ego wont, but i accepted world is changing, actually code is heavy commodotized.. so then for a 5 days i indulged in ai VIBE-ENGINEER despite my ego, forunately or unforunately i completed 90% what was in my mind, with fewer lines, files and neat structure, but i must also say mostly of the part i had the steering, thanks to my bold choice to re-design the entire architecture which made my project accelerate towards publication. and really the speed of token... made my eyes tear but i tolerate and i got new mindset to rapid testing and architectural thinking, but one think there is a important part/feature in my code where user's code get parsed into specific format it seemed simple regex but complex handles so i blindly let that to ai, so if in future i learn Ast i might return to this..

Now definte gonna publish this and take a break, or come back much later, now planning to other cse parts, and i might regularly add codes as visual ,it is not much of a task. so possible fullstop the project.