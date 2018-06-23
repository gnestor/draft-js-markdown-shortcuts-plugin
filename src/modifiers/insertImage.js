import { EditorState, SelectionState, Modifier, AtomicBlockUtils } from 'draft-js';

const insertImage = (editorState, matchArr) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const [
    matchText,
    alt,
    src,
    title
  ] = matchArr;
  const { index } = matchArr;
  const focusOffset = index + matchText.length;
  const wordSelection = SelectionState.createEmpty(key).merge({
    anchorOffset: index,
    focusOffset
  });
  let newContentState = contentState.createEntity(
    'IMAGE',
    'IMMUTABLE',
    { alt, src, title }
  );
  const entityKey = newContentState.getLastCreatedEntityKey();
  newContentState = Modifier.removeRange(
    newContentState,
    wordSelection,
    'backward'
  );
  let newEditorState = EditorState.push(editorState, newContentState, 'insert-image');
  newEditorState = AtomicBlockUtils.insertAtomicBlock(
    newEditorState,
    entityKey,
    ' '
  );
  return EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter());
};

export default insertImage;
