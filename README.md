# Dynamic Middle Ellipsis

A framework/library agnostic logic to dynamically truncate long text in the center.

 - Dynamic: Automatically truncate on resize.
 - Font adaptive: Can handle unique fonts family and sizes
 - Efficient use of space: It does not over or under truncate.
 - Handle all edge cases, like parent width is dependent on child (circular dependency).
 - Not a package dependency: You don't install this as a package, but rather get the code/logic. Giving you full control over code to modify (if needed) for your unique use case.