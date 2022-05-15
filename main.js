initEditor();

/**
 * initialization
 *
 */
function initEditor() {
  // initialize editor
  var editor = ace.edit('md-editor');

  editor.setTheme('ace/theme/monokai'); // set Theme
  editor.getSession().setMode('ace/mode/markdown'); // set style
  editor.getSession().setTabSize(4); // set Tab as 4 spaces
  editor.getSession().setUseWrapMode(true); // automatic change line

  editor.setValue(localStorage.localData || '');

  var viewer = parseMarkdown(editor);
  fixScrollBar(editor, viewer);

  editor.getSession().on('change', function (e) {
    parseMarkdown(editor);
  });
}

/**
 * analyze markdown
 *
 * @params {object} editor
 * @return {object} viewer
 */
 function parseMarkdown(editor) {
    var viewer = $('#md-viewer');
    var data = editor.getValue();
    
    localStorage.localData = data;
    data = marked(data);
    viewer.html(data);

    $('pre > code', viewer).each(function () {
        hljs.highlightBlock(this);
    });

    return viewer;
}

function fixScrollBar(editor, viewer) {
    var session = editor.getSession();
  
    session.setScrollTop(0);
  
    session.on('changeScrollTop', function () {
      var sTop = session.getScrollTop();
      viewer.scrollTop(sTop);
    });
  
    viewer.on('scroll', function () {
      var sTop = viewer.scrollTop();
      session.setScrollTop(sTop);
    });
}