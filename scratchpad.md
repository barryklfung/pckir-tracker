# Design Notes


## Assumed resource: 
List of items and prereqs (including ability to reach locations)
- Define a check as the base level
- Map location is a check that generates a Header if any item below it is visible.
  - (If reachable, on BFS, check visibility of all items below it, and if so, then modify)
- An item check/task is then defined as one that generates a visible check box that toggles visibility of text.
- Virtual checks include anything that simplifies a lot of checks for locations - (e.g. all  Team Rocket, have x badges, can use HM), that serves to simplify the graph. Utilise the ones that the crystal randomizer has. Key Items technically fit within this framework, haha.

## Implementation of datastructure.
1. Create nodes for each check, and store prereqs
   * dictionary of IDs, probably?
   * define type of node (Map, virtual, item)
   * create array for satisfaction of prereqs
   * Possible Variables: <code>is_obtained, is_visible_on_map, checked</code>.
2. Iterate through items
   * connect backwards for each graph (connect Listener to Event)
   * For togglable items, set on-click listener.
   * Store item if <code>no_requirements</code>
3. Create visual implementation of list, and hide all items/checks, linking them to the relevant node.
4. Iterate through items of <code>no_requirements</code>
   1. BFS of each item to set validity and visibility.
5. Create interface for selecting key items.
6. On KI click, do a BFS of items to toggle visibility (should be the same for on and off)
7. On Check click, modify visibility.

## Notable design thoughts
- Unvisitable locations not visible
- Fully checkable locations black
- Checkable tasks black
- Uncheckable tasks grey
- Checked tasks grey
- Key items can be a checkbox list.