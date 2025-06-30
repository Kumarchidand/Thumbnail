const [selectedBoardIndex, setSelectedBoardIndex] = useState(null);

This piece of state remembers which board (folder) is currently selected.

q) Why do we need selectedBoardIndex?
Because:

You can create multiple boards (folders).

But when a user adds a thumbnail, you need to know "which board this thumbnail should go into".

Also, when rendering thumbnails, you only want to show thumbnails of the selected board.

const [boardName, setBoardName] = useState("");
-first is stores what ever user typing ,utube and insta
2nd is just updates the text as the user types

#todo:
change boards state to objects,
["Folder1", "Folder2"] not just names but also files

[
  { name: "Folder1", thumbnails: [] },
  { name: "Folder2", thumbnails: [] }
]