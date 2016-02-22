# String Matching

## How does your browser's `Command F` search work?

- This works by pattern matching. It is different than a search, because a search is looking for a certain item in a collection of items.

- Pattern matching is looking for a pattern within a string.

For example finding `you` in
`Hello, how you?`

- Our pattern matching algorithm should take two arguments, a string of text to be searched, and the pattern we are searching for like this:

    string = "Bacon ipsum dolor amet adipisicing jowl eiusmod magna pork belly id frankfurter sint meatball eu swine short ribs salami proident. Do nostrud short loin sirloin deserunt lorem reprehenderit veniam incididunt pancetta shoulder cupim alcatra drumstick. Ball tip chuck aliquip doner, jowl consectetur in dolore elit pork chop irure tongue."

    pattern = "jowl"

    find string, pattern

- Our function should return the INDEX of the FIRST occurance of the pattern IF IT IS FOUND in the string. If it is not found in the string, it should return 0. For the above example we should get

// 35
