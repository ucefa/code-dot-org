import $ from 'jquery';

/**
 * @file Main entry point for scripts used only in levelbuilder when editing
 *       DSL-defined levels.
 */
import initializeEmbeddedMarkdownEditor from
  '@cdo/apps/code-studio/initializeEmbeddedMarkdownEditor';
import initializeCodeMirror from '@cdo/apps/code-studio//initializeCodeMirror';

// Initialize markdown editors on page load
$(document).ready(function () {
  const script = document.querySelector('script[data-markdown]');
  const markdown = JSON.parse(script.dataset.markdown);

  // DSL markdown editors are initialized differently, so that the markdown
  // ends up in the DSL text area
  if (markdown.dsl) {
    initializeEmbeddedMarkdownEditor(
      $('#level_dsl_text'),
      'level_markdown_textarea',
      'markdown');
    initializeEmbeddedMarkdownEditor(
      $('#level_dsl_text'),
      'level_teacher_markdown_textarea',
      'teacher_markdown');
  } else {
    const markdown = document.getElementById('level_markdown_textarea');
    const teacherMarkdown = document.getElementById('level_teacher_markdown_textarea');
    if (markdown) {
      initializeCodeMirror(markdown, 'markdown');
    }
    if (teacherMarkdown) {
      initializeCodeMirror(teacherMarkdown, 'markdown');
    }
  }
});
