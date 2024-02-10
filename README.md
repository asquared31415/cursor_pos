# Cursor Position

This extension shows the absolute position of the cursor in the current document.

## Features

The cursor position is shown in a status bar item in the bottom right, immediately to the left of the `Ln X, Col Y` status bar item.

![status bar item](images/example.png)

The status bar item displays the _zero-indexed_ character offset from the start of the document. All characters count as one offset, the encoding of the character has no effect.

If a selection is active, the status bar item will show the offset of the start of the selection followed by the offset of the current position.

![selection](images/forward_selection.png)

A reversed range means that the selection begins after the cursor (the selection is backwards).

![reversed selection](images/reversed_selection.png)

If more than one cursor or selection is active, the status bar item will not show.
