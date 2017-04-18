/**
 * @file Defines a function for initializing an embedded markdown editor using
 *       CodeMirror and marked.
 */
import marked from 'marked';
import initializeCodeMirror from './initializeCodeMirror';

marked.setOptions({
  sanitize: true
});

/**
 * Initializes a live preview markdown editor that spits its contents out into
 * a given text area as embedded markdown of the form:
 *
 *    markdown <<MARKDOWN
 *    My markdown here
 *    MARKDOWN
 *
 *    for a DSL element
 *
 * For a non DSL element, use initializeCodeMirror
 *
 * @param {jQuery} embeddedElement - textarea element within which to embed the
 *   markdown.
 * @param {string} markdownTextArea - id (which will be prefixed by "level_")
 *   of textarea where editor will live
 * @param {string} markdownProperty - name of the property within the textarea
 */
export default function initializeEmbeddedMarkdownEditor(embeddedElement,
    markdownTextArea, markdownProperty) {
  const regex = new RegExp("^" + markdownProperty + " <<(\\w*)\\n([\\s\\S]*?)\\n\\1\\s*$", "m");
  const dslText = embeddedElement.val();

  const mdEditor = initializeCodeMirror(markdownTextArea, 'markdown', (editor, change) => {
    const editorText = editor.getValue();
    const dslText = embeddedElement.val();
    let replacedText;
    if (regex.exec(dslText)) {
      replacedText = dslText.replace(regex, markdownProperty + ' <<$1\n' + editorText + '\n$1\n');
    } else {
      replacedText = dslText + '\n' + markdownProperty + ' <<MARKDOWN\n' + editorText + '\nMARKDOWN\n';
    }
    embeddedElement.val(replacedText);
  }, true);

  // Match against markdown heredoc syntax and capture contents in [2].
  const match = regex.exec(dslText);
  if (match && match[2]) {
    mdEditor.setValue(match[2]);
  } else {
    mdEditor.setValue('');
  }
}
