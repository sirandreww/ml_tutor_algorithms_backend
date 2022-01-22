Our main features:

Algorithms:
- flow of the progress
- saved parameters and history? (can go back to previous steps)
- visualisation matches function
- user input check (for functions, parameters, etc.)

Gradient Descent - 
1. Introduction pages are static (2D the graph is interactive and not static).
2. In each task the user can enter whatever he wants, if the input is invalid the page must not break (data won't be rendered at worst case), log errors to console.
3. Buttons works. (Play -> start real-time calcs, Clear -> stops the clear the boards, Puase -> puases the cals but keeps the data...).
4. If user changes the input all real time calculations stops and tables are cleared (examples in step by step tasks must be align with the input).

Routing:
- all links are relevant
- all links route to the correct place

Different browsers integration:
-Chrome, Firefox etc.


Unit Test:
testing a single function (small unit responsible for small feature)

PATTERN:
Arrange: rendering the component
Act: user events, typing, clicking etc.
Assert: what to expect given the actions above

Translate user interactions to assertions


Integration Test:
-how multiple units integrate together
-combine single unit tests into one larger test

think of how the user will use our application, by steps and actions. then, commbine these action with asserts between every action.
this will resemble more realisctic user flow

End-to-end Test:
-frontend to backend and vuce versa

Tools:
Unit + Integration -> React testing library

End-To-End -> Cypress

